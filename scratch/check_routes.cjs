const fs = require('fs');
const app = fs.readFileSync('src/App.jsx', 'utf8');
const routes = [...app.matchAll(/<Route\s+[^>]*path=['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Routes in App.jsx: (' + routes.length + ' total)');
console.log(routes.join('\n'));

