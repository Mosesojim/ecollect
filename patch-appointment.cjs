const fs = require('fs');
let code = fs.readFileSync('src/pages/Appointment.tsx', 'utf8');

const regex = /const defaultPlans = \[[\s\S]*?\]; \/\/ legacy fallback/;
code = code.replace(regex, '');

fs.writeFileSync('src/pages/Appointment.tsx', code);
