import https from 'https';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function verify() {
  try {
    console.log('Fetching live index.html...');
    const indexResult = await get('https://kamillimak.github.io/Blog/');
    console.log('index.html status:', indexResult.statusCode);
    
    const match = indexResult.data.match(/src="([^"]+\/assets\/index-[^"]+\.js)"/);
    if (!match) {
      console.error('Could not find index.js asset in HTML!');
      console.log('HTML preview:\n', indexResult.data.slice(0, 1500));
      return;
    }
    
    const assetPath = match[1];
    const assetUrl = assetPath.startsWith('http') ? assetPath : `https://kamillimak.github.io${assetPath}`;
    console.log('Found JS asset URL:', assetUrl);
    
    console.log('Fetching JS bundle...');
    const jsResult = await get(assetUrl);
    console.log('JS bundle status:', jsResult.statusCode);
    console.log('JS bundle size:', jsResult.data.length);
    
    // Find allowedDates in the new bundle
    const allowedDatesMatch = jsResult.data.match(/allowedDates\s*=\s*new\s+Set\(\[([^\]]+)\]\)/) || jsResult.data.match(/Set\(\["2026-07-[^"]+"(?:,\s*"2026-07-[^"]+")+\]\)/g);
    console.log('allowedDates matches in live JS:', allowedDatesMatch);
    
  } catch (e) {
    console.error('Verification failed:', e);
  }
}

verify();
