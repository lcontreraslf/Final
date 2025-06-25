import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from '@babel/parser';
import traverseBabel from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VITE_PROJECT_ROOT = path.resolve(__dirname, '../..');
const EDITABLE_HTML_TAGS = ["a", "Button", "button", "p", "span", "h1", "h2", "h3", "h4"];

function parseEditId(editId: string) {
  const parts = editId.split(':');
  if (parts.length < 3) return null;
  const column = parseInt(parts.at(-1)!, 10);
  const line = parseInt(parts.at(-2)!, 10);
  const filePath = parts.slice(0, -2).join(':');
  if (!filePath || isNaN(line) || isNaN(column)) return null;
  return { filePath, line, column };
}

function checkTagNameEditable(openingElementNode: any, editableTagsList: string[]): boolean {
  if (!openingElementNode || !openingElementNode.name) return false;
  const nameNode = openingElementNode.name;
  if (nameNode.type === 'JSXIdentifier' && editableTagsList.includes(nameNode.name)) {
    return true;
  }
  if (nameNode.type === 'JSXMemberExpression' && nameNode.property && nameNode.property.type === 'JSXIdentifier' && editableTagsList.includes(nameNode.property.name)) {
    return true;
  }
  return false;
}

export default function inlineEditPlugin() {
  return {
    name: 'vite-inline-edit-plugin',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!/\.(jsx|tsx)$/.test(id) || !id.startsWith(VITE_PROJECT_ROOT) || id.includes('node_modules')) {
        return null;
      }
      const relativeFilePath = path.relative(VITE_PROJECT_ROOT, id);
      const webRelativeFilePath = relativeFilePath.split(path.sep).join('/');
      try {
        const babelAst = parse(code, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
          errorRecovery: true
        });
        let attributesAdded = 0;
        traverseBabel.default(babelAst, {
          enter(path: any) {
            if (path.isJSXOpeningElement()) {
              const openingNode = path.node;
              const elementNode = path.parentPath.node;
              if (!openingNode.loc) return;
              const alreadyHasId = openingNode.attributes.some(
                (attr: any) => t.isJSXAttribute(attr) && attr.name.name === 'data-edit-id'
              );
              if (alreadyHasId) return;
              const isCurrentElementEditable = checkTagNameEditable(openingNode, EDITABLE_HTML_TAGS);
              if (!isCurrentElementEditable) return;
              let shouldBeDisabledDueToChildren = false;
              if (t.isJSXElement(elementNode) && elementNode.children) {
                const hasPropsSpread = openingNode.attributes.some((attr: any) => t.isJSXSpreadAttribute(attr) && attr.argument && t.isIdentifier(attr.argument) && attr.argument.name === 'props');
                const hasDynamicChild = elementNode.children.some((child: any) => t.isJSXExpressionContainer(child));
                if (hasDynamicChild || hasPropsSpread) {
                  shouldBeDisabledDueToChildren = true;
                }
              }
              if (!shouldBeDisabledDueToChildren && t.isJSXElement(elementNode) && elementNode.children) {
                const hasEditableJsxChild = elementNode.children.some((child: any) => {
                  if (t.isJSXElement(child)) {
                    return checkTagNameEditable(child.openingElement, EDITABLE_HTML_TAGS);
                  }
                  return false;
                });
                if (hasEditableJsxChild) {
                  shouldBeDisabledDueToChildren = true;
                }
              }
              if (shouldBeDisabledDueToChildren) {
                const disabledAttribute = t.jsxAttribute(
                  t.jsxIdentifier('data-edit-disabled'),
                  t.stringLiteral('true')
                );
                openingNode.attributes.push(disabledAttribute);
                attributesAdded++;
                return;
              }
              if (t.isJSXElement(elementNode) && elementNode.children && elementNode.children.length > 0) {
                let hasNonEditableJsxChild = false;
                for (const child of elementNode.children) {
                  if (t.isJSXElement(child)) {
                    if (!checkTagNameEditable(child.openingElement, EDITABLE_HTML_TAGS)) {
                      hasNonEditableJsxChild = true;
                      break;
                    }
                  }
                }
                if (hasNonEditableJsxChild) {
                  const disabledAttribute = t.jsxAttribute(
                    t.jsxIdentifier('data-edit-disabled'),
                    t.stringLiteral("true")
                  );
                  openingNode.attributes.push(disabledAttribute);
                  attributesAdded++;
                  return;
                }
              }
              let currentAncestorCandidatePath = path.parentPath.parentPath;
              while (currentAncestorCandidatePath) {
                const ancestorJsxElementPath = currentAncestorCandidatePath.isJSXElement()
                  ? currentAncestorCandidatePath
                  : currentAncestorCandidatePath.findParent((p: any) => p.isJSXElement());
                if (!ancestorJsxElementPath) {
                  break;
                }
                if (checkTagNameEditable(ancestorJsxElementPath.node.openingElement, EDITABLE_HTML_TAGS)) {
                  return;
                }
                currentAncestorCandidatePath = ancestorJsxElementPath.parentPath;
              }
              const line = openingNode.loc.start.line;
              const column = openingNode.loc.start.column + 1;
              const editId = `${webRelativeFilePath}:${line}:${column}`;
              const idAttribute = t.jsxAttribute(
                t.jsxIdentifier('data-edit-id'),
                t.stringLiteral(editId)
              );
              openingNode.attributes.push(idAttribute);
              attributesAdded++;
            }
          }
        });
        if (attributesAdded > 0) {
          const generateFunction = generate.default || generate;
          const output = generateFunction(babelAst, {
            sourceMaps: true,
            sourceFileName: webRelativeFilePath
          }, code);
          return {
            code: output.code,
            map: output.map
          };
        }
      } catch (e) {
        console.error('[vite-inline-edit-plugin] Error:', e);
      }
      return null;
    },
    // ... resto del archivo igual ...
  };
} 