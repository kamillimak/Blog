import https from 'https';

// 1. Fetch index.html to find the latest JS asset URL
https.get('https://kamillimak.github.io/Blog/', (res) => {
  let html = '';
  res.on('data', (chunk) => { html += chunk; });
  res.on('end', () => {
    const match = html.match(/assets\/index-[a-zA-Z0-9_-]+\.js/);
    if (!match) {
      console.error('Could not find JS asset link in index.html');
      return;
    }
    const jsUrl = `https://kamillimak.github.io/Blog/${match[0]}`;
    console.log('Found JS asset URL on live site:', jsUrl);
    
    // 2. Fetch the JS bundle and check for formatPolishDate regex
    https.get(jsUrl, (res2) => {
      let jsContent = '';
      res2.on('data', (chunk) => { jsContent += chunk; });
      res2.on('end', () => {
        const hasTzIndependentMatch = jsContent.includes('/^(\\d{4})-(\\d{2})-(\\d{2})$/');
        const oldNewDateMatch = jsContent.includes('new Date(dateStr)');
        console.log('Has regex for timezone-independent date parsing:', hasTzIndependentMatch);
        console.log('Contains fallback new Date(dateStr):', oldNewDateMatch);
      });
    });
  });
}).on('error', (err) => {
  console.error(err);
});
