const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  "require('fs')",
  "import_fs" // wait I can't just use require, I need to import fs
);

fs.writeFileSync('server.ts', code);
