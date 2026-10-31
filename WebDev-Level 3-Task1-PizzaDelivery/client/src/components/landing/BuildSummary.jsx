import { ArrowUpRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Reveal from './Reveal';
import pizzaHero from '../../assets/pizza-summary.jpg';

export default function BuildSummary({ base, sauce, cheese, toppings, samplePrice, formatPrice }) {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const pendingPizza = {
      base,
      sauce,
      cheese,
      veggies: toppings,
      price: samplePrice,
      quantity: 1,
      name: 'Custom Pizza'
    };
    localStorage.setItem('pendingPizza', JSON.stringify(pendingPizza));
    navigate('/login');
  };
  const summary = [
    { label: 'Base', value: base.name },
    { label: 'Sauce', value: sauce.name },
    { label: 'Cheese', value: cheese.name },
    { label: 'Toppings', value: toppings.length ? toppings.map((item) => item.name).join(', ') : 'Your choice' },
  ];

  return (
    <section id="build" className="build-section landing-section" aria-labelledby="build-title">
      <div className="page-shell build-section__layout">
        <div className="build-section__visual">
          <Reveal className="build-pizza-card">
            <div className="build-pizza-card__halo" aria-hidden="true" />
            <img
              className="build-pizza-card__pizza"
              src={pizzaHero}
              alt="A whole artisan pizza ready for its finishing touches"
              loading="lazy"
              decoding="async"
            />
            <span className="build-pizza-card__caption">Your choices, coming together</span>
            <span className="build-pizza-card__number" aria-hidden="true">05</span>
          </Reveal>
        </div>
        <div className="build-section__content">
          <Reveal className="eyebrow"><span className="eyebrow__line" />05 / All yours</Reveal>
          <Reveal as="h2" id="build-title" className="section-title" delay={70}>
            <span className="heading-line">Your pizza.</span>
            <span className="heading-line heading-line--accent">Your way.</span>
          </Reveal>
          <Reveal as="p" className="section-copy" delay={130}>
            Every choice, exactly where it belongs. This is the beginning of something good.
          </Reveal>
          <Reveal className="build-summary" delay={180}>
            <div className="build-summary__header">
              <span>Your composition</span>
              <span className="build-summary__live"><i /> Live preview</span>
            </div>
            <dl className="build-summary__list">
              {summary.map((item) => (
                <div className="build-summary__row" key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="build-summary__price-row">
              <div><span>Sample price</span><small>Preview only</small></div>
              <strong aria-live="polite">{formatPrice(samplePrice)}</strong>
            </div>
          </Reveal>
          <Reveal className="build-section__actions" delay={230}>
            <button className="button button--primary" onClick={handlePlaceOrder}>Place Order <ArrowUpRight size={17} aria-hidden="true" /></button>
            <p><Check size={14} aria-hidden="true" />No commitment. Just good choices.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
