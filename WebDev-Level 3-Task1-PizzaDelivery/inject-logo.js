const fs = require('fs');

const replaceInFile = (file, regex, replacement) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
  }
};

// 1. LandingNavbar.jsx
const navFile = 'client/src/components/landing/LandingNavbar.jsx';
let navContent = fs.readFileSync(navFile, 'utf8');
if (!navContent.includes('logo.jpg')) {
  navContent = navContent.replace('import { Link } from \'react-router-dom\';', 'import { Link } from \'react-router-dom\';\nimport mainLogo from \'../../assets/logo.jpg\';');
  navContent = navContent.replace(
    /<span className="brand-mark__icon" aria-hidden="true"><Pizza size=\{21\} strokeWidth=\{1\.65\} \/><\/span>\s*<span className="brand-mark__word">PIZZA<span>DEV<\/span><\/span>/,
    '<img src={mainLogo} alt="PizzaDev Logo" className="h-10 w-auto rounded object-contain max-h-[40px] mix-blend-screen" />'
  );
  fs.writeFileSync(navFile, navContent);
}

// 2. LandingFooter.jsx
const footerFile = 'client/src/components/landing/LandingFooter.jsx';
let footerContent = fs.readFileSync(footerFile, 'utf8');
if (!footerContent.includes('logo.jpg')) {
  footerContent = footerContent.replace('import { Link } from \'react-router-dom\';', 'import { Link } from \'react-router-dom\';\nimport mainLogo from \'../../assets/logo.jpg\';');
  footerContent = footerContent.replace(
    /<span className="brand-mark__icon" aria-hidden="true"><Pizza size=\{20\} strokeWidth=\{1\.65\}\s*\/><\/span><span className="brand-mark__word">PIZZA<span>DEV<\/span><\/span>/,
    '<img src={mainLogo} alt="PizzaDev Logo" className="h-12 w-auto rounded object-contain max-h-[48px] mix-blend-screen" />'
  );
  fs.writeFileSync(footerFile, footerContent);
}

// 3. Dashboard.jsx
const dashFile = 'client/src/pages/user/Dashboard.jsx';
let dashContent = fs.readFileSync(dashFile, 'utf8');
if (!dashContent.includes('logo.jpg')) {
  dashContent = dashContent.replace('import \'../../styles/dashboard.css\';', 'import \'../../styles/dashboard.css\';\nimport mainLogo from \'../../assets/logo.jpg\';');
  dashContent = dashContent.replace(
    /<Link className="dash-brand" to="\/">PIZZA<span>DEV<\/span><\/Link>/,
    '<Link className="dash-brand flex items-center" to="/"><img src={mainLogo} alt="PizzaDev Logo" className="h-10 w-auto rounded object-contain max-h-[40px] mix-blend-screen" /></Link>'
  );
  fs.writeFileSync(dashFile, dashContent);
}

// 4. AdminSidebar.jsx
const sidebarFile = 'client/src/components/AdminSidebar.jsx';
let sidebarContent = fs.readFileSync(sidebarFile, 'utf8');
if (!sidebarContent.includes('logo.jpg')) {
  sidebarContent = sidebarContent.replace('import { NavLink } from \'react-router-dom\';', 'import { NavLink } from \'react-router-dom\';\nimport mainLogo from \'../assets/logo.jpg\';');
  sidebarContent = sidebarContent.replace(
    /<div className="ops-brand">PIZZA<span>DEV<\/span> \/ OPS<\/div>/,
    '<div className="ops-brand flex items-center gap-2"><img src={mainLogo} alt="PizzaDev Logo" className="h-8 w-auto rounded object-contain max-h-[32px] mix-blend-screen" /></div>'
  );
  fs.writeFileSync(sidebarFile, sidebarContent);
}

// 5. RegisterPlaceholder.jsx
const placeholderFile = 'client/src/pages/auth/RegisterPlaceholder.jsx';
let phContent = fs.readFileSync(placeholderFile, 'utf8');
if (!phContent.includes('logo.jpg')) {
  phContent = phContent.replace('import { Link } from \'react-router-dom\';', 'import { Link } from \'react-router-dom\';\nimport mainLogo from \'../../assets/logo.jpg\';');
  phContent = phContent.replace(
    /<span className="brand-mark__icon" aria-hidden="true"><Pizza size=\{24\} strokeWidth=\{1\.6\} \/><\/span>\s*<span className="brand-mark__word">PIZZA<span>DEV<\/span><\/span>/,
    '<img src={mainLogo} alt="PizzaDev Logo" className="h-16 w-auto rounded object-contain max-h-[64px] mix-blend-screen" />'
  );
  fs.writeFileSync(placeholderFile, phContent);
}
