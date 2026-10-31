import mainLogo from "../../assets/logo.jpg";
import { useContext, useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/auth.css";

export default function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { admin, adminRegister } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) navigate("/admin/dashboard", { replace: true });
  }, [admin, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminRegister({ name, email, password });
      toast.success("Admin registration successful. Please log in.");
      navigate("/admin/login");
    } catch (err) {
      setError(err.response?.data?.message || "Could not register admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page admin-auth">
      <aside className="auth-visual">
        <div className="auth-visual__brand flex items-center mb-6">
          <img
            src={mainLogo}
            alt="PizzaDev Logo"
            className="h-14 w-auto rounded object-contain max-h-[56px] "
          />
          <span className="ml-2">/ OPERATIONS</span>
        </div>
        <div className="auth-visual__copy">
          <div className="auth-visual__brand">PRIVATE WORKSPACE</div>
          <h2>
            Join the
            <br />
            <em>kitchen.</em>
          </h2>
          <p>
            Secure access for the people keeping every order moving, stocked,
            and on time.
          </p>
        </div>
        <div className="auth-visual__footer">Provisioned access only</div>
      </aside>
      <main className="auth-panel">
        <section className="auth-card">
          <Link to="/" className="auth-back">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <div className="auth-card__eyebrow">Operations portal</div>
          <h1>Create admin.</h1>
          <p className="auth-card__intro">Register a new operations account.</p>
          {error && <p className="form-error">{error}</p>}
          <form className="auth-form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="admin-name">Full Name</label>
              <input
                id="admin-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor="admin-email">Admin email</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="field">
              <label htmlFor="admin-password">Admin password</label>
              <div className="input-wrap">
                <input
                  id="admin-password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={8}
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
            <button className="auth-submit" disabled={loading}>
              {loading ? "Registering..." : "Create account"}
            </button>
          </form>
          <div
            className="auth-links"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <span>
              Already have an admin account?{" "}
              <Link to="/admin/login">Log in</Link>
            </span>
            <Link to="/login">← Back to customer login</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
