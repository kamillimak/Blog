import fs from 'fs';

const content = fs.readFileSync('src/data/newsFeed.ts', 'utf8');
const match = content.match(/const NEWSROOM_VIDEOS[\s\S]*?\];/);
if (match) {
  console.log(match[0]);
} else {
  console.log("Not found");
}
