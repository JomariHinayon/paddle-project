#!/bin/bash

echo "==== STARTING NETLIFY BUILD SCRIPT ===="

# Clean slate
rm -rf node_modules
rm -rf .next

# Save current postcss configs
if [ -f "postcss.config.mjs" ]; then
  echo "Backing up postcss.config.mjs"
  mv postcss.config.mjs postcss.config.mjs.bak
fi

if [ -f "postcss.config.js" ]; then
  echo "Backing up postcss.config.js"
  mv postcss.config.js postcss.config.js.bak
fi

# Create Netlify-specific postcss config
echo "Creating Netlify-specific postcss.config.js"
cat > postcss.config.js << 'EOL'
// This is for Netlify builds
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
EOL

# Install deps
echo "Installing dependencies"
npm install

# Install specific Tailwind v3 for Netlify
echo "Installing Tailwind v3 for Netlify"
npm install tailwindcss@^3.3.0 autoprefixer --save-dev

# Display Tailwind version
echo "Tailwind version:"
npx tailwindcss --version

# Run Node.js verification script
echo "Running verification script"
node fix-netlify-build.js

# Build the project
echo "Building Next.js app"
NEXT_IGNORE_ESLINT=1 SKIP_TYPE_CHECK=1 npm run build

echo "==== NETLIFY BUILD SCRIPT COMPLETE ====" 