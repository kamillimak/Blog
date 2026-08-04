import fs from 'fs';
import path from 'path';

const IGNORE_DIRS = ['.git', 'node_modules', 'dist', 'scratch', '.agents', '.codex'];

function scanDir(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (IGNORE_DIRS.includes(file)) continue;
    const fullPath = path.join(dir, file);
    try {
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        scanDir(fullPath, filesList);
      } else {
        filesList.push({ path: fullPath, mtime: stats.mtime });
      }
    } catch (e) {
      // Ignore errors
    }
  }
  return filesList;
}

const allFiles = scanDir('.');
// Sort by modification time descending
allFiles.sort((left, right) => right.mtime - left.mtime);

console.log('Top 25 recently modified files in the workspace:');
allFiles.slice(0, 25).forEach(f => {
  console.log(`${f.mtime.toISOString()} - ${f.path}`);
});
