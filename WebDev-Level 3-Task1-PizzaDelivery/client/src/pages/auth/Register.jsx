import { useMemo, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import mainLogo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/auth.css";

const initial = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
};
export default function Register() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const strength = useMemo(() => {
    const p = form.password;
    return Math.min(
      4,
      [
        p.length >= 8,
        /[A-Z]/.test(p),
        /\d/.test(p),
        /[^A-Za-z0-9]/.test(p),
      ].filter(Boolean).length,
    );
  }, [form.password]);
  const set = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (form.password.length < 8) next.password = "Use at least 8 characters.";
    if (!form.confirmPassword)
      next.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword)
      next.confirmPassword = "Passwords do not match.";
    if (!form.terms) next.terms = "Please accept the terms to continue.";
    setErrors(next);
    return !Object.keys(next).length;
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      toast.success("Account request received. Check your email to verify.");
      navigate("/login");
    } catch (error) {
      setErrors({
        form:
          error.response?.data?.message ||
          "We could not create your account yet.",
      });
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
          <div className="auth-visual__brand">CUSTOMER EXPERIENCE / 01</div>
          <h2>
            Make it
            <br />
            <em>yours.</em>
          </h2>
          <p>
            A warmer way to order: thoughtful ingredients, a little imagination,
            and pizza made around you.
          </p>
        </div>
        <div className="auth-visual__footer">Fresh choices · made slowly</div>
      </aside>
      <main className="auth-panel">
        <section className="auth-card">
          <Link to="/" className="auth-back">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <div className="auth-card__eyebrow">Create your account</div>
          <h1>Start with a blank canvas.</h1>
          <p className="auth-card__intro">Start creating your perfect pizza.</p>
          {errors.form && <p className="form-error">{errors.form}</p>}
          <form className="auth-form" onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                autoComplete="name"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
              />
              {errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  autoComplete="new-password"
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
              <div className="password-meter">
                <span
                  style={{
                    width: `${strength * 25}%`,
                    background:
                      strength < 2
                        ? "#a13f32"
                        : strength < 4
                          ? "#b87838"
                          : "#54714f",
                  }}
                />
              </div>
              {errors.password && (
                <span className="form-error">{errors.password}</span>
              )}
            </div>
            <div className="field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type={show ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => set("confirmPassword", e.target.value)}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <span className="form-error">{errors.confirmPassword}</span>
              )}
            </div>
            <label className="terms">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) => set("terms", e.target.checked)}
              />{" "}
              <span>I agree to the Terms & Conditions.</span>
            </label>
            {errors.terms && <span className="form-error">{errors.terms}</span>}
            <button className="auth-submit" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
          <div className="auth-links">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
