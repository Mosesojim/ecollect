const fs = require('fs');

let topNav = fs.readFileSync('src/components/TopNav.tsx', 'utf8');
topNav = topNav.replace(
  'return (\n    <>',
  'return (\n    <header className="sticky top-0 z-50 w-full flex flex-col">'
);
topNav = topNav.replace(
  '      {isOpen && (\n        <div className="fixed inset-0 z-[60] flex lg:hidden">',
  '    </header>\n      {isOpen && (\n        <div className="fixed inset-0 z-[60] flex lg:hidden">'
);
// Make sure we didn't miss replacing the closing fragment
const lastFragmentRegex = /<\/>\s*$/;
topNav = topNav.replace(lastFragmentRegex, '');

fs.writeFileSync('src/components/TopNav.tsx', topNav);

let appTsx = fs.readFileSync('src/App.tsx', 'utf8');
appTsx = appTsx.replace('overflow-hidden', 'overflow-x-clip');
fs.writeFileSync('src/App.tsx', appTsx);
