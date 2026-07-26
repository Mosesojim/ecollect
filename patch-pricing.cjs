const fs = require('fs');
let code = fs.readFileSync('src/pages/Pricing.tsx', 'utf8');

const plansRegex = /const PLANS = \[[\s\S]*?\];/;
code = code.replace(plansRegex, '');

if (!code.includes('import { getPlans }')) {
  code = code.replace(
    'import { motion } from "motion/react";',
    'import { motion } from "motion/react";\nimport { getPlans } from "../lib/pricing";'
  );
}

code = code.replace(/\{PLANS\.map/g, '{getPlans().map');

fs.writeFileSync('src/pages/Pricing.tsx', code);
