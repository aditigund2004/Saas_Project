const fs = require('fs');

// Fix MainLoginPage.jsx
let code = fs.readFileSync('src/features/auth/MainLoginPage.jsx', 'utf8');
code = code.replace(/focus:border-blue-600 focus:ring-4 focus:ring-blue-500\/15/g, 'focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/15');
code = code.replace(/text-blue-600 rounded-md border-2 border-slate-300 focus:ring-blue-500/g, 'text-[#15803D] rounded-md border-2 border-slate-300 focus:ring-[#15803D]');
code = code.replace(/shadow-blue-500\/25/g, 'shadow-green-700/25');
code = code.replace(/bg-blue-50\/80 border-2 border-blue-200/g, 'bg-[#F0FDF4] border-2 border-[#86EFAC]');
code = code.replace(/text-blue-950 block/g, 'text-[#14532D] block');
code = code.replace(/text-blue-700 font-mono/g, 'text-[#166534] font-mono');
code = code.replace(/text-blue-800 bg-white border border-blue-300 rounded-xl shadow-xs hover:bg-blue-50/g, 'text-[#166534] bg-white border border-[#86EFAC] rounded-xl shadow-xs hover:bg-[#F0FDF4]');
code = code.replace(/text-blue-600 hover:text-blue-800/g, 'text-[#15803D] hover:text-[#166534]');
code = code.replace(/text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-300/g, 'text-[#166534] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#86EFAC]');
code = code.replace(/<Sparkles className="w-4 h-4 text-blue-600/g, '<Sparkles className="w-4 h-4 text-[#15803D]');
fs.writeFileSync('src/features/auth/MainLoginPage.jsx', code);
console.log('MainLoginPage.jsx fixed!');

// Fix DoctorLoginPage.jsx
let doc = fs.readFileSync('src/features/auth/DoctorLoginPage.jsx', 'utf8');
doc = doc.replace(/bg-blue-700 hover:bg-blue-800/g, 'bg-[#15803D] hover:bg-[#166534]');
doc = doc.replace(/text-blue-900/g, 'text-[#14532D]');
doc = doc.replace(/bg-blue-100/g, 'bg-[#DCFCE7]');
doc = doc.replace(/ring-blue-500/g, 'ring-[#15803D]');
fs.writeFileSync('src/features/auth/DoctorLoginPage.jsx', doc);
console.log('DoctorLoginPage.jsx fixed!');

// Fix ReceptionistLoginPage.jsx
let rec = fs.readFileSync('src/features/auth/ReceptionistLoginPage.jsx', 'utf8');
rec = rec.replace(/bg-blue-700 hover:bg-blue-800/g, 'bg-[#15803D] hover:bg-[#166534]');
fs.writeFileSync('src/features/auth/ReceptionistLoginPage.jsx', rec);
console.log('ReceptionistLoginPage.jsx fixed!');

// Fix RegisterPage.jsx (in features/authentication)
let reg = fs.readFileSync('src/features/authentication/RegisterPage.jsx', 'utf8');
reg = reg.replace(/border-2 border-blue-500/g, 'border-2 border-[#15803D]');
reg = reg.replace(/from-blue-50\/40/g, 'from-[#F0FDF4]');
reg = reg.replace(/bg-blue-100\/70/g, 'bg-[#DCFCE7]');
fs.writeFileSync('src/features/authentication/RegisterPage.jsx', reg);
console.log('RegisterPage.jsx fixed!');

// Fix DemoAccessPage.jsx
let demo = fs.readFileSync('src/features/auth/DemoAccessPage.jsx', 'utf8');
demo = demo.replace(/bg-blue-600 flex items-center justify-center text-white/g, 'bg-[#15803D] flex items-center justify-center text-white');
demo = demo.replace(/bg-blue-600 hover:bg-blue-700/g, 'bg-[#15803D] hover:bg-[#166534]');
demo = demo.replace(/filterRole === t\.id\s*\?\s*'bg-blue-600 text-white shadow-xs'/g, "filterRole === t.id ? 'bg-[#15803D] text-white shadow-xs'");
demo = demo.replace(/text-blue-600 shrink-0/g, 'text-[#15803D] shrink-0');
fs.writeFileSync('src/features/auth/DemoAccessPage.jsx', demo);
console.log('DemoAccessPage.jsx fixed!');

