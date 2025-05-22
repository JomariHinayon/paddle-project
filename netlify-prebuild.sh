#!/bin/bash
set -e

echo "=== NETLIFY PREBUILD SCRIPT (JAVASCRIPT VERSION) ==="

# Check Node version
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Set legacy peer deps to avoid dependency conflicts
npm config set legacy-peer-deps true

# Install dependencies with more aggressive options for Netlify
echo "Installing dependencies..."
npm install --force

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