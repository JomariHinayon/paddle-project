const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== TYPESCRIPT FIX FOR NETLIFY ===');

// Backup existing tsconfig if present
const tsconfigPath = path.join(__dirname, 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  console.log('Backing up existing tsconfig.json...');
  try {
    fs.copyFileSync(tsconfigPath, path.join(__dirname, 'tsconfig.json.original'));
    console.log('✅ tsconfig.json backed up to tsconfig.json.original');
  } catch (e) {
    console.error('Error backing up tsconfig.json:', e);
  }
}

// Always force install TypeScript and type definitions
console.log('Force installing TypeScript and type definitions...');
try {
  // Set npm configuration for peer dependencies to avoid conflicts
  execSync('npm config set legacy-peer-deps true', { stdio: 'inherit' });
  
  // Install compatible TypeScript versions
  execSync('npm install --no-save typescript@4.9.5 @types/react@18.2.0 @types/react-dom@18.2.0 @types/node@18.16.0', {
    stdio: 'inherit'
  });
  console.log('✅ TypeScript and type definitions installed');
} catch (installError) {
  console.error('Error installing TypeScript packages:', installError);
  console.log('Continuing with build process...');
}

// Create a compatible tsconfig.json
console.log('Creating optimized tsconfig.json for Netlify build...');
const tsConfig = {
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": false,
    "noEmit": true,
    "incremental": true,
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
};

fs.writeFileSync(
  tsconfigPath,
  JSON.stringify(tsConfig, null, 2)
);
console.log('✅ Created optimized tsconfig.json');

// Create a minimal next-env.d.ts file if it doesn't exist
const nextEnvPath = path.join(__dirname, 'next-env.d.ts');
if (!fs.existsSync(nextEnvPath)) {
  console.log('Creating next-env.d.ts file...');
  const nextEnvContent = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;
  fs.writeFileSync(nextEnvPath, nextEnvContent);
  console.log('✅ Created next-env.d.ts');
}

// Create Next.js config JS version if mjs doesn't work
if (fs.existsSync(path.join(__dirname, 'next.config.mjs'))) {
  console.log('Converting next.config.mjs to next.config.js...');
  
  // Read the mjs file
  const mjsContent = fs.readFileSync(path.join(__dirname, 'next.config.mjs'), 'utf8');
  
  // Create a JS version - ensure we don't include esmExternals config
  let jsContent = mjsContent
    .replace('export default', 'module.exports =')
    .replace('import.meta.url', '\'file://\' + __dirname');
    
  // Remove the experimental esmExternals configuration if present
  jsContent = jsContent.replace(/experimental:\s*{[^}]*esmExternals\s*:\s*['"]loose['"][^}]*},?\s*/g, '');
  
  fs.writeFileSync(path.join(__dirname, 'next.config.js'), jsContent);
  console.log('✅ Created next.config.js');
}

console.log('=== TYPESCRIPT FIX COMPLETE ==='); 