import fs from 'fs';

const content = fs.readFileSync('src/pages/NewHomePage.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.includes('3000')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
