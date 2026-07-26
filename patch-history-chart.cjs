const fs = require('fs');
let code = fs.readFileSync('src/pages/History.tsx', 'utf8');

if (!code.includes('ImpactChart')) {
  code = code.replace(
    'import { supabase } from "../lib/supabase";',
    'import { supabase } from "../lib/supabase";\nimport { ImpactChart } from "../components/ImpactChart";'
  );
  
  const searchInputBlock = `<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">`;
  
  code = code.replace(
    searchInputBlock,
    `<div className="w-full mb-12">\n          <ImpactChart />\n        </div>\n\n        ${searchInputBlock}`
  );
  
  fs.writeFileSync('src/pages/History.tsx', code);
}
