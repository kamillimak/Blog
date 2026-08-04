import https from 'https';

https.get('https://kamillimak.github.io/Blog/assets/index-B1RoP-G8.js', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    
    // Look for occurrences of "tech-" or "top3-" to see what news IDs are compiled
    const idMatches = data.match(/"(tech|top3)-\d{4}-\d{2}-\d{2}[^"]*"/g) || [];
    console.log('Sample news IDs in live JS bundle:', Array.from(new Set(idMatches)).slice(0, 20));
    
    // Let's find any allowedDates set or filter array
    const allowedDatesMatch = data.match(/allowedDates\s*=\s*new\s+Set\(\[([^\]]+)\]\)/) || data.match(/Set\(\["2026-07-[^"]+"(?:,\s*"2026-07-[^"]+")+\]\)/g);
    console.log('allowedDates match:', allowedDatesMatch);
    
    // Let's extract any date strings like 2026-07-XX in the bundle
    const dates = data.match(/2026-07-\d{2}/g) || [];
    const dateCounts = {};
    for (const d of dates) {
      dateCounts[d] = (dateCounts[d] || 0) + 1;
    }
    console.log('Date occurrences in bundle:', dateCounts);
  });
}).on('error', (err) => {
  console.error(err);
});
