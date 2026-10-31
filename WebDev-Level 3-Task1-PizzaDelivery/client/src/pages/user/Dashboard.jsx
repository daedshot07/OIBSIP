import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import "../../styles/dashboard.css";
import mainLogo from "../../assets/logo.jpg";
import margheritaImg from "../../assets/margherita.png";
import smokedGardenImg from "../../assets/smoked-garden.png";
import spicyDiavolaImg from "../../assets/spicy-diavola.png";

const pizzas = [
  {
    name: "Margherita Classic",
    desc: "San Marzano tomato, basil, fior di latte",
    price: "₹320",
    rating: "4.9",
    image: margheritaImg,
    cartItem: {
      base: { id: "b1", name: "Thin Crust", price: 100 },
      sauce: { id: "s1", name: "Tomato Basil", price: 20 },
      cheese: { id: "c1", name: "Mozzarella", price: 50 },
      veggies: [{ id: "v2", name: "Tomatoes", price: 15 }],
      price: 320,
      quantity: 1,
      name: "Margherita Classic",
    },
  },
  {
    name: "Smoked Garden",
    desc: "Roasted peppers, smoked cheese, garden herbs",
    price: "₹410",
    rating: "4.8",
    image: smokedGardenImg,
    cartItem: {
      base: { id: "b1", name: "Thin Crust", price: 100 },
      sauce: { id: "s5", name: "Pesto Sauce", price: 50 },
      cheese: { id: "c2", name: "Cheddar", price: 60 },
      veggies: [
        { id: "v3", name: "Bell Peppers", price: 20 },
        { id: "v4", name: "Mushrooms", price: 30 },
        { id: "v5", name: "Olives", price: 35 },
      ],
      price: 410,
      quantity: 1,
      name: "Smoked Garden",
    },
  },
  {
    name: "Spicy Diavola",
    desc: "Calabrian chilli, pepperoni, hot honey",
    price: "₹460",
    rating: "4.9",
    image: spicyDiavolaImg,
    cartItem: {
      base: { id: "b2", name: "Thick Crust", price: 120 },
      sauce: { id: "s4", name: "Spicy Sriracha", price: 25 },
      cheese: { id: "c1", name: "Mozzarella", price: 50 },
      veggies: [
        { id: "n2", name: "Pepperoni", price: 60 },
        { id: "v6", name: "Jalapenos", price: 25 },
      ],
      price: 460,
      quantity: 1,
      name: "Spicy Diavola",
    },
  },
];

