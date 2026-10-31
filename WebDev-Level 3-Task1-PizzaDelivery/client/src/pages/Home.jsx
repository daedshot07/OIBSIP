import { useEffect, useMemo, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import LandingNavbar from "../components/landing/LandingNavbar";
import LandingHero from "../components/landing/LandingHero";
import StorySection from "../components/landing/StorySection";
import IngredientSections from "../components/landing/IngredientSections";
import BuildSummary from "../components/landing/BuildSummary";
import HowItWorks from "../components/landing/HowItWorks";
import LandingFooter from "../components/landing/LandingFooter";
import {
  BASES,
  CHEESES,
  SAUCES,
  STARTING_PRICE,
} from "../components/landing/landingData";
import "../styles/landing.css";

gsap.registerPlugin(ScrollTrigger);

const TRACKED_SECTIONS = [
  "home",
  "menu",
  "bases",
  "sauce",
  "cheese",
  "vegetables",
  "build",
];
const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function Home() {
  const mainRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const sections = gsap.utils.toArray(
        mainRef.current.querySelectorAll("section"),
      );

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1, position: "relative" });

        if (i === sections.length - 1) return;

        const isTall = section.offsetHeight > window.innerHeight;

        ScrollTrigger.create({
          trigger: section,
          start: () => (isTall ? "bottom bottom" : "top top"),
          end: () => `+=${isTall ? window.innerHeight : section.offsetHeight}`,
          pin: true,
          pinSpacing: false,
          id: `pin-${i}`,
          invalidateOnRefresh: true,
          animation: gsap.fromTo(
            section,
            { scale: 1, opacity: 1 },
            {
              scale: 0.96,
              opacity: 0,
              ease: "none",
              transformOrigin: isTall ? "50% 100%" : "50% 0%",
            },
          ),
          scrub: true,
        });
      });
    },
    { scope: mainRef },
  );

  const [activeSection, setActiveSection] = useState("home");
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedSauce, setSelectedSauce] = useState(SAUCES[0]);
  const [selectedCheese, setSelectedCheese] = useState(CHEESES[0]);
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
    const sections = TRACKED_SECTIONS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window))
      return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.4, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleTopping = (topping) => {
    setSelectedToppings((current) =>
      current.some((item) => item.id === topping.id)
        ? current.filter((item) => item.id !== topping.id)
        : [...current, topping],
    );
  };

  const samplePrice = useMemo(
    () =>
      STARTING_PRICE +
      selectedBase.extra +
      selectedSauce.extra +
      selectedCheese.extra +
      selectedToppings.reduce((sum, item) => sum + item.extra, 0),
    [selectedBase, selectedSauce, selectedCheese, selectedToppings],
  );

  return (
    <div className="landing-page">
      <LandingNavbar activeSection={activeSection} />
      <main ref={mainRef}>
        <LandingHero />
        <StorySection />
        <IngredientSections
          selectedBase={selectedBase}
          setSelectedBase={setSelectedBase}
          selectedSauce={selectedSauce}
          setSelectedSauce={setSelectedSauce}
          selectedCheese={selectedCheese}
          setSelectedCheese={setSelectedCheese}
          selectedToppings={selectedToppings}
          toggleTopping={toggleTopping}
        />
        <BuildSummary
          base={selectedBase}
          sauce={selectedSauce}
          cheese={selectedCheese}
          toppings={selectedToppings}
          samplePrice={samplePrice}
          formatPrice={(price) => priceFormatter.format(price)}
        />
        <HowItWorks />
      </main>
      <LandingFooter />
    </div>
  );
}
