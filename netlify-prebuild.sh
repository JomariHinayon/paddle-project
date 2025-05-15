#!/bin/bash

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
npm install
cd ../../

# Prepare API backup directories for static export
echo "Preparing API backup for static export..."
./prepare-netlify-build.sh

echo "Netlify preparation complete!" 