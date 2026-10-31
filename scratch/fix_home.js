const fs = require('fs');
let code = fs.readFileSync('src/features/public-website/HomePage.jsx', 'utf8');

// Replace all blue styling instances with the green healthcare system
code = code.replace(/text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/g, 'text-[#166534] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#86EFAC]');
code = code.replace(/text-blue-600 hover:text-blue-800/g, 'text-[#15803D] hover:text-[#166534]');
code = code.replace(/bg-blue-600\/10/g, 'bg-emerald-600/10');
code = code.replace(/text-blue-400/g, 'text-emerald-400');
code = code.replace(/text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/g, 'text-[#166534] uppercase tracking-widest bg-[#F0FDF4] px-3.5 py-1.5 rounded-full border border-[#86EFAC]');
code = code.replace(/hover:border-blue-400/g, 'hover:border-[#15803D]');
code = code.replace(/text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5/g, 'text-[#166534] bg-[#F0FDF4] border border-[#86EFAC] px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5');
code = code.replace(/w-1.5 h-1.5 rounded-full bg-blue-500/g, 'w-1.5 h-1.5 rounded-full bg-[#15803D]');
code = code.replace(/'bg-blue-600 text-white shadow-lg shadow-blue-500\/30 scale-102 border-2 border-blue-600'/g, "'bg-[#15803D] text-white shadow-lg shadow-green-700/30 scale-102 border-2 border-[#15803D]'");
code = code.replace(/'text-blue-600'/g, "'text-[#15803D]'");
code = code.replace(/bg-blue-50 text-blue-700 border border-blue-200/g, 'bg-[#F0FDF4] text-[#166534] border border-[#86EFAC]');
code = code.replace(/text-sm font-bold text-blue-600 hover:underline/g, 'text-sm font-bold text-[#15803D] hover:underline');
code = code.replace(/bg-blue-600\/15/g, 'bg-emerald-600/15');
code = code.replace(/text-blue-400 uppercase tracking-widest bg-blue-950\/70 border border-blue-800\/80/g, 'text-emerald-300 uppercase tracking-widest bg-emerald-950/70 border border-emerald-800/80');
code = code.replace(/hover:border-blue-500\/70/g, 'hover:border-emerald-500/70');
code = code.replace(/bg-blue-500\/20 text-blue-400 border border-blue-400\/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/g, 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#15803D]');
code = code.replace(/group-hover:text-blue-300/g, 'group-hover:text-emerald-300');
code = code.replace(/text-5xl font-black text-blue-600\/35 block mb-3 font-mono/g, 'text-5xl font-black text-emerald-600/35 block mb-3 font-mono');
code = code.replace(/px-2.5 py-1 rounded-lg text-xs font-extrabold bg-blue-600 text-white shadow-sm/g, 'px-2.5 py-1 rounded-lg text-xs font-extrabold bg-[#15803D] text-white shadow-sm');
code = code.replace(/text-xs font-bold text-blue-700 mt-0.5/g, 'text-xs font-bold text-[#166534] mt-0.5');

// Update CTA banner at bottom:
code = code.replace(
  'bg-gradient-to-br from-slate-950 via-[#0B1528] to-blue-950 text-white p-10 sm:p-14 lg:p-16 shadow-2xl border-2 border-blue-500/30 overflow-hidden',
  'bg-gradient-to-br from-slate-950 via-[#062412] to-emerald-950 text-white p-10 sm:p-14 lg:p-16 shadow-2xl border-2 border-emerald-500/30 overflow-hidden'
);
code = code.replace('bg-blue-600/25 rounded-full blur-3xl pointer-events-none animate-glow-pulse', 'bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-glow-pulse');
code = code.replace('bg-indigo-600/20 rounded-full blur-3xl pointer-events-none', 'bg-green-600/15 rounded-full blur-3xl pointer-events-none');
code = code.replace(
  'bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs sm:text-sm font-bold',
  'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-bold'
);
code = code.replace(
  'className="h-13 px-8 text-base font-black rounded-2xl shadow-xl hover:scale-102 transition-all text-slate-950"',
  'className="h-13 px-8 text-base font-black rounded-2xl shadow-xl hover:scale-102 transition-all text-[#14532D] hover:bg-emerald-50"'
);
code = code.replace(
  'bg-slate-900/90 rounded-3xl border-2 border-slate-700/80 p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-5',
  'bg-slate-900/90 rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-5'
);
code = code.replace(
  'bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm',
  'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm'
);

fs.writeFileSync('src/features/public-website/HomePage.jsx', code);
console.log('HomePage.jsx successfully updated!');

