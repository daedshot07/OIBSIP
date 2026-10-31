const fs = require('fs');
const file = 'src/pages/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "import { useEffect, useMemo, useState } from 'react';",
  "import { useEffect, useMemo, useState, useRef } from 'react';\nimport gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\nimport { useGSAP } from '@gsap/react';\n\ngsap.registerPlugin(ScrollTrigger);"
);

code = code.replace(
  "export default function Home() {",
  "export default function Home() {\n  const mainRef = useRef(null);\n\n  useGSAP(() => {\n    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;\n    \n    const sections = gsap.utils.toArray(mainRef.current.querySelectorAll('section'));\n    \n    sections.forEach((section, i) => {\n      gsap.set(section, { zIndex: i + 1, position: 'relative' });\n      \n      if (i === sections.length - 1) return;\n      \n      const nextSection = sections[i + 1];\n      \n      ScrollTrigger.create({\n        trigger: section,\n        start: () => section.offsetHeight <= window.innerHeight ? \"top top\" : \"bottom bottom\",\n        end: () => `+=${window.innerHeight}`,\n        pin: true,\n        pinSpacing: false,\n        id: `pin-${i}`,\n        invalidateOnRefresh: true\n      });\n      \n      gsap.fromTo(section, \n        { scale: 1, opacity: 1 },\n        {\n          scale: 0.96,\n          opacity: 0,\n          ease: \"none\",\n          transformOrigin: section.offsetHeight <= window.innerHeight ? \"50% 0%\" : \"50% 100%\",\n          scrollTrigger: {\n            trigger: nextSection,\n            start: \"top bottom\", \n            end: \"top top\", \n            scrub: true,\n            invalidateOnRefresh: true\n          }\n        }\n      );\n    });\n  }, { scope: mainRef });\n"
);

code = code.replace(
  "<main>",
  "<main ref={mainRef}>"
);

fs.writeFileSync(file, code);
console.log('Patched Home.jsx');
