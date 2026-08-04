import fs from 'fs';
import path from 'path';

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      console.log('Dir:', fullPath);
      scanDir(fullPath);
    } else {
      console.log('File:', fullPath);
    }
  }
}

console.log('--- content/draft ---');
scanDir('content/draft');
