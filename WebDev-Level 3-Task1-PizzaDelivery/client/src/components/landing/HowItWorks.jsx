import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const STEPS = [
  { number: '01', name: 'Choose', detail: 'Choose your favourite ingredients.' },
  { number: '02', name: 'Customize', detail: 'Build your pizza your way.' },
  { number: '03', name: 'Pay', detail: 'Securely pay online.' },
  { number: '04', name: 'Track', detail: 'Follow your order until delivery.' },
];

export default function HowItWorks() {
  return (
    <>
      <section id="how-it-works" className="steps-section landing-section" aria-labelledby="steps-title">
        <div className="page-shell">
          <div className="steps-section__heading">
            <Reveal className="eyebrow"><span className="eyebrow__line" />From first choice to first bite</Reveal>
            <Reveal as="h2" id="steps-title" className="section-title steps-section__title" delay={80}>
              <span className="heading-line">A few good</span>
              <span className="heading-line heading-line--soft">steps away.</span>
            </Reveal>
          </div>
          <div className="steps-grid">
            {STEPS.map((step, index) => (
              <Reveal as="article" className="step-card" delay={index * 100} key={step.number}>
                <span className="step-card__number">{step.number}</span>
                <h3>{step.name}</h3>
                <p>{step.detail}</p>
                <span className="step-card__rule" aria-hidden="true" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="start-building" className="final-cta landing-section" aria-labelledby="final-cta-title">
        <div className="final-cta__glow" aria-hidden="true" />
        <div className="page-shell final-cta__inner">
          <Reveal className="eyebrow"><span className="eyebrow__line" />The good part starts here</Reveal>
          <Reveal as="h2" id="final-cta-title" className="section-title final-cta__title" delay={80}>
            <span className="heading-line">Ready to build</span>
            <span className="heading-line heading-line--accent">your pizza?</span>
          </Reveal>
          <Reveal as="p" className="final-cta__copy" delay={150}>
            Your ingredients.<br />Your combinations.<br />Your pizza.
          </Reveal>
          <Reveal className="final-cta__actions" delay={210}>
            <Link className="button button--primary" to="/register">Start building <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link className="button button--outline" to="/register">Create account</Link>
          </Reveal>
        </div>
        <span className="final-cta__index" aria-hidden="true">PIZZADEV · EST. WITH CARE</span>
      </section>
    </>
  );
}
