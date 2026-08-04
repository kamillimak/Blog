import fs from 'fs';
import path from 'path';

function getDirs(p) {
  if (!fs.existsSync(p)) return [];
  return fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());
}

console.log('daily-news dirs:', getDirs('content/daily-news').sort());
console.log('draft dirs:', getDirs('content/draft').sort());
