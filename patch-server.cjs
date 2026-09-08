const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  "app.get('*', (req, res) => {",
  "app.use((req, res, next) => {"
);

fs.writeFileSync('server.ts', code);
