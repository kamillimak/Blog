import https from 'https';

https.get('https://kamillimak.github.io/Blog/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    
    // Find all titles inside <h3> or similar tags inside <article>
    // In DailyBriefing.tsx: <h3 className="text-xl font-extrabold uppercase ...">{item.title}</h3>
    const matches = [...data.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].trim());
    console.log('Titles found in pre-rendered HTML:');
    matches.forEach((t, i) => console.log(`${i + 1}. ${t}`));
  });
}).on('error', (err) => {
  console.error(err);
});
