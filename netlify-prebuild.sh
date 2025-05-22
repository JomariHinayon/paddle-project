#!/bin/bash
set -e

echo "=== NETLIFY PREBUILD SCRIPT ==="

# Check Node version
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Check if @types/react is installed
echo "Checking if @types/react is installed..."
if npm list @types/react | grep -q "@types/react"; then
  echo "✅ @types/react is already installed"
else
  echo "❌ @types/react is NOT installed"
fi

# Display package.json content
echo "Contents of package.json:"
cat package.json

# Set legacy peer deps to avoid dependency conflicts
npm config set legacy-peer-deps true

# Force install React types as the very first step
echo "Force installing React types directly..."
npm install --save-dev --no-save --force @types/react@19.1.5 @types/react-dom@19.0.4
echo "Verifying React types installation..."
npm list @types/react

# Install TypeScript and type definitions first
echo "Installing TypeScript and required type definitions..."
# TypeScript installation removed

# Create a minimal tsconfig if needed
# tsconfig.json creation removedg.json..."
  cat > tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  "exclude": ["node_modules"]
}
EOF
fi

# Create next-env.d.ts if missing
# next-env.d.ts creation removedle should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
EOF
fi

# Ensure we have next.config.js (not just .mjs)
if [ -f "next.config.mjs" ] && [ ! -f "next.config.js" ]; then
  echo "Converting next.config.mjs to next.config.js..."
  content=$(cat next.config.mjs)
  # Replace ES module syntax with CommonJS
  content=$(echo "$content" | sed 's/export default/module.exports =/')
  content=$(echo "$content" | sed "s/import.meta.url/'file:\/\/' + __dirname/")
  echo "$content" > next.config.js
fi

echo "=== NETLIFY PREBUILD SCRIPT COMPLETE ==="

# Prepare for Netlify deployment
echo "Preparing Netlify functions..."

# Ensure the functions directory exists
mkdir -p netlify/functions

# Create a minimal package.json if it doesn't exist
if [ ! -f netlify/functions/package.json ]; then
  echo "Creating package.json for functions"
  cat > netlify/functions/package.json << EOF
{
  "name": "netlify-functions",
  "version": "1.0.0",
  "description": "Netlify functions for Paddle integration",
  "main": "api.js",
  "dependencies": {
    "axios": "^1.8.4"
  }
}
EOF
fi

# Install dependencies for functions
echo "Installing function dependencies..."
cd netlify/functions
npm install --force
cd ../../

# Prepare API backup directories for static export
echo "Preparing API backup for static export..."
if [ -f "./prepare-netlify-build.sh" ]; then
  chmod +x ./prepare-netlify-build.sh
  ./prepare-netlify-build.sh
else
  echo "prepare-netlify-build.sh not found, skipping API backup preparation"
fi

echo "Netlify preparation complete!" 