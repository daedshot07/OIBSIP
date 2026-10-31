import { ArrowLeft, Pizza } from "lucide-react";
import { Link } from "react-router-dom";
import mainLogo from "../../assets/logo.jpg";

export default function RegisterPlaceholder() {
  return (
    <main className="register-placeholder">
      <div className="register-placeholder__glow" aria-hidden="true" />
      <div className="register-placeholder__content">
        <Link
          className="brand-mark register-placeholder__brand"
          to="/"
          aria-label="PizzaDev — return home"
        >
          <span className="brand-mark__icon" aria-hidden="true">
            <Pizza size={21} strokeWidth={1.65} />
          </span>
          <span className="brand-mark__word">
            PIZZA<span>DEV</span>
          </span>
        </Link>
        <span className="eyebrow register-placeholder__eyebrow">
          <span className="eyebrow__line" />A little more patience
        </span>
        <h1>
          Your table
          <br />
          <em>is being set.</em>
        </h1>
        <p>
          Account creation is coming in the next chapter. For now, keep dreaming
          up your perfect pizza.
        </p>
        <Link className="button button--primary" to="/">
          <ArrowLeft size={16} aria-hidden="true" /> Back to the experience
        </Link>
      </div>
      <span className="register-placeholder__index" aria-hidden="true">
        PIZZADEV · 2026
      </span>
    </main>
  );
}
