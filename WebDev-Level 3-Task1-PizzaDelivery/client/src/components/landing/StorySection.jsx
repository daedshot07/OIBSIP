import { useEffect, useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import Reveal from './Reveal';
import pizzaCloseup from '../../assets/pizza-loaded.jpg';

export default function StorySection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const updateImage = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const section = sectionRef.current;
        const image = imageRef.current;
        if (!section || !image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const bounds = section.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
        const progress = (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height);
        const offset = Math.max(-12, Math.min(12, (progress - 0.5) * 24));
        image.style.setProperty('--story-shift', `${offset.toFixed(1)}px`);
      });
    };

    window.addEventListener('scroll', updateImage, { passive: true });
    updateImage();
    return () => {
      window.removeEventListener('scroll', updateImage);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="menu" className="story-section landing-section" ref={sectionRef} aria-labelledby="story-title">
      <div className="story-section__layout page-shell">
        <div className="story-section__copy">
          <Reveal className="eyebrow"><span className="eyebrow__line" />A little patience. A lot of care.</Reveal>
          <Reveal as="h2" id="story-title" className="section-title story-title" delay={100}>
            <span className="heading-line">Good pizza starts</span>
            <span className="heading-line heading-line--soft">with good choices.</span>
          </Reveal>
          <Reveal as="p" className="section-copy story-section__description" delay={170}>
            The best part is yours. Start with a dough that feels right, add a sauce that sets the mood, and finish with the things you love.
          </Reveal>
          <Reveal className="story-section__signature" delay={230}>
            <span className="story-section__signature-mark" aria-hidden="true">P.</span>
            <span>Crafted for your cravings</span>
            <ArrowDownRight size={18} aria-hidden="true" />
          </Reveal>
        </div>

        <Reveal className="story-photo" delay={110}>
          <div className="story-photo__frame">
            <img
              ref={imageRef}
              className="story-photo__image"
              src={pizzaCloseup}
              alt="Close-up of a freshly baked pizza with bubbling mozzarella, tomato and basil"
              loading="lazy"
              decoding="async"
            />
            <span className="story-photo__tag">A good thing, made slowly</span>
          </div>
          <span className="story-photo__index" aria-hidden="true">01 / THE MAKING</span>
        </Reveal>
      </div>
      <span className="section-watermark" aria-hidden="true">BUONA</span>
    </section>
  );
}
