import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import pizzaHero from '../../assets/pizza-hero-new.jpg';

export default function LandingHero() {
  const visualRef = useRef(null);
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const updateCue = () => setShowScrollCue(window.scrollY < 100);
    updateCue();
    window.addEventListener('scroll', updateCue, { passive: true });
    return () => window.removeEventListener('scroll', updateCue);
  }, []);

  const movePizza = (event) => {
    if (!visualRef.current || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
    visualRef.current.style.setProperty('--parallax-x', `${x.toFixed(1)}px`);
    visualRef.current.style.setProperty('--parallax-y', `${y.toFixed(1)}px`);
  };

  const resetPizza = () => {
    if (!visualRef.current) return;
    visualRef.current.style.setProperty('--parallax-x', '0px');
    visualRef.current.style.setProperty('--parallax-y', '0px');
  };

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title" onPointerMove={movePizza} onPointerLeave={resetPizza}>
      <div className="hero-section__ambient" aria-hidden="true" />
      <div className="hero-section__grain" aria-hidden="true" />
      <div className="hero-section__layout page-shell">
        <div className="hero-copy">
          <p className="eyebrow hero-copy__eyebrow"><span className="eyebrow__line" />Crafted for your cravings</p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title__line">Craft your</span>
            <span className="hero-title__line hero-title__line--accent">perfect pizza.</span>
          </h1>
          <p className="hero-copy__body">Choose your base. Pick your sauce.<br className="desktop-break" /> Add your cheese. Finish it your way.</p>
          <div className="hero-actions">
            <Link className="button button--primary" to="/register">Build your pizza <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <a className="button button--quiet" href="#menu">Explore menu <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-note"><Sparkles size={15} strokeWidth={1.6} aria-hidden="true" /><span>Made with time. Finished by you.</span></div>
        </div>

        <div className="hero-art" aria-label="Freshly baked artisan pizza">
          <img
            ref={visualRef}
            className="hero-art__pizza"
            src={pizzaHero}
            alt="A freshly baked Neapolitan pizza with blistered crust, tomato, mozzarella and basil"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>

      <a className={`scroll-cue ${showScrollCue ? 'is-visible' : ''}`} href="#menu" aria-hidden={!showScrollCue} tabIndex={showScrollCue ? 0 : -1}>
        <span>Scroll to explore</span><ArrowDown size={14} aria-hidden="true" />
      </a>
      <span className="hero-index" aria-hidden="true">01 — 05</span>
    </section>
  );
}
