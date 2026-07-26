const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPickups.tsx', 'utf8');

if (!code.includes('AdminStats')) {
  code = code.replace(
    'import { getPlans, savePlans } from "../lib/pricing";',
    'import { getPlans, savePlans } from "../lib/pricing";\nimport { AdminStats } from "../components/AdminStats";'
  );
  
  code = code.replace(
    'const [activeTab, setActiveTab] = useState<"pickups" | "pricing">("pickups");',
    'const [activeTab, setActiveTab] = useState<"dashboard" | "pickups" | "pricing">("dashboard");'
  );
  
  code = code.replace(
    '<div className="flex gap-4 mb-8">',
    `<div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={\`py-2 px-6 rounded font-bold transition-colors \${activeTab === "dashboard" ? "bg-[#8CC63F] text-[#18201A]" : "bg-brand-secondary text-brand-text hover:bg-white/5"}\`}
          >
            Dashboard
          </button>`
  );
  
  code = code.replace(
    '{activeTab === "pricing" ? (',
    `{activeTab === "dashboard" ? (
        <AdminStats data={data} />
      ) : activeTab === "pricing" ? (`
  );
  
  fs.writeFileSync('src/pages/AdminPickups.tsx', code);
}
