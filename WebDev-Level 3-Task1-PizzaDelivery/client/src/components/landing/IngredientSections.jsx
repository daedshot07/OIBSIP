import { Check, Plus } from 'lucide-react';
import Reveal from './Reveal';
import { BASES, CHEESES, SAUCES, TOPPINGS } from './landingData';

import onionImg from '../../assets/onion.png';
import capsicumImg from '../../assets/capsicum.png';
import tomatoImg from '../../assets/tomato.jpg';
import cornImg from '../../assets/corn.jpg';
import oliveImg from '../../assets/olive.png';
import grilledChickenImg from '../../assets/grilled-chicken.jpg';
import chickenTikkaImg from '../../assets/chicken-tikka.jpg';
import baconImg from '../../assets/bacon.png';
import jalapenoImg from '../../assets/jalapeno.jpg';
import pepperoniImg from '../../assets/pepperoni.jpg';
import spinachImg from '../../assets/spinach.jpg';
import mushroomImg from '../../assets/mushroom.jpg';



const toppingImages = {
  onion: onionImg,
  capsicum: capsicumImg,
  tomato: tomatoImg,
  corn: cornImg,
  olive: oliveImg,

  'grilled-chicken': grilledChickenImg,
  'chicken-tikka': chickenTikkaImg,
  bacon: baconImg,
  jalapeno: jalapenoImg,
  pepperoni: pepperoniImg,

  spinach: spinachImg,
  mushroom: mushroomImg,


};

import pizzaCloseup from '../../assets/pizza-loaded.jpg';

function OptionCard({ option, selected, onSelect, kind, index = 0 }) {
  return (
    <Reveal as="div" className="option-reveal" delay={index * 65}>
      <button
        className={`option-card option-card--${kind} ${selected ? 'is-selected' : ''}`}
        type="button"
        aria-pressed={selected}
        onClick={() => onSelect(option)}
      >
        <span className={`option-visual option-visual--${kind} option-visual--${option.visual}`} aria-hidden="true">
          {kind === 'base' && <span className="option-visual__crust" />}
          {kind === 'sauce' && <span className="option-visual__swirl" />}
        </span>
        <span className="option-card__body">
          <span className="option-card__name">{option.name}</span>
          <span className="option-card__description">{option.description}</span>
          <span className="option-card__price">{option.extra ? `+₹${option.extra}` : 'Included'}</span>
        </span>
        <span className="option-card__indicator" aria-hidden="true">{selected ? <Check size={15} /> : <Plus size={15} />}</span>
      </button>
    </Reveal>
  );
}

export default function IngredientSections({
  selectedBase,
  setSelectedBase,
  selectedSauce,
  setSelectedSauce,
  selectedCheese,
  setSelectedCheese,
  selectedToppings,
  toggleTopping,
}) {
  return (
    <>
      <section id="bases" className="bases-section landing-section" aria-labelledby="bases-title">
        <div className="page-shell">
          <div className="section-heading section-heading--split">
            <div>
              <Reveal className="eyebrow"><span className="eyebrow__line" />01 / The foundation</Reveal>
              <Reveal as="h2" id="bases-title" className="section-title" delay={70}>
                <span className="heading-line">Start with</span>
                <span className="heading-line heading-line--soft">the base.</span>
              </Reveal>
            </div>
            <Reveal as="p" className="section-copy section-heading__note" delay={130}>
              Every good pizza begins somewhere. Find the texture that feels like yours.
            </Reveal>
          </div>
          <div className="option-grid option-grid--bases">
            {BASES.map((option, index) => (
              <OptionCard
                key={option.id}
                option={option}
                kind="base"
                selected={selectedBase.id === option.id}
                onSelect={setSelectedBase}
                index={index}
              />
            ))}
          </div>
          <p className="selection-note"><span className="selection-note__dot" />Choose one foundation</p>
        </div>
      </section>

      <section id="sauce" className="sauce-section landing-section" aria-labelledby="sauce-title">
        <div className="page-shell">
          <div className="section-heading section-heading--center">
            <Reveal className="eyebrow"><span className="eyebrow__line" />02 / Set the mood</Reveal>
            <Reveal as="h2" id="sauce-title" className="section-title" delay={70}>
              <span className="heading-line">Then, add</span>
              <span className="heading-line heading-line--soft">the sauce.</span>
            </Reveal>
          </div>
          <div className="option-grid option-grid--sauces">
            {SAUCES.map((option, index) => (
              <OptionCard
                key={option.id}
                option={option}
                kind="sauce"
                selected={selectedSauce.id === option.id}
                onSelect={setSelectedSauce}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="cheese" className="cheese-section landing-section" aria-labelledby="cheese-title">
        <div className="page-shell cheese-section__layout">
          <Reveal className="cheese-photo">
            <img
              src={pizzaCloseup}
              alt="A warm close-up of melted mozzarella on a freshly baked pizza"
              loading="lazy"
              decoding="async"
            />
            <span className="cheese-photo__label">A little more, if you like</span>
            <span className="cheese-photo__index" aria-hidden="true">03 / THE GOOD STUFF</span>
          </Reveal>
          <div className="cheese-section__content">
            <Reveal className="eyebrow"><span className="eyebrow__line" />03 / Make it yours</Reveal>
            <Reveal as="h2" id="cheese-title" className="section-title" delay={70}>
              <span className="heading-line">Make it</span>
              <span className="heading-line heading-line--soft">cheesy.</span>
            </Reveal>
            <Reveal as="p" className="section-copy" delay={130}>
              Soft, sharp or something in between. Pick the finish that brings it all together.
            </Reveal>
            <div className="cheese-options">
              {CHEESES.map((option, index) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  kind="cheese"
                  selected={selectedCheese.id === option.id}
                  onSelect={setSelectedCheese}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="vegetables" className="vegetables-section landing-section" aria-labelledby="vegetables-title">
        <div className="page-shell vegetables-section__layout">
          <div className="vegetables-section__copy">
            <Reveal className="eyebrow"><span className="eyebrow__line" />04 / The finishing touch</Reveal>
            <Reveal as="h2" id="vegetables-title" className="section-title" delay={70}>
              <span className="heading-line">Finish it</span>
              <span className="heading-line heading-line--soft">your way.</span>
            </Reveal>
            <Reveal as="p" className="section-copy" delay={130}>
              A little of this, a little of that. Add as many fresh favourites as you like.
            </Reveal>
            <p className="topping-count" aria-live="polite">
              <span className="selection-note__dot" />{selectedToppings.length} {selectedToppings.length === 1 ? 'topping' : 'toppings'} selected
            </p>
          </div>
          <div className="topping-grid" role="group" aria-label="Choose your vegetable toppings">
            {TOPPINGS.map((topping, index) => {
              const selected = selectedToppings.some((item) => item.id === topping.id);
              return (
                <Reveal as="div" className="topping-reveal" delay={index * 45} key={topping.id}>
                  <button
                    className={`topping-chip ${selected ? 'is-selected' : ''}`}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleTopping(topping)}
                  >
                    <span className={`topping-chip__image topping-chip__image--${topping.color}`} aria-hidden="true" style={toppingImages[topping.id] ? { backgroundImage: `url(${toppingImages[topping.id]})` } : {}}></span>
                    <div className="topping-chip__bottom">
                      <span className={`topping-chip__swatch topping-chip__swatch--${topping.color}`} aria-hidden="true">
                        {selected ? <Check size={13} strokeWidth={2.5} /> : <Plus size={13} />}
                      </span>
                      <span className="topping-chip__name">{topping.name}</span>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
