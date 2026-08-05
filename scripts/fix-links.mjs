import fs from 'fs';

const filePath = 'data/content.pl.json';
let content = fs.readFileSync(filePath, 'utf8');

// Replace old hash-based URLs with new path-based URLs
// Handle both Polish (usługi) and ASCII (uslugi) versions
content = content.replace(/\/usługi#prawo-karne/g, '/uslugi/prawo-karne');
content = content.replace(/\/uslugi#prawo-karne/g, '/uslugi/prawo-karne');
content = content.replace(/\/usługi#prawo-cywilne/g, '/uslugi/prawo-cywilne');
content = content.replace(/\/uslugi#prawo-cywilne/g, '/uslugi/prawo-cywilne');
content = content.replace(/\/usługi#prawo-rodzinne/g, '/uslugi/prawo-rodzinne');
content = content.replace(/\/uslugi#prawo-rodzinne/g, '/uslugi/prawo-rodzinne');
content = content.replace(/\/usługi#prawo-gospodarcze/g, '/uslugi/prawo-gospodarcze');
content = content.replace(/\/uslugi#prawo-gospodarcze/g, '/uslugi/prawo-gospodarcze');
content = content.replace(/\/usługi#prawo-administracyjne/g, '/uslugi/prawo-administracyjne');
content = content.replace(/\/uslugi#prawo-administracyjne/g, '/uslugi/prawo-administracyjne');
content = content.replace(/\/usługi#etpcz/g, '/uslugi/etpcz');
content = content.replace(/\/uslugi#etpcz/g, '/uslugi/etpcz');

fs.writeFileSync(filePath, content);
console.log('Done! Links updated successfully.');