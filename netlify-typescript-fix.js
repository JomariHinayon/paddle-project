const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== TYPESCRIPT FIX FOR NETLIFY ===');

// Check if TypeScript is installed
try {
  console.log('Checking for TypeScript...');
  // Attempt to require TypeScript
  require.resolve('typescript');
  console.log('✅ TypeScript is installed');
} catch (e) {
  console.log('❌ TypeScript is not installed, installing...');
  
  try {
    // Install TypeScript and related packages
    console.log('Installing TypeScript and related packages...');
    execSync('npm install --save-dev typescript@latest @types/react@latest @types/react-dom@latest @types/node@latest', {
      stdio: 'inherit'
    });
    console.log('✅ TypeScript and related packages installed');
  } catch (installError) {
    console.error('Error installing TypeScript:', installError);
    
    // If installation fails, create a simplified tsconfig.json 
    console.log('Creating simplified tsconfig.json as fallback...');
    const simpleTsConfig = {
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
        "jsx": "preserve"
      },
      "include": ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
      "exclude": ["node_modules"]
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'tsconfig.json'),
      JSON.stringify(simpleTsConfig, null, 2)
    );
    console.log('✅ Simplified tsconfig.json created');
  }
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