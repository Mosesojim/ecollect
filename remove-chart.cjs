const fs = require('fs');

// 1. Dashboard
let dashboard = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');
dashboard = dashboard.replace(/import \{ ImpactChart \} from "\.\.\/components\/ImpactChart";\n?/g, '');
dashboard = dashboard.replace(/<div className="mt-8">\s*<ImpactChart compact=\{true\} \/>\s*<\/div>/g, '');
fs.writeFileSync('src/pages/Dashboard.tsx', dashboard);

// 2. History
let history = fs.readFileSync('src/pages/History.tsx', 'utf8');
history = history.replace(/import \{ ImpactChart \} from "\.\.\/components\/ImpactChart";\n?/g, '');
history = history.replace(/<div className="w-full mb-12">\s*<ImpactChart \/>\s*<\/div>/g, '');
fs.writeFileSync('src/pages/History.tsx', history);

// 3. Delete file
if (fs.existsSync('src/components/ImpactChart.tsx')) {
  fs.unlinkSync('src/components/ImpactChart.tsx');
}
