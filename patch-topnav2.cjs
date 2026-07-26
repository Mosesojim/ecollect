const fs = require('fs');

let topNav = fs.readFileSync('src/components/TopNav.tsx', 'utf8');

// The file currently has `<header className="sticky top-0 z-50 w-full flex flex-col">` at the start, and `</header>` before `{isOpen &&`.
topNav = topNav.replace(
  '<header className="sticky top-0 z-50 w-full flex flex-col">',
  '<>\n    <header className="sticky top-0 z-50 w-full flex flex-col">'
);

fs.writeFileSync('src/components/TopNav.tsx', topNav);
