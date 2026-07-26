const fs = require('fs');
let code = fs.readFileSync('src/components/ImpactChart.tsx', 'utf8');

if (!code.includes('compact?: boolean')) {
  code = code.replace(
    'export function ImpactChart() {',
    'export function ImpactChart({ compact = false }: { compact?: boolean }) {'
  );
  
  code = code.replace(
    'className="bg-slate-50 border border-slate-200 p-8 lg:p-10 rounded shadow-lg h-full flex flex-col min-h-[350px] overflow-hidden"',
    'className={`bg-slate-50 border border-slate-200 rounded shadow-lg flex flex-col overflow-hidden ${compact ? "p-4 lg:p-6 min-h-[250px]" : "p-8 lg:p-10 min-h-[350px] h-full"}`}'
  );
  
  fs.writeFileSync('src/components/ImpactChart.tsx', code);
}
