import fs from 'fs';
import path from 'path';

const commonPaths = [
  'C:\\Program Files\\Git\\cmd\\git.exe',
  'C:\\Program Files\\Git\\bin\\git.exe',
  'C:\\Program Files (x86)\\Git\\cmd\\git.exe',
  'C:\\Program Files (x86)\\Git\\bin\\git.exe',
  path.join(process.env.USERPROFILE || '', 'AppData\\Local\\Programs\\Git\\cmd\\git.exe'),
  path.join(process.env.USERPROFILE || '', 'AppData\\Local\\Programs\\Git\\bin\\git.exe'),
];

console.log('Searching for git.exe...');
let found = false;
for (const p of commonPaths) {
  if (fs.existsSync(p)) {
    console.log('FOUND:', p);
    found = true;
  }
}

if (!found) {
  console.log('Not found in common paths. Scanning C:\\Program Files...');
  // Let's do a quick scan of C:\Program Files
  try {
    const files = fs.readdirSync('C:\\Program Files');
    console.log('Program Files subdirs:', files.filter(f => f.toLowerCase().includes('git')));
  } catch (e) {
    console.error(e);
  }
}
