import https from 'https';

https.get('https://kamillimak.github.io/Blog/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    console.log('Length:', data.length);
    // Print first 2000 chars and search for any script tags or dates like 2026-07
    console.log('Head:\n', data.slice(0, 1500));
    
    // Find all JS asset links
    const matches = data.matchAll(/src="([^"]+\.js)"/g);
    console.log('JS Assets:');
    for (const match of matches) {
      console.log(match[1]);
    }
  });
}).on('error', (err) => {
  console.error('Error fetching live site:', err);
});
