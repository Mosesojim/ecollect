const fs = require('fs');
let code = fs.readFileSync('src/pages/Appointment.tsx', 'utf8');

if (!code.includes('const formRef =')) {
  code = code.replace(
    'import { useState } from "react";',
    'import { useState, useRef } from "react";'
  );
  
  code = code.replace(
    '  const [PLANS, setPLANS] = useState(getPlans());',
    '  const [PLANS, setPLANS] = useState(getPlans());\n  const formRef = useRef<HTMLDivElement>(null);'
  );
  
  code = code.replace(
    'onClick={() => setSelectedService(plan.name)}',
    `onClick={() => {\n                  setSelectedService(plan.name);\n                  if (formRef.current) {\n                    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });\n                  }\n                }}`
  );
  
  code = code.replace(
    '<motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-5 h-full">',
    '<motion.div ref={formRef} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-5 h-full">'
  );
  
  fs.writeFileSync('src/pages/Appointment.tsx', code);
}
