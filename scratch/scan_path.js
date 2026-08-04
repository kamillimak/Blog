import fs from 'fs';
import path from 'path';

const pathDirs = (process.env.PATH || '').split(path.delimiter);
console.log(`Searching PATH containing ${pathDirs.length} directories...`);

let found = [];
for (const dir of pathDirs) {
  try {
    if (!fs.existsSync(dir)) continue;
    const stats = fs.statSync(dir);
    if (!stats.isDirectory()) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.toLowerCase() === 'git.exe' || file.toLowerCase() === 'git') {
        const fullPath = path.join(dir, file);
        console.log('FOUND Git:', fullPath);
        found.push(fullPath);
      }
    }
  } catch (e) {
    // Ignore errors for inaccessible directories
  }
}

if (found.length === 0) {
  console.log('No git.exe found on PATH.');
}
