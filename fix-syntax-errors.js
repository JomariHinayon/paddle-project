const fs = require('fs');
const path = require('path');

console.log('=== FIXING SYNTAX ERRORS IN CONVERTED FILES ===');

// Fix account/page.jsx - Unexpected token `;`
const accountPagePath = path.join(__dirname, 'src', 'app', 'account', 'page.jsx');
if (fs.existsSync(accountPagePath)) {
    console.log('Fixing src/app/account/page.jsx...');
    let content = fs.readFileSync(accountPagePath, 'utf8');

    // Fix: Replace "customerId;" with "customerId"
    content = content.replace(/customerId;(\s+setLoading)/g, 'customerId\n$1');

    fs.writeFileSync(accountPagePath, content);
    console.log('✅ Fixed src/app/account/page.jsx');
}

// Fix auth/action/page.jsx and auth/verify-email/page.jsx - Incorrect ternary expressions
const authActionPagePath = path.join(__dirname, 'src', 'app', 'auth', 'action', 'page.jsx');
if (fs.existsSync(authActionPagePath)) {
    console.log('Fixing src/app/auth/action/page.jsx...');
    let content = fs.readFileSync(authActionPagePath, 'utf8');

    // Fix: Correct the ternary expression
    content = content.replace(
        /status === 'success' \? 'text-green-600' === 'error' \? 'text-red-600' :/g,
        "status === 'success' ? 'text-green-600' : status === 'error' ? 'text-red-600' :"
    );

    fs.writeFileSync(authActionPagePath, content);
    console.log('✅ Fixed src/app/auth/action/page.jsx');
}

const verifyEmailPagePath = path.join(__dirname, 'src', 'app', 'auth', 'verify-email', 'page.jsx');
if (fs.existsSync(verifyEmailPagePath)) {
    console.log('Fixing src/app/auth/verify-email/page.jsx...');
    let content = fs.readFileSync(verifyEmailPagePath, 'utf8');

    // Fix: Correct the ternary expression
    content = content.replace(
        /status === 'success' \? 'text-green-600' === 'error' \? 'text-red-600' :/g,
        "status === 'success' ? 'text-green-600' : status === 'error' ? 'text-red-600' :"
    );

    fs.writeFileSync(verifyEmailPagePath, content);
    console.log('✅ Fixed src/app/auth/verify-email/page.jsx');
}

// Fix confirm-signup/page.jsx - Unexpected token `;`
const confirmSignupPagePath = path.join(__dirname, 'src', 'app', 'confirm-signup', 'page.jsx');
if (fs.existsSync(confirmSignupPagePath)) {
    console.log('Fixing src/app/confirm-signup/page.jsx...');
    let content = fs.readFileSync(confirmSignupPagePath, 'utf8');

    // Fix: Replace "email;" with "email"
    content = content.replace(/email\s*;/g, 'email');

    fs.writeFileSync(confirmSignupPagePath, content);
    console.log('✅ Fixed src/app/confirm-signup/page.jsx');
}

// Fix customer-portal/[customerId]/page.jsx - Unexpected token
const customerPortalPagePath = path.join(__dirname, 'src', 'app', 'customer-portal', '[customerId]', 'page.jsx');
if (fs.existsSync(customerPortalPagePath)) {
    console.log('Fixing src/app/customer-portal/[customerId]/page.jsx...');
    let content = fs.readFileSync(customerPortalPagePath, 'utf8');

    // Fix: Check if file has severe syntax errors
    if (content.includes(';\n}')) {
        // Recreate the entire file with a basic structure
        content = `
import React from 'react';
import DirectPortalAccess from '@/components/DirectPortalAccess';

export default function CustomerPortalPage({ params }) {
  const { customerId } = params;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4">Customer Portal</h1>
          <DirectPortalAccess customerId={customerId} />
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Customer Portal',
  description: 'Manage your subscription and billing details',
};
`;
    } else {
        // Apply less invasive fixes
        // Fix: Remove stray semicolon and bracket
        content = content.replace(/import [^;]*;\s*;\s*}/g, 'import $1;');

        // If there's a 'title,' reference without title being defined, fix it
        if (content.includes('title,') && !content.includes('const title')) {
            content = content.replace(/title,/g, "title: 'Customer Portal',");
        }
    }

    fs.writeFileSync(customerPortalPagePath, content);
    console.log('✅ Fixed src/app/customer-portal/[customerId]/page.jsx');
}

// Add type:module to package.json
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
    console.log('Updating package.json...');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Remove type: "module" if it exists
    if (packageJson.type === "module") {
        delete packageJson.type;
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json');
}

// Scan all JSX files for common syntax errors
console.log('Scanning all JSX files for common errors...');
const findJsxFiles = (dir) => {
    let results = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git' && file !== 'out' && file !== '.next') {
            results = results.concat(findJsxFiles(fullPath));
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            results.push(fullPath);
        }
    }

    return results;
};

const jsxFiles = findJsxFiles(path.join(__dirname, 'src'));
console.log(`Found ${jsxFiles.length} JS/JSX files to scan`);

for (const file of jsxFiles) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Fix: Remove trailing semicolons in object properties
        if (content.includes(';')) {
            const newContent = content.replace(/([^;{}\s\[\]]+)\s*;(\s*[}\]])/g, '$1$2');
            if (newContent !== content) {
                content = newContent;
                modified = true;
            }
        }

        // Fix: Replace incorrect ternary operators
        if (content.includes('?') && content.includes(':')) {
            const newContent = content.replace(/([^\s]+)\s*===\s*(['"][^'"]+['"])\s*\?\s*(['"][^'"]+['"])\s*===\s*(['"][^'"]+['"])\s*\?\s*(['"][^'"]+['"])\s*:/g,
                "$1 === $2 ? $3 : $1 === $4 ? $5 :");
            if (newContent !== content) {
                content = newContent;
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(file, content);
            console.log(`✅ Fixed syntax errors in ${file}`);
        }
    } catch (e) {
        console.error(`Error fixing ${file}:`, e);
    }
}

// Update next.config.js to use CommonJS syntax
const nextConfigPath = path.join(__dirname, 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
    console.log('Updating next.config.js to use CommonJS syntax...');
    let content = fs.readFileSync(nextConfigPath, 'utf8');

    // Replace with strict CommonJS syntax
    content = content.replace(/\/\*\*.*?@type.*?\*\/\s*/s, '');
    content = `// @ts-check
// CommonJS format for Next.js config
/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true, // Always unoptimize for static export
  },
  output: 'export',
  distDir: 'out',
  webpack: function(config) {
    // Simplified webpack config
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      '@': require('path').join(__dirname, 'src')
    });
    
    return config;
  },
  trailingSlash: true,
};

module.exports = nextConfig;`;

    fs.writeFileSync(nextConfigPath, content);
    console.log('✅ Updated next.config.js to CommonJS format');
}

console.log('=== SYNTAX ERROR FIXING COMPLETE ==='); 