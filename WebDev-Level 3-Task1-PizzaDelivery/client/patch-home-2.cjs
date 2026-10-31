const fs = require('fs');
const file = 'src/pages/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

// We need to replace the old useGSAP block with the new one.
// Let's just use string replacement carefully.

const newGSAP = `  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const sections = gsap.utils.toArray(mainRef.current.querySelectorAll('section'));
    
    sections.forEach((section, i) => {
      gsap.set(section, { zIndex: i + 1, position: 'relative' });
      
      if (i === sections.length - 1) return;
      
      const isTall = section.offsetHeight > window.innerHeight;
      
      ScrollTrigger.create({
        trigger: section,
        start: () => isTall ? "bottom bottom" : "top top",
        end: () => \`+=\${isTall ? window.innerHeight : section.offsetHeight}\`,
        pin: true,
        pinSpacing: false,
        id: \`pin-\${i}\`,
        invalidateOnRefresh: true,
        animation: gsap.fromTo(section, 
          { scale: 1, opacity: 1 },
          {
            scale: 0.96,
            opacity: 0,
            ease: "none",
            transformOrigin: isTall ? "50% 100%" : "50% 0%"
          }
        ),
        scrub: true
      });
    });
  }, { scope: mainRef });`;

// Find the existing useGSAP block and replace it
const startIdx = code.indexOf('  useGSAP(() => {');
const endIdx = code.indexOf('  }, { scope: mainRef });') + '  }, { scope: mainRef });'.length;

if (startIdx !== -1 && endIdx !== -1) {
  code = code.slice(0, startIdx) + newGSAP + code.slice(endIdx);
  fs.writeFileSync(file, code);
  console.log('Patched Home.jsx with flawless logic');
} else {
  console.log('Could not find useGSAP block');
}
