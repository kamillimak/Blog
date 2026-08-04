import fs from 'fs';

const logPath = 'content/../.git/logs/HEAD'; // using relative path
if (fs.existsSync(logPath)) {
  const content = fs.readFileSync(logPath, 'utf8');
  const lines = content.trim().split('\n');
  console.log(`Total lines: ${lines.length}`);
  console.log('Last 10 lines:');
  lines.slice(-10).forEach((line, index) => {
    console.log(`${lines.length - 10 + index + 1}: ${line}`);
  });
} else {
  console.log('Log file not found');
}
