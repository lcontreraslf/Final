import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { EDIT_MODE_STYLES } from './visual-editor-config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

export default function inlineEditDevPlugin() {
  return {
    name: 'vite:inline-edit-dev',
    apply: 'serve' as const,
    transformIndexHtml() {
      const scriptPath = resolve(__dirname, 'edit-mode-script.ts');
      const scriptContent = readFileSync(scriptPath, 'utf-8');

      return [
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: scriptContent,
          injectTo: 'body' as const
        },
        {
          tag: 'style',
          children: EDIT_MODE_STYLES,
          injectTo: 'head' as const
        }
      ];
    }
  };
} 