import fs from 'fs';
import path from 'path';

function findFile(dir, targetName) {
  let results = [];
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        results = results.concat(findFile(fullPath, targetName));
      } else if (file.toLowerCase() === targetName.toLowerCase()) {
        results.push(fullPath);
      }
    }
  } catch (e) {
    // Ignore
  }
  return results;
}

const userProfile = process.env.USERPROFILE || '';
const searchDirs = [
  path.join(userProfile, 'AppData/Local/Programs'),
  path.join(userProfile, 'AppData/Local/GitHubDesktop'),
  'C:\\Program Files',
  'C:\\Program Files (x86)'
];

console.log('Searching for git.exe in:', searchDirs);
for (const dir of searchDirs) {
  if (fs.existsSync(dir)) {
    const found = findFile(dir, 'git.exe');
    if (found.length > 0) {
      console.log(`Found in ${dir}:`, found);
    }
  }
}
console.log('Search finished.');
