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

// Find all TypeScript files and convert them to JavaScript
const findTsFiles = (dir) => {
    let results = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
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
const removeTypeAnnotations = (content) => {
    // Remove type imports
    content = content.replace(/import\s+type\s+[^;]+;/g, '');

    // Remove interface and type declarations
    content = content.replace(/interface\s+\w+\s*{[^}]*}/g, '');
    content = content.replace(/type\s+\w+\s*=\s*[^;]+;/g, '');

    // Remove type annotations like `: string`, `: number`, etc.
    content = content.replace(/:\s*[\w\[\]<>,\s|&]+(?=[,)=;])/g, '');

    // Remove generic type parameters like <T>
    content = content.replace(/<[^>]+>/g, '');

    // Remove "as Type" cast expressions
    content = content.replace(/\s+as\s+[\w\[\]<>,\s|&]+/g, '');

    // Replace TypeScript-specific keywords
    content = content.replace(/readonly\s+/g, '');

    // Fix any import statements that reference .ts files
    content = content.replace(/from\s+(['"])(.+?)\.ts(['"])/g, 'from $1$2.js$3');
    content = content.replace(/from\s+(['"])(.+?)\.tsx(['"])/g, 'from $1$2.jsx$3');

    return content;
};

console.log('Converting TypeScript files to JavaScript...');
for (const file of tsFiles) {
    try {
        console.log(`Converting ${file}...`);

        // Read file content
        const content = fs.readFileSync(file, 'utf8');

        // Remove TypeScript annotations
        const jsContent = removeTypeAnnotations(content);

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

    fs.writeFileSync(nextConfigPath, content);
    console.log('✅ Updated next.config.js');
}

// Remove TypeScript-related packages from package.json
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
    }

    if (packageJson.devDependencies) {
        delete packageJson.devDependencies.typescript;
        delete packageJson.devDependencies['@types/react'];
        delete packageJson.devDependencies['@types/react-dom'];
        delete packageJson.devDependencies['@types/node'];
        delete packageJson.devDependencies['@types/firebase'];
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json');
}

console.log('=== CONVERSION TO JAVASCRIPT COMPLETE ==='); 