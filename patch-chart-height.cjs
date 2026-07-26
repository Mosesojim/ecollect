const fs = require('fs');
let code = fs.readFileSync('src/components/ImpactChart.tsx', 'utf8');

code = code.replace(
  /<ResponsiveContainer width="100%" height="100%">/,
  '<ResponsiveContainer width="100%" height={compact ? 220 : 300}>'
);

fs.writeFileSync('src/components/ImpactChart.tsx', code);
