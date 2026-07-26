const fs = require('fs');
let code = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

if (!code.includes('ImpactChart')) {
  code = code.replace(
    'import { StatsOverview } from "../components/StatsOverview";',
    'import { StatsOverview } from "../components/StatsOverview";\nimport { ImpactChart } from "../components/ImpactChart";'
  );
  
  code = code.replace(
    '<StatsOverview />\n          </div>\n        </div>',
    '<StatsOverview />\n            <div className="mt-8">\n              <ImpactChart compact={true} />\n            </div>\n          </div>\n        </div>'
  );
  
  fs.writeFileSync('src/pages/Dashboard.tsx', code);
}
