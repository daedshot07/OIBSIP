import mainLogo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { orderService } from "../../services/orderService";
import { toast } from "react-hot-toast";

const labels = {
  ORDER_RECEIVED: "Order received",
  IN_KITCHEN: "In kitchen",
  SENT_TO_DELIVERY: "Sent to delivery",
  DELIVERED: "Delivered",
};

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await orderService.list();
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch {
      setError(
        "Orders are not available yet. Connect the admin orders API to populate this page.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoad = setTimeout(load, 0);
    const interval = setInterval(load, 10000);
    return () => {
      clearTimeout(initialLoad);
      clearInterval(interval);
    };
  }, [load]);

  const change = async (order, status) => {
    try {
      await orderService.updateStatus(order.id || order._id, status);
      toast.success(`Order status updated to ${labels[status]}`);
      setOrders(
        orders.map((current) =>
          (current.id || current._id) === (order.id || order._id)
            ? { ...current, status, orderStatus: status }
            : current,
        ),
      );
    } catch {
      toast.error("Order status could not be updated. Please try again.");
    }
  };

  const renderItems = (items) => {
    if (!items || !items.length) return "—";
    return (
      <div className="text-sm">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="mb-2 pb-2 border-b last:border-0 border-[#39302a]"
          >
            <strong>
              Pizza {idx + 1} (x{item.quantity}):
            </strong>
            <br />
            Base: {item.base?.name || "—"}
            <br />
            Sauce: {item.sauce?.name || "—"}
            <br />
            Cheese: {item.cheese?.name || "—"}
            <br />
            Toppings:{" "}
            {item.veggies?.length
              ? item.veggies.map((v) => v.name).join(", ")
              : "None"}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="ops-page">
      <div className="mb-6">
        <Link
          to="/admin/dashboard"
          className="text-[var(--theme-highlight)] hover:text-[var(--theme-accent)] transition-colors font-medium flex items-center gap-2 text-sm uppercase tracking-wider w-fit"
        >
          <span>&larr;</span> Back to Dashboard
        </Link>
      </div>
      <div className="ops-heading">
        <div>
          <div className="ops-eyebrow">Operations / Orders</div>
          <h1>Keep things moving.</h1>
          <p>Review orders and update their current kitchen status.</p>
        </div>
      </div>
      {error && (
        <div className="error-state" role="alert">
          {error}
          <br />
          <button className="retry-button" onClick={load}>
            Retry
          </button>
        </div>
      )}

      <section className="ops-panel">
        {loading && orders.length === 0 ? (
          <div className="empty-state">Loading orders...</div>
        ) : !orders.length ? (
          <div className="empty-state">
            No orders returned yet. The page is ready for `GET
            /api/admin/orders`.
          </div>
        ) : (
          <div className="ops-table-wrap">
            <table className="ops-table text-left">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Pizza details</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id || order._id}>
                    <td className="align-top font-mono text-xs pt-4">
                      <strong>#{order.id || order._id}</strong>
                    </td>
                    <td className="align-top pt-4">
                      <strong>
                        {order.customerName || order.user?.name || "—"}
                      </strong>
                      <br />
                      <span className="text-xs" style={{ color: "#9e9184" }}>
                        {order.customerEmail || order.user?.email || ""}
                      </span>
                    </td>
                    <td className="align-top pt-4">
                      {renderItems(order.items)}
                    </td>
                    <td className="align-top pt-4">
                      <div className="font-bold">
                        ₹{order.totalAmount || order.amount || "—"}
                      </div>
                      {order.pricing && (
                        <div
                          className="text-xs mt-1"
                          style={{ color: "#9e9184" }}
                        >
                          Sub: ₹{order.pricing.subtotal}
                          <br />
                          Del: ₹{order.pricing.deliveryFee}
                        </div>
                      )}
                    </td>
                    <td className="align-top pt-4">
                      <span
                        className={`status-pill ${order.paymentStatus === "PAID" ? "status-pill--paid" : ""}`}
                        style={
                          order.paymentStatus === "PAID"
                            ? {
                                backgroundColor: "rgba(20, 83, 45, 0.3)",
                                color: "#4ade80",
                                borderColor: "#166534",
                                padding: "0.2rem 0.5rem",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                border: "1px solid",
                              }
                            : {}
                        }
                      >
                        {order.paymentStatus === "PAID"
                          ? "✓ PAID"
                          : order.paymentStatus || order.payment || "—"}
                      </span>
                    </td>
                    <td className="align-top pt-4">
                      <select
                        value={
                          order.status || order.orderStatus || "ORDER_RECEIVED"
                        }
                        onChange={(e) => change(order, e.target.value)}
                        className="p-1 rounded text-sm"
                        style={{
                          background: "var(--theme-bg)",
                          border: "1px solid #39302a",
                          color: "var(--theme-text)",
                        }}
                      >
                        {Object.entries(labels).map(([value, label]) => (
                          <option value={value} key={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td
                      className="align-top pt-4 text-xs"
                      style={{ color: "#9e9184" }}
                    >
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : order.date || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
