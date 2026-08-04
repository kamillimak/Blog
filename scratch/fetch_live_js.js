import https from 'https';

https.get('https://kamillimak.github.io/Blog/assets/index-B1RoP-G8.js', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    console.log('Length:', data.length);
    
    // Find patterns like "2026-07-" in the bundle
    const matches = data.match(/"2026-07-\d{2}"/g) || [];
    console.log('Unique 2026-07 dates found in live JS bundle:', Array.from(new Set(matches)));
    
    // Let's search for "allowedDates" or similar patterns or how the news feed is structured.
    // e.g. does it contain "2026-07-20" or "2026-07-15" etc.
    const searchTerms = ["allowedDates", "UNIFIED_NEWS_FEED", "2026-07-20", "2026-07-19", "2026-07-18", "2026-07-17", "2026-07-16", "2026-07-15", "2026-07-14", "2026-07-13", "2026-07-12"];
    searchTerms.forEach(term => {
      console.log(`Contains "${term}":`, data.includes(term));
    });
  });
}).on('error', (err) => {
  console.error('Error fetching live JS:', err);
});
