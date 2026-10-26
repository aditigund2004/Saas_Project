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

const files = getAllFiles('src', ['.jsx', '.tsx']);

const iconButtonsWithoutAria = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(process.cwd(), file);

  // Match <button ... > ... </button>
  const btnMatches = [...content.matchAll(/<button([\s\S]*?)>([\s\S]*?)<\/button>/g)];
  for (const match of btnMatches) {
    const attrs = match[1];
    const inner = match[2].trim();

    // If inner is just an icon like <X ... />, <ChevronDown ... />, <Trash2 ... /> and no visible text
    const isIconOnly = inner.startsWith('<') && inner.endsWith('/>') && !inner.includes('span') && !inner.includes('text-');
    if (isIconOnly) {
      if (!attrs.includes('aria-label') && !attrs.includes('title')) {
        iconButtonsWithoutAria.push({ file: rel, line: content.slice(0, match.index).split('\n').length, tag: match[0].slice(0, 120) });
      }
    }
  }
}

console.log('Icon-only buttons missing aria-label or title:', iconButtonsWithoutAria.length);
if (iconButtonsWithoutAria.length > 0) {
  console.log('Samples:', iconButtonsWithoutAria.slice(0, 15));
}

