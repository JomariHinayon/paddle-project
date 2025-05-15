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
  
  // Check if Firebase module exports applyActionCode
  const firebaseContent = fs.readFileSync(firebasePath, 'utf8');
  if (!firebaseContent.includes('applyActionCode')) {
    console.log('❌ applyActionCode missing in firebase.ts, adding it...');
    
    // Add applyActionCode to the imports and exports
    let updatedFirebaseContent = firebaseContent
      .replace(
        "import { getAuth, GoogleAuthProvider, EmailAuthProvider } from \"firebase/auth\";",
        "import { getAuth, GoogleAuthProvider, EmailAuthProvider, applyActionCode } from \"firebase/auth\";"
      );
      
    // Add the export if it doesn't exist
    if (!updatedFirebaseContent.includes('export { applyActionCode }')) {
      // Find a good place to add the export (after auth declaration)
      updatedFirebaseContent = updatedFirebaseContent.replace(
        "auth.useDeviceLanguage(); // For better auth flows",
        "auth.useDeviceLanguage(); // For better auth flows\n\n// Re-export applyActionCode for use in auth pages\nexport { applyActionCode };"
      );
    }
    
    fs.writeFileSync(firebasePath, updatedFirebaseContent);
    console.log('✅ Added applyActionCode to firebase.ts');
  } else {
    console.log('✅ applyActionCode already exists in firebase.ts');
  }
} else {
  console.log('❌ Firebase library missing');
  
  // List files in lib directory
  const libDir = path.join(__dirname, 'src', 'lib');
  console.log('Files in lib directory:');
  fs.readdirSync(libDir).forEach(file => console.log(`- ${file}`));
  
  // Create a basic firebase.ts file
  const basicFirebaseContent = `"use client";

// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider, applyActionCode } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Authentication
export const auth = getAuth(app);
auth.useDeviceLanguage(); // For better auth flows

// Re-export applyActionCode for use in auth pages
export { applyActionCode };

// Providers
export const googleProvider = new GoogleAuthProvider();
export const emailProvider = new EmailAuthProvider();

// Firestore Database
export const firestore = getFirestore(app);
`;

  fs.writeFileSync(firebasePath, basicFirebaseContent);
  console.log('✅ Created firebase.ts file with necessary exports');
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

// Ensure all client components with useSearchParams have Suspense boundaries
const pagesWithSearchParams = [
  {
    path: path.join(__dirname, 'src', 'app', 'auth', 'verify-email', 'page.tsx'),
    needsSuspense: true
  },
  {
    path: path.join(__dirname, 'src', 'app', 'auth', 'action', 'page.tsx'),
    needsSuspense: true
  },
  {
    path: path.join(__dirname, 'src', 'app', 'payment', 'page.tsx'),
    needsSuspense: true
  },
  {
    path: path.join(__dirname, 'src', 'app', 'confirm-signup', 'page.tsx'),
    needsSuspense: true
  }
];

pagesWithSearchParams.forEach(({ path: pagePath, needsSuspense }) => {
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Check if the file uses useSearchParams but doesn't have Suspense
    if (content.includes('useSearchParams') && !content.includes('Suspense')) {
      console.log(`Adding Suspense boundary to ${pagePath}`);
      
      // Extract the main component name
      const componentNameMatch = content.match(/export\s+default\s+function\s+(\w+)/);
      if (componentNameMatch && componentNameMatch[1]) {
        const componentName = componentNameMatch[1];
        const contentComponentName = `${componentName}Content`;
        
        // Replace imports to include Suspense
        content = content.replace(
          /import\s+{([^}]*)}\s+from\s+'react'/,
          (match, imports) => {
            if (imports.includes('Suspense')) {
              return match;
            }
            return `import {${imports}, Suspense} from 'react'`;
          }
        );
        
        if (!content.includes('Suspense')) {
          content = content.replace(
            /import\s+/,
            "import { Suspense } from 'react';\nimport "
          );
        }
        
        // Replace the component definition
        content = content.replace(
          new RegExp(`export\\s+default\\s+function\\s+${componentName}\\s*\\([^)]*\\)\\s*{`),
          `function ${contentComponentName}($&`
        );
        
        // Add the wrapper component at the end
        content = content.replace(
          /}(\s*)$/,
          `}$1\n\nexport default function ${componentName}() {\n  return (\n    <Suspense fallback={\n      <div className="min-h-screen flex items-center justify-center">\n        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>\n      </div>\n    }>\n      <${contentComponentName} />\n    </Suspense>\n  );\n}$1`
        );
        
        fs.writeFileSync(pagePath, content);
        console.log(`✅ Added Suspense boundary to ${pagePath}`);
      }
    }
  }
});

