const fs = require('fs');
let code = fs.readFileSync('src/components/ImpactChart.tsx', 'utf8');

// Change colors for light mode
code = code.replace(/bg-\[\#1E2821\]/g, 'bg-slate-50 border border-slate-200');
code = code.replace(/text-white/g, 'text-slate-900');
code = code.replace(/text-\[\#8D9B91\]/g, 'text-slate-600');
code = code.replace(/backgroundColor: "\#18201A"/g, 'backgroundColor: "#ffffff"');
code = code.replace(/color: "\#fff"/g, 'color: "#0f172a"');
code = code.replace(/stroke: "\#18201A"/g, 'stroke: "#ffffff"');

fs.writeFileSync('src/components/ImpactChart.tsx', code);
