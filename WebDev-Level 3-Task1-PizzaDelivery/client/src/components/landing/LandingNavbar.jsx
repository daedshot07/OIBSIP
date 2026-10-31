import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/logo.jpg';
import { ArrowUpRight, Menu, Pizza, Shield, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Menu', href: '#menu', id: 'menu' },
  { label: 'Build Your Pizza', href: '#build', id: 'build' },
];

export default function LandingNavbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`landing-nav ${isScrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="landing-nav__inner">
        <Link className="brand-mark" to="/" aria-label="PizzaDev — home" onClick={closeMenu}>
          <img src={mainLogo} alt="PizzaDev Logo" className="h-10 w-auto rounded object-contain max-h-[40px] " />
        </Link>

        <nav id="landing-navigation" className={`landing-nav__links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              className={`landing-nav__link ${activeSection === item.id ? 'is-active' : ''}`}
              href={item.href}
              aria-current={activeSection === item.id ? 'location' : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <div className="landing-nav__mobile-account">
            <Link to="/admin/login" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={14} /> Admin Portal</Link>
            <Link to="/login" onClick={closeMenu}>Login <ArrowUpRight size={14} aria-hidden="true" /></Link>
            <Link to="/register" onClick={closeMenu}>Sign Up <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </div>
        </nav>

        <div className="landing-nav__account">
          <Link to="/admin/login" className="landing-nav__admin-icon" title="Admin Portal" aria-label="Admin Portal"><Shield size={16} strokeWidth={1.8} /></Link>
          <Link className="landing-nav__login" to="/login">Login</Link>
          <Link className="landing-nav__signup" to="/register">Sign Up <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>

        <button
          type="button"
          className="landing-nav__toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="landing-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
