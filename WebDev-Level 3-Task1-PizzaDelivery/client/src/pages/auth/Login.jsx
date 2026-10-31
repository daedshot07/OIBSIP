import { useContext, useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import mainLogo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import "../../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      const pending = localStorage.getItem("pendingPizza");
      if (pending) {
        addToCart(JSON.parse(pending));
        localStorage.removeItem("pendingPizza");
        navigate("/summary", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password, remember);
      toast.success("Welcome back.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We could not sign you in with those details.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-page">
      <aside className="auth-visual">
        <div className="auth-visual__brand flex items-center mb-6">
          <img
            src={mainLogo}
            alt="PizzaDev Logo"
            className="h-14 w-auto rounded object-contain max-h-[56px] "
          />
        </div>
        <div className="auth-visual__copy">
          <div className="auth-visual__brand">CUSTOMER EXPERIENCE / 02</div>
          <h2>
            Good to
            <br />
            <em>see you.</em>
          </h2>
          <p>
            Your next perfect pizza is closer than you think. Sign in to
            continue building.
          </p>
        </div>
        <div className="auth-visual__footer">Your table is waiting</div>
      </aside>
      <main className="auth-panel">
        <section className="auth-card">
          <Link to="/" className="auth-back">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <div className="auth-card__eyebrow">Customer login</div>
          <h1>Welcome back.</h1>
          <p className="auth-card__intro">
            Sign in to pick up where you left off.
          </p>
          {error && <p className="form-error">{error}</p>}
          <form className="auth-form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="login-password">Password</label>
              <div className="input-wrap">
                <input
                  id="login-password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  className="input-toggle"
                  type="button"
                  onClick={() => setShow(!show)}
                  aria-label="Toggle password visibility"
                >
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <div className="terms">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember">Remember me</label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button className="auth-submit" disabled={loading}>
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>
          <div className="auth-links">
            <span>Don’t have an account?</span>
            <Link to="/register">Create account</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