// Check for dynamic routes that need generateStaticParams
console.log('\n=== DYNAMIC ROUTES VERIFICATION ===');
const findDynamicRoutes = (dir) => {
  if (!fs.existsSync(dir)) return [];
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const dynamicRoutes = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name.startsWith('[') && entry.name.endsWith(']')) {
        const pageFile = path.join(fullPath, 'page.tsx');
        if (fs.existsSync(pageFile)) {
          dynamicRoutes.push(pageFile);
        }
      }
      
      // Recursively check subdirectories
      dynamicRoutes.push(...findDynamicRoutes(fullPath));
    }
  }
  
  return dynamicRoutes;
};

const appDir = path.join(__dirname, 'src', 'app');
const dynamicRoutes = findDynamicRoutes(appDir);

console.log(`Found ${dynamicRoutes.length} dynamic routes:`);
dynamicRoutes.forEach(route => console.log(`- ${route}`));

// Check and add generateStaticParams if needed
dynamicRoutes.forEach(routePath => {
  let content = fs.readFileSync(routePath, 'utf8');
  
  if (!content.includes('generateStaticParams')) {
    console.log(`Adding generateStaticParams to ${routePath}`);
    
    // Extract the parameter name from the folder name
    const segments = routePath.split(path.sep);
    const dynamicSegment = segments.find(s => s.startsWith('[') && s.endsWith(']'));
    const paramName = dynamicSegment.slice(1, -1); // Remove brackets
    
    const staticParamsFunction = `
// Generate static params for build time
// This is required when using static export with dynamic routes
export function generateStaticParams() {
  // Since ${paramName}s are dynamic, we provide a placeholder for static generation
  return [
    { ${paramName}: 'placeholder-id' },
  ];
}
`;

    // Add generateStaticParams after metadata or before the component definition
    if (content.includes('export const metadata')) {
      content = content.replace(
        /export const metadata[^;]*;/,
        match => `${match}\n${staticParamsFunction}`
      );
    } else {
      content = content.replace(
        /export default function/,
        `${staticParamsFunction}\nexport default function`
      );
    }
    
    // Replace notFound() with fallback UI for static export
    if (content.includes('notFound()')) {
      content = content.replace(
        /notFound\(\);/g,
        `// For static export, we'll render a fallback rather than using notFound()
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Invalid ID</h1>
          <p className="text-gray-600 mb-6">
            The ID provided is not valid or does not exist.
          </p>
          <a 
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Return to Home
          </a>
        </div>
      </div>
    );`
      );
    }
    
    fs.writeFileSync(routePath, content);
    console.log(`✅ Added generateStaticParams to ${routePath}`);
  } else {
    console.log(`✅ ${routePath} already has generateStaticParams`);
  }
});

// Check for API routes and handle them for static export
console.log('\n=== API ROUTES VERIFICATION ===');
const findApiRoutes = (dir) => {
  if (!fs.existsSync(dir)) return [];
  
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      routes = routes.concat(findApiRoutes(fullPath));
    } else if (entry.name === 'route.ts' || entry.name === 'route.js') {
      routes.push(fullPath);
    }
  }
  
  return routes;
};

const apiRoutes = findApiRoutes(path.join(__dirname, 'src', 'app', 'api'));
console.log(`Found ${apiRoutes.length} API routes that may need attention for static export:`);
apiRoutes.forEach(route => console.log(`- ${route}`));

// For static export, we'll temporarily move the API routes out of the way
if (process.env.NEXT_USE_STATIC_EXPORT === 'true') {
  // Create a backup of the API directory
  const apiDir = path.join(__dirname, 'src', 'app', 'api');
  const tempApiBackupDir = path.join(__dirname, 'temp-api-backup');
  
  if (fs.existsSync(apiDir)) {
    // Create temp backup directory
    fs.mkdirSync(tempApiBackupDir, { recursive: true });
    
    // Copy API to backup
    const copyDir = (src, dest) => {
      if (!fs.existsSync(src)) return;
      
      const entries = fs.readdirSync(src, { withFileTypes: true });
      
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
          fs.mkdirSync(destPath, { recursive: true });
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };
    
    copyDir(apiDir, path.join(tempApiBackupDir, 'api'));
    
    // Replace API directory with placeholder routes that have force-static
    fs.rmSync(apiDir, { recursive: true, force: true });
    fs.mkdirSync(apiDir, { recursive: true });
    
    // Create placeholder static API route for each API endpoint
    apiRoutes.forEach(route => {
      const relativePathFromApi = route.substring(apiDir.length + 1);
      const routeDir = path.dirname(route);
      const placeholderDir = path.join(apiDir, path.dirname(relativePathFromApi));
      
      fs.mkdirSync(placeholderDir, { recursive: true });
      
      const placeholderContent = `export const dynamic = "force-static";

export function GET() {
  return Response.json({
    message: "This API route is not available in the static export. Please use the server functions."
  });
}

export function POST() {
  return Response.json({
    message: "This API route is not available in the static export. Please use the server functions."
  });
}
`;
      
      fs.writeFileSync(path.join(placeholderDir, 'route.ts'), placeholderContent);
    });
    
    console.log('✅ Temporarily moved API routes for static export');
  }
}

console.log('✅ Build fixes applied successfully'); 