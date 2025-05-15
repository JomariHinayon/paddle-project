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
  execSync('npm install --no-save typescript@5.3.3 @types/react@19.0.12 @types/react-dom@19.0.4 @types/node@20.10.4', {
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