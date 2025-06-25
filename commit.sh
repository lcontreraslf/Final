#!/bin/bash

echo "📝 Commit rápido de todos los cambios..."
git add .

echo "Escribe tu mensaje de commit (presiona CTRL+D para terminar):"
commit_message=$(cat)

if [ -z "$commit_message" ]; then
  echo "❌ No se escribió ningún mensaje. Abortando commit."
  exit 1
fi

git commit -m "$commit_message"
echo "🚀 Subiendo cambios a la rama main..."
git push origin main 