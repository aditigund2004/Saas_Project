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

const tableIssues = [];
const fixedWidthIssues = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(process.cwd(), file);

  // Check tables: does <table appear without overflow-x-auto in parent?
  const tableIdx = content.indexOf('<table');
  if (tableIdx !== -1) {
    // Check preceding 200 chars for overflow-x-auto or overflow-x-scroll
    const preceding = content.slice(Math.max(0, tableIdx - 300), tableIdx);
    if (!preceding.includes('overflow-x-auto') && !preceding.includes('overflow-x-scroll') && !preceding.includes('overflow-auto')) {
      tableIssues.push(rel);
    }
  }

  // Check large min-w fixed classes that might overflow 320px screen
  const minWMatches = [...content.matchAll(/min-w-\[(\d+)px\]/g)];
  for (const m of minWMatches) {
    const px = parseInt(m[1], 10);
    if (px > 300) {
      fixedWidthIssues.push({ file: rel, match: m[0], px });
    }
  }
}

console.log('Tables without immediate overflow-x-auto wrapper:', tableIssues.length);
if (tableIssues.length > 0) {
  console.log('Table files:', tableIssues);
}
console.log('Fixed min-w > 300px:', fixedWidthIssues.length);
if (fixedWidthIssues.length > 0) {
  console.log('Fixed min-w samples:', fixedWidthIssues.slice(0, 10));
}

