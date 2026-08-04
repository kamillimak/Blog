import fs from 'fs';

const content = fs.readFileSync('server.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.includes('createViteServer') || line.includes('vite') || line.includes('hmr') || line.includes('ws')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
