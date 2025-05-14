#!/bin/bash

# Clean node_modules to prevent conflicts
rm -rf node_modules
rm -rf .next

# Install all dependencies fresh
npm install

# Print info for debugging
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Listing src/components directory:"
ls -la src/components
echo "Listing src/lib directory:"
ls -la src/lib

# Build the application
NEXT_IGNORE_ESLINT=1 npm run build 