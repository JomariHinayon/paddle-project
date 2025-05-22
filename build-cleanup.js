const fs = require('fs');
const path = require('path');

// Check if we should skip cleanup (on Netlify)
if (fs.existsSync(path.join(__dirname, '.skip-cleanup'))) {
  console.log('Skipping cleanup as requested.');
  process.exit(0);
}

console.log('Cleaning up after static export build...');

// Restore API directory if it was moved
const tempApiDir = path.join(__dirname, 'temp-api-backup');
const apiDir = path.join(__dirname, 'src', 'app', 'api');

if (fs.existsSync(tempApiDir) && fs.existsSync(apiDir)) {
  console.log('Restoring API directory...');
  
  // Remove the temporary placeholder
  fs.rmSync(apiDir, { recursive: true, force: true });
  
  // Create API directory
  fs.mkdirSync(apiDir, { recursive: true });
  
  // Copy from backup
  const copyDir = (src, dest) => {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  };
  
  copyDir(path.join(tempApiDir, 'api'), apiDir);
  console.log('✅ API directory restored');
  
  // Remove the temporary backup
  fs.rmSync(tempApiDir, { recursive: true, force: true });
  console.log('✅ Temporary backup removed');
}

console.log('Cleanup complete!'); 