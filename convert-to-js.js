const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== CONVERTING PROJECT TO JAVASCRIPT ===');

// Remove tsconfig.json
const tsconfigPath = path.join(__dirname, 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
    console.log('Removing tsconfig.json...');
    fs.unlinkSync(tsconfigPath);
    console.log('✅ tsconfig.json removed');
}

// Also remove tsconfig.simple.json if it exists
const tsConfigSimplePath = path.join(__dirname, 'tsconfig.simple.json');
if (fs.existsSync(tsConfigSimplePath)) {
    console.log('Removing tsconfig.simple.json...');
    fs.unlinkSync(tsConfigSimplePath);
    console.log('✅ tsconfig.simple.json removed');
}

// Also remove next-env.d.ts if it exists
const nextEnvPath = path.join(__dirname, 'next-env.d.ts');
if (fs.existsSync(nextEnvPath)) {
    console.log('Removing next-env.d.ts...');
    fs.unlinkSync(nextEnvPath);
    console.log('✅ next-env.d.ts removed');
}

// Find all TypeScript files and convert them to JavaScript
const findTsFiles = (dir) => {
    let results = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git' && file !== 'out' && file !== '.next') {
            results = results.concat(findTsFiles(fullPath));
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            results.push(fullPath);
        }
    }

    return results;
};

console.log('Finding TypeScript files...');
const tsFiles = findTsFiles(__dirname);
console.log(`Found ${tsFiles.length} TypeScript files`);

// Convert TypeScript files to JavaScript
const removeTypeAnnotations = (content, file) => {
    // Fix Next.js specific TypeScript patterns
    if (content.includes('use client')) {
        console.log('Found "use client" directive, preserving it...');
    }

    // Remove import type statements
    content = content.replace(/import\s+type\s+[^;]+;/g, '');
    content = content.replace(/import\s+{\s*type\s+[^}]+}\s+from\s+['"][^'"]+['"];/g, '');

    // Fix import statements with type imports mixed with regular imports
    content = content.replace(/import\s+{([^}]*)}\s+from\s+(['"].*?['"])/g, (match, imports, from) => {
        // Remove 'type' keywords from import statement
        const cleanImports = imports.replace(/\btype\s+/g, '');
        return `import {${cleanImports}} from ${from}`;
    });

    // Remove interface declarations
    content = content.replace(/interface\s+\w+(\s+extends\s+[^{]+)?\s*{[^}]*}/gs, '');

    // Remove type declarations
    content = content.replace(/type\s+\w+(\s*<[^>]*>)?\s*=\s*[^;]+;/g, '');
    content = content.replace(/export\s+type\s+\w+(\s*<[^>]*>)?\s*=\s*[^;]+;/g, '');

    // Remove type annotations from function parameters and return types
    content = content.replace(/:\s*[\w\[\]<>,\s|&{}()\.'"`]+(?=[,)=;])/g, '');

    // Remove type assertions
    content = content.replace(/as\s+[\w\[\]<>,\s|&{}]+/g, '');

    // Remove generic type parameters
    content = content.replace(/<[^>]+>(?=\s*\()/g, '');

    // Remove TypeScript specific modifiers
    content = content.replace(/\breadonly\b\s+/g, '');
    content = content.replace(/\bpublic\b\s+/g, '');
    content = content.replace(/\bprivate\b\s+/g, '');
    content = content.replace(/\bprotected\b\s+/g, '');

    // Fix class property declarations with type annotations
    content = content.replace(/(\s*)([\w$]+)\s*:\s*[\w\[\]<>,\s|&{}]+\s*=/g, '$1$2 =');

    // Fix function declarations with type parameters
    content = content.replace(/function\s+(\w+)\s*<[^>]*>\s*\(/g, 'function $1(');

    // Fix arrow functions with type parameters
    content = content.replace(/const\s+(\w+)\s*=\s*<[^>]*>\s*\(/g, 'const $1 = (');

    // Fix export declarations
    content = content.replace(/export\s+{\s*type\s+[^}]+\s*};?/g, '');

    // Fix import paths: .ts to .js and .tsx to .jsx
    content = content.replace(/from\s+(['"])([^'"]+)\.tsx?(['"])/g, (match, quote1, path, quote2) => {
        return `from ${quote1}${path}${path.endsWith('.tsx') ? '.jsx' : '.js'}${quote2}`;
    });

    // Preserve React import if it exists
    if (!content.includes("import React")) {
        content = "import React from 'react';\n" + content;
    }

    // Special handling for page components - make sure they have correct metadata and params
    if (file.includes('/page.')) {
        // Fix common issues with Next.js page components
        if (content.includes('export const metadata') && content.includes('title,') && !content.includes('const title')) {
            content = content.replace(/title,/g, "title: 'Page Title',");
        }

        // Fix any semicolons in object declarations
        content = content.replace(/(\w+);(\s+[\]\}])/g, '$1$2');
    }

    // Fix nested ternary expressions that got mangled
    content = content.replace(/(\w+)\s*===\s*(['"][^'"]+['"])\s*\?\s*(['"][^'"]+['"])\s*===\s*(['"][^'"]+['"])\s*\?\s*(['"][^'"]+['"])\s*:/g,
        "$1 === $2 ? $3 : $1 === $4 ? $5 :");

    return content;
};

console.log('Converting TypeScript files to JavaScript...');
for (const file of tsFiles) {
    try {
        console.log(`Converting ${file}...`);

        // Read file content
        const content = fs.readFileSync(file, 'utf8');

        // Remove TypeScript annotations
        const jsContent = removeTypeAnnotations(content, file);

        // Create new file path (.ts -> .js, .tsx -> .jsx)
        const newPath = file.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js');

        // Write new file
        fs.writeFileSync(newPath, jsContent);
        console.log(`✅ Created ${newPath}`);

        // Remove original TypeScript file
        fs.unlinkSync(file);
        console.log(`✅ Removed ${file}`);
    } catch (e) {
        console.error(`Error converting ${file}:`, e);
    }
}

// Update next.config.js to remove TypeScript settings
const nextConfigPath = path.join(__dirname, 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
    console.log('Updating next.config.js...');
    let content = fs.readFileSync(nextConfigPath, 'utf8');

    // Remove TypeScript configuration
    content = content.replace(/typescript:\s*{[^}]*},?/g, '');
    content = content.replace(/\/\/\s*TypeScript.*$/gm, '');

    fs.writeFileSync(nextConfigPath, content);
    console.log('✅ Updated next.config.js');
}

// Update package.json to remove TypeScript-related packages
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
    console.log('Updating package.json...');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Remove TypeScript and type definitions
    if (packageJson.dependencies) {
        delete packageJson.dependencies.typescript;
        delete packageJson.dependencies['@types/react'];
        delete packageJson.dependencies['@types/react-dom'];
        delete packageJson.dependencies['@types/node'];
        delete packageJson.dependencies['@types/firebase'];
        // Remove any other @types packages
        Object.keys(packageJson.dependencies).forEach(dep => {
            if (dep.startsWith('@types/')) {
                delete packageJson.dependencies[dep];
            }
        });
    }

    if (packageJson.devDependencies) {
        delete packageJson.devDependencies.typescript;
        delete packageJson.devDependencies['@types/react'];
        delete packageJson.devDependencies['@types/react-dom'];
        delete packageJson.devDependencies['@types/node'];
        delete packageJson.devDependencies['@types/firebase'];
        // Remove any other @types packages
        Object.keys(packageJson.devDependencies || {}).forEach(dep => {
            if (dep.startsWith('@types/')) {
                delete packageJson.devDependencies[dep];
            }
        });
    }

    // Remove TypeScript-related scripts
    if (packageJson.scripts) {
        const cleanedScripts = {};
        for (const [key, script] of Object.entries(packageJson.scripts)) {
            cleanedScripts[key] = script
                .replace(/\s+--typecheck\b/g, '')
                .replace(/\s+tsc\b[^&]*/g, '')
                .replace(/\s+SKIP_TYPE_CHECK=1\b/g, '');
        }
        packageJson.scripts = cleanedScripts;
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json');
}

// Create a simple jsconfig.json file to help with IDE support
const jsconfigPath = path.join(__dirname, 'jsconfig.json');
const jsconfig = {
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"]
        },
        "jsx": "react",
        "checkJs": false
    },
    "exclude": ["node_modules", ".next", "out"]
};

fs.writeFileSync(jsconfigPath, JSON.stringify(jsconfig, null, 2));
console.log('✅ Created jsconfig.json');

// Update netlify-prebuild.sh to remove TypeScript installations
const netlifyPrebuildPath = path.join(__dirname, 'netlify-prebuild.sh');
if (fs.existsSync(netlifyPrebuildPath)) {
    console.log('Updating netlify-prebuild.sh...');
    let content = fs.readFileSync(netlifyPrebuildPath, 'utf8');

    // Replace TypeScript installation lines
    content = content.replace(/npm install --no-save --force typescript[^\n]+/g, '# TypeScript installation removed');
    content = content.replace(/if \[ ! -f "tsconfig\.json" \]; then[\s\S]*?fi/g, '# tsconfig.json creation removed');
    content = content.replace(/if \[ ! -f "next-env\.d\.ts" \]; then[\s\S]*?fi/g, '# next-env.d.ts creation removed');

    fs.writeFileSync(netlifyPrebuildPath, content);
    console.log('✅ Updated netlify-prebuild.sh');
}

console.log('=== CONVERSION TO JAVASCRIPT COMPLETE ===');
console.log('Your project has been converted from TypeScript to JavaScript. You may need to fix any remaining TypeScript-specific code manually.'); 