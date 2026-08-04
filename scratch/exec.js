import { execSync } from 'child_process';

const cmd = process.argv.slice(2).join(' ');
if (!cmd) {
  console.log('Usage: node exec.js <command>');
  process.exit(1);
}

try {
  console.log(`Running: ${cmd}`);
  const stdout = execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
  console.log('STDOUT:\n', stdout);
} catch (error) {
  console.error('ERROR:\n', error.message);
  if (error.stdout) console.error('STDOUT:\n', error.stdout);
  if (error.stderr) console.error('STDERR:\n', error.stderr);
}
