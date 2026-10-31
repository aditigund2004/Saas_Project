const fs = require('fs');

// FeaturesPage.jsx
let feat = fs.readFileSync('src/features/public-website/FeaturesPage.jsx', 'utf8');
feat = feat.replace(/bg-blue-600/g, 'bg-[#15803D]');
feat = feat.replace(/shadow-blue-500\/30/g, 'shadow-green-700/30');
feat = feat.replace(/border-blue-600/g, 'border-[#15803D]');
feat = feat.replace(/border-blue-400/g, 'border-[#86EFAC]');
feat = feat.replace(/text-blue-600/g, 'text-[#15803D]');
feat = feat.replace(/text-blue-800/g, 'text-[#166534]');
fs.writeFileSync('src/features/public-website/FeaturesPage.jsx', feat);
console.log('FeaturesPage.jsx updated!');

// PricingPage.jsx
let price = fs.readFileSync('src/features/public-website/PricingPage.jsx', 'utf8');
price = price.replace(/text-blue-700/g, 'text-[#166534]');
price = price.replace(/text-blue-600/g, 'text-[#15803D]');
fs.writeFileSync('src/features/public-website/PricingPage.jsx', price);
console.log('PricingPage.jsx updated!');

// ContactPage.jsx
let contact = fs.readFileSync('src/features/public-website/ContactPage.jsx', 'utf8');
contact = contact.replace(/bg-blue-900/g, 'bg-[#062412]');
contact = contact.replace(/text-blue-200/g, 'text-emerald-200');
fs.writeFileSync('src/features/public-website/ContactPage.jsx', contact);
console.log('ContactPage.jsx updated!');

