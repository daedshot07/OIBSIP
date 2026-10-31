import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/logo.jpg';

export default function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="page-shell landing-footer__top">
        <Link className="brand-mark landing-footer__brand" to="/" aria-label="PizzaDev — home">
          <img
            src={mainLogo}
            alt="PizzaDev Logo"
            className="h-12 w-auto rounded object-contain max-h-[48px]"
          />
        </Link>
        <p>Thoughtful ingredients. A pizza that feels like yours.</p>
        <nav className="landing-footer__links" aria-label="Footer navigation">
          <a href="#menu">Menu</a>
          <a href="#build">Build Your Pizza</a>
          <Link to="/login">Login</Link>
          <Link to="/register">
            Sign Up <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
          <Link to="/admin/login" className="text-amber-500 font-semibold">
            Admin Portal &rarr;
          </Link>
        </nav>
      </div>
      <div className="page-shell landing-footer__bottom">
        <span>© {new Date().getFullYear()} PizzaDev. All rights reserved.</span>
        <a href="#home" className="landing-footer__toplink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
