const fs = require('fs');
let code = fs.readFileSync('src/components/ImpactChart.tsx', 'utf8');

code = code.replace(
  /<YAxis[\s\S]*?allowDecimals=\{false\}\n\s*\/>/,
  `<YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              allowDecimals={false}
              domain={[0, (dataMax) => Math.max(dataMax, 4)]}
            />`
);

code = code.replace(
  /<Bar[\s\S]*?barSize=\{compact \? 30 : 40\}\n\s*>/,
  `<Bar
              dataKey="val"
              radius={[4, 4, 0, 0]}
              barSize={compact ? 30 : 40}
              minPointSize={4}
            >`
);

code = code.replace(
  /<Cell key=\{`cell-\$\{index\}`\} fill="\#8CC63F" \/>/,
  `<Cell key={\`cell-\${index}\`} fill={entry.val === 0 ? "#e2e8f0" : "#8CC63F"} />`
);

fs.writeFileSync('src/components/ImpactChart.tsx', code);
