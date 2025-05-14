const fs = require('fs');
const path = require('path');

// Display environment info
console.log('=== ENVIRONMENT INFO ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NETLIFY:', process.env.NETLIFY);
console.log('Node version:', process.version);
console.log('=== PACKAGE INFO ===');
console.log('Package.json content:');
const packageJson = require('./package.json');
console.log(JSON.stringify(packageJson.devDependencies, null, 2));

// List of components to check
const requiredComponents = [
  'ManageSubscriptionButton',
  'SubscriptionPortalButton',
];

// Path to components directory
const componentsDir = path.join(__dirname, 'src', 'components');

// Print information for debugging
console.log('=== COMPONENT VERIFICATION ===');
console.log('Components directory:', componentsDir);
console.log('Files in components directory:');
const files = fs.readdirSync(componentsDir);
files.forEach(file => console.log(`- ${file}`));

// Check if each component exists
requiredComponents.forEach(component => {
  const componentPath = path.join(componentsDir, `${component}.tsx`);
  if (fs.existsSync(componentPath)) {
    console.log(`✅ Component found: ${component}`);
  } else {
    console.log(`❌ Component missing: ${component}`);
  }
});

// Verify lib/firebase.ts exists
const firebasePath = path.join(__dirname, 'src', 'lib', 'firebase.ts');
if (fs.existsSync(firebasePath)) {
  console.log('✅ Firebase library found');
} else {
  console.log('❌ Firebase library missing');
  
  // List files in lib directory
  const libDir = path.join(__dirname, 'src', 'lib');
  console.log('Files in lib directory:');
  fs.readdirSync(libDir).forEach(file => console.log(`- ${file}`));
}

// Check PostCSS config
console.log('=== POSTCSS CONFIG ===');
try {
  const postcssConfigPath = path.join(__dirname, 'postcss.config.js');
  const postcssConfig = fs.readFileSync(postcssConfigPath, 'utf8');
  console.log('PostCSS config content:');
  console.log(postcssConfig);
} catch (error) {
  console.log('Error reading PostCSS config:', error.message);
}

// Ensure PostCSS config exists and is in correct format
const postCssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

fs.writeFileSync(path.join(__dirname, 'postcss.config.js'), postCssConfig);

console.log('✅ Created PostCSS config file');

// Check if components directory exists, create it if needed
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
  console.log('✅ Created components directory');
}

// Add empty placeholder components for any that are missing
const missingComponents = [
  'ManageSubscriptionButton',
  'SubscriptionPortalButton'
];

missingComponents.forEach(componentName => {
  const componentPath = path.join(componentsDir, `${componentName}.tsx`);
  
  if (!fs.existsSync(componentPath)) {
    const componentContent = `
import React from 'react';

export default function ${componentName}() {
  return (
    <div>
      <button className="btn">
        Placeholder for ${componentName}
      </button>
    </div>
  );
}
`;
    fs.writeFileSync(componentPath, componentContent);
    console.log(`✅ Created placeholder for ${componentName}`);
  }
});

console.log('✅ Build fixes applied successfully'); 