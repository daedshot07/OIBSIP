import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // We apply this class to the wrapper
    const wrappers = document.querySelectorAll('.dashboard-theme');
    wrappers.forEach(wrapper => {
      if (isLight) {
        wrapper.classList.add('dashboard-light-override');
      } else {
        wrapper.classList.remove('dashboard-light-override');
      }
    });
  }, [isLight]);

  return (
    <button 
      onClick={() => setIsLight(!isLight)}
      className="fixed bottom-6 right-6 z-[9999] p-3 rounded-full bg-[var(--theme-highlight)] text-[var(--theme-bg)] shadow-[0_4px_15px_rgba(229,138,69,0.4)] hover:scale-110 transition-transform font-bold"
      aria-label="Toggle Theme"
    >
      {isLight ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