export default function Dashboard() {
  const { user, logout, admin } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleOrderPreset = (preset) => {
    addToCart(preset.cartItem);
    toast.success(`${preset.name} added to order!`);
    navigate("/summary");
  };
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const latestOrder = orders.length > 0 ? orders[0] : null;

  return (
    <div className="customer-shell">
      <header className="customer-topbar">
        <div className="customer-topbar__inner">
          <Link className="dash-brand flex items-center" to="/">
            <img
              src={mainLogo}
              alt="PizzaDev Logo"
              className="h-10 w-auto rounded object-contain max-h-[40px] "
            />
          </Link>
          <nav className="customer-nav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/build-pizza">Build pizza</Link>
            {admin ? (
              <Link to="/admin/dashboard" style={{ color: "var(--theme-accent)", fontWeight: 700 }}>Admin Portal</Link>
            ) : (
              <Link to="/admin/login" style={{ opacity: 0.75 }}>Admin</Link>
            )}
            <button onClick={logout}>Log out</button>
          </nav>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="dashboard-heading">
          <div>
            <div className="dashboard-kicker">Customer dashboard</div>
            <h1>Welcome back, {user?.name?.split(" ")[0] || "there"}.</h1>
            <p>Your next great pizza starts with a good choice.</p>
          </div>
          <div className="dash-actions">
            <Link
              className="dash-button dash-button--primary"
              to="/build-pizza"
            >
              Build your pizza
            </Link>
            <Link className="dash-button" to="/dashboard#pizzas">
              Browse pizzas
            </Link>
          </div>
        </div>
        <div className="dashboard-grid">
          <section
            className="dashboard-section dashboard-section--wide"
            id="pizzas"
          >
            <div className="section-label">
              <h2>Available pizzas</h2>
              <span>Seasonal favourites</span>
            </div>
            <div className="pizza-grid">
              {pizzas.map((p) => (
                <article className="pizza-card" key={p.name}>
                  <div
                    className="pizza-card__image"
                    aria-hidden="true"
                    style={{ padding: 0, overflow: "hidden" }}
                  >
                    <img
                      src={p.image}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="pizza-card__body">
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                    <div className="pizza-card__meta">
                      <span>
                        {p.price} • ★ {p.rating}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOrderPreset(p)}
                      >
                        Order
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {latestOrder && (
            <section className="dashboard-section">
              <div className="section-label">
                <h2>Current order</h2>
                <span>#{latestOrder._id.substring(0, 8)}</span>
              </div>
              <div className="progress">
                {["Order received", "In kitchen", "Sent to delivery"].map(
                  (step, i) => {
                    const statusMap = {
                      ORDER_RECEIVED: 0,
                      IN_KITCHEN: 1,
                      SENT_TO_DELIVERY: 2,
                      DELIVERED: 3,
                    };
                    const currentIdx = statusMap[latestOrder.orderStatus] || 0;
                    const isActive = currentIdx >= i;
                    return (
                      <div
                        className={`progress-step ${isActive ? "is-active" : ""}`}
                        key={step}
                      >
                        <div className="progress-dot">
                          {isActive ? 'o"' : i + 1}
                        </div>
                        {step}
                      </div>
                    );
                  },
                )}
              </div>
            </section>
          )}

          {!latestOrder && (
            <section className="dashboard-section">
              <div className="section-label">
                <h2>Quick start</h2>
                <span>Make it yours</span>
              </div>
              <p
                style={{
                  color: "rgba(246, 240, 232, 0.7)",
                  lineHeight: 1.6,
                  fontSize: ".85rem",
                }}
              >
                Choose your base, sauce, cheese, and finishings. Your saved
                choices will be ready for the next order.
              </p>
              <Link className="dash-button" to="/build-pizza">
                Open builder +'
              </Link>
            </section>
          )}

          <section className="dashboard-section dashboard-section--wide">
            <div className="section-label">
              <h2>Recent orders</h2>
              <span>Latest activity</span>
            </div>
            {loading ? (
              <p style={{ color: "var(--theme-text)", opacity: 0.7 }}>
                Loading orders...
              </p>
            ) : orders.length === 0 ? (
              <p style={{ color: "var(--theme-text)", opacity: 0.7 }}>
                You have no recent orders.
              </p>
            ) : (
              orders.map((order) => (
                <div className="order-row" key={order._id}>
                  <strong>
                    #{order._id.substring(0, 8)}
                    <small>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </strong>
                  <span>
                    {order.items && order.items.length > 0
                      ? order.items.length === 1
                        ? `${order.items[0].base?.name} • ${order.items[0].sauce?.name}`
                        : `${order.items.reduce((a, b) => a + (b.quantity || 1), 0)} Pizzas`
                      : "Custom Pizza"}
                  </span>
                  <strong>₹{order.totalAmount}</strong>
                  <span
                    className={`status-pill ${order.paymentStatus === "PAID" || order.paymentStatus === "SUCCESS" ? "status-pill--paid" : ""}`}
                  >
                    {order.paymentStatus === "SUCCESS"
                      ? "PAID"
                      : order.paymentStatus}
                  </span>
                  <span className="status-pill">
                    {order.orderStatus.replace(/_/g, " ")}
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link
                      to={`/orders/success/${order._id}`}
                      className="text-[var(--theme-highlight)] text-xs font-bold hover:underline"
                    >
                      VIEW DETAILS
                    </Link>
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-[var(--theme-accent)] text-xs font-bold hover:underline"
                    >
                      TRACK
                    </Link>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
