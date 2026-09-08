const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Add import for fs
if (!code.includes("import fs from 'fs';")) {
  code = code.replace("import path from 'path';", "import path from 'path';\nimport fs from 'fs';");
}

code = code.replace(/require\('fs'\)/g, "fs");

fs.writeFileSync('server.ts', code);
