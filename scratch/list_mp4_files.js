import fs from 'fs';
import path from 'path';

function findMp4(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      findMp4(fullPath, list);
    } else if (file.endsWith('.mp4')) {
      list.push(fullPath);
    }
  }
  return list;
}

console.log('Searching for MP4 files in public/ and assets/...');
const mp4s = findMp4('public').concat(findMp4('assets'));
mp4s.forEach(f => console.log(f));
