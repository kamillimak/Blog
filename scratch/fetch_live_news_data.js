import https from 'https';

const url = 'https://kamillimak.github.io/Blog/assets/index-bcT5qI3V.js';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Bundle fetched, size:', data.length);
    
    // We search for the compiled daily briefing and top3 items in the JS file.
    // Let's find occurrences of the known titles and print their position in the file.
    const titles = [
      "Nvidia i partnerzy powołują",
      "Poprawki",
      "MON zapowiada",
      "Program PERUN",
      "No-Code",
      "Spear-phishing",
      "Autonomiczne agenty",
      "Micro-SaaS",
      "Fake jobs",
      "Wyścig"
    ];
    
    const found = [];
    titles.forEach(title => {
      const idx = data.indexOf(title);
      if (idx !== -1) {
        found.push({ title, index: idx });
      }
    });
    
    found.sort((a, b) => a.index - b.index);
    console.log('Order of titles found in the live JS bundle:');
    found.forEach((f, i) => {
      console.log(`${i + 1}. [Offset: ${f.index}] - ${f.title}`);
    });
  });
}).on('error', (err) => {
  console.error(err);
});
