const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== VERIFYING TYPES INSTALLATION ===');

// Check node_modules/@types/react exists
const typesReactPath = path.join(__dirname, 'node_modules', '@types', 'react');
if (fs.existsSync(typesReactPath)) {
    console.log('✅ @types/react directory exists');

    // List files
    console.log('Files in @types/react:');
    try {
        const files = fs.readdirSync(typesReactPath);
        files.forEach(file => console.log(`- ${file}`));
    } catch (e) {
        console.error('Error listing files:', e);
    }

    // Check index.d.ts exists
    const indexPath = path.join(typesReactPath, 'index.d.ts');
    if (fs.existsSync(indexPath)) {
        console.log('✅ index.d.ts file exists');
        // Show first few lines
        const content = fs.readFileSync(indexPath, 'utf8');
        const lines = content.split('\n').slice(0, 10);
        console.log('First 10 lines of index.d.ts:');
        lines.forEach((line, i) => console.log(`${i + 1}: ${line}`));
    } else {
        console.log('❌ index.d.ts file is missing');
    }
} else {
    console.log('❌ @types/react directory does not exist');
}

// Check node_modules listing
console.log('Listing node_modules/@types:');
try {
    const typesPath = path.join(__dirname, 'node_modules', '@types');
    if (fs.existsSync(typesPath)) {
        const dirs = fs.readdirSync(typesPath);
        dirs.forEach(dir => console.log(`- ${dir}`));
    } else {
        console.log('❌ node_modules/@types directory does not exist');
    }
} catch (e) {
    console.error('Error listing @types directory:', e);
}

// Verify npm can find @types/react
console.log('Verifying npm can find @types/react:');
try {
    const output = execSync('npm list @types/react', { encoding: 'utf8' });
    console.log(output);
} catch (e) {
    console.error('Error checking npm list:', e.message);
}

console.log('=== TYPE VERIFICATION COMPLETE ==='); 