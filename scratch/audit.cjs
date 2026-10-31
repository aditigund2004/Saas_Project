const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts) {
  let res = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        res = res.concat(getAllFiles(fullPath, exts));
      }
    } else {
      if (exts.includes(path.extname(file))) {
        res.push(fullPath);
      }
    }
  }
  return res;
}

const files = getAllFiles('src', ['.jsx', '.tsx', '.js', '.ts']);

// 1. Collect all defined routes in App.jsx
const appContent = fs.readFileSync('src/App.jsx', 'utf8');
const routeMatches = [...appContent.matchAll(/path="([^"]+)"/g)].map(m => m[1]);
console.log('Total routes defined in App.jsx:', routeMatches.length);

// 2. Collect all Link to="..." and navigate(...) in codebase
let allNavDestinations = [];
let unroutedLinks = [];
let totalCustomButtons = 0;
let buttonsWithoutHandler = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(process.cwd(), file);

  // Link to="..."
  const toMatches = [...content.matchAll(/<Link[^>]+to=["']([^"']+)["']/g)].map(m => m[1]);
  const navMatches = [...content.matchAll(/navigate\(["']([^"']+)["']\)/g)].map(m => m[1]);
  const navs = [...toMatches, ...navMatches];

  navs.forEach(dst => {
    allNavDestinations.push({ file: rel, dst });
    // check if it's dynamic like /clinic/appointments or starts with /
    if (dst.startsWith('/') && !dst.includes(':') && !dst.includes('${')) {
      // normalize
      const cleanDst = dst.split('?')[0];
      const matched = routeMatches.some(r => {
        if (r === cleanDst) return true;
        // check sub-routes
        if (r.startsWith('/') && cleanDst.startsWith(r)) return true;
        return false;
      });
      // Also check if matches superadmin, clinic, reception, patient
      const basePrefixes = ['/superadmin', '/clinic', '/reception', '/patient', '/register', '/login', '/about', '/contact', '/privacy', '/terms', '/demo-access', '/pricing', '/faq', '/features', '/solutions', '/clinics', '/signup', '/forgot-password'];
      const hasKnownPrefix = basePrefixes.some(p => cleanDst.startsWith(p)) || cleanDst === '/';
      if (!hasKnownPrefix) {
        unroutedLinks.push({ file: rel, dst: cleanDst });
      }
    }
  });

  // Check <Button ... />
  const customBtnMatches = content.match(/<Button[\s\S]*?>/g) || [];
  totalCustomButtons += customBtnMatches.length;
}

console.log('Total Link & navigate destinations checked:', allNavDestinations.length);
console.log('Potentially unrouted links:', unroutedLinks.length);
if (unroutedLinks.length > 0) {
  console.log('Unrouted samples:', unroutedLinks.slice(0, 10));
}
console.log('Total <Button /> components:', totalCustomButtons);

