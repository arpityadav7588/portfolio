const fs = require('fs');
const path = require('path');

function copyFolder(src, dest) {
  try {
    if (fs.existsSync(src)) {
      // Ensure destination parent directory exists
      const destParent = path.dirname(dest);
      if (!fs.existsSync(destParent)) {
        fs.mkdirSync(destParent, { recursive: true });
      }
      // Copy directory recursively
      fs.cpSync(src, dest, { recursive: true, force: true });
      console.log(`Successfully copied ${src} to ${dest}`);
    } else {
      console.warn(`Source folder does not exist: ${src}`);
    }
  } catch (err) {
    console.error(`Error copying ${src} to ${dest}:`, err);
    process.exit(1);
  }
}

// Copy .next/static to .next/standalone/.next/static
copyFolder(
  path.join(__dirname, '..', '.next', 'static'),
  path.join(__dirname, '..', '.next', 'standalone', '.next', 'static')
);

// Copy public to .next/standalone/public
copyFolder(
  path.join(__dirname, '..', 'public'),
  path.join(__dirname, '..', '.next', 'standalone', 'public')
);
