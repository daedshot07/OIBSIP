import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { inventoryService } from "../../services/inventoryService";
import { orderService } from "../../services/orderService";
import { adminService } from "../../services/adminService";

const metricLabels = [
  ["Total orders", (orders) => orders.length],
  [
    "Pending orders",
    (orders) =>
      orders.filter(
        (o) => (o.orderStatus || o.status) === "ORDER_RECEIVED"
      ).length,
  ],
  [
    "Orders in kitchen",
    (orders) =>
      orders.filter(
        (o) => (o.orderStatus || o.status) === "IN_KITCHEN"
      ).length,
  ],
  [
    "Sent to delivery",
    (orders) =>
      orders.filter(
        (o) => (o.orderStatus || o.status) === "SENT_TO_DELIVERY"
      ).length,
  ],
  [
    "Delivered orders",
    (orders) =>
      orders.filter(
        (o) => (o.orderStatus || o.status) === "DELIVERED"
      ).length,
  ],
  [
    "Low stock items",
    (_, inventory) =>
      inventory.filter(
        (item) => (item.stock ?? item.quantity ?? 0) <= (item.threshold ?? item.lowStockThreshold ?? 10)
      ).length,
  ],
  ["Total admins", (_, __, admins) => admins.length],
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [ordersRes, inventoryRes, adminsRes] = await Promise.allSettled([
        orderService.list(),
        inventoryService.list(),
        adminService.list(),
      ]);

      let hasSuccess = false;

      if (ordersRes.status === "fulfilled") {
        hasSuccess = true;
        const orderData = ordersRes.value;
        setOrders(Array.isArray(orderData) ? orderData : orderData?.orders || []);
      }

      if (inventoryRes.status === "fulfilled") {
        hasSuccess = true;
        const inventoryData = inventoryRes.value;
        setInventory(
          Array.isArray(inventoryData)
            ? inventoryData
            : inventoryData?.inventory || []
        );
      }

      if (adminsRes.status === "fulfilled") {
        hasSuccess = true;
        const adminsData = adminsRes.value;
        setAdmins(
          Array.isArray(adminsData)
            ? adminsData
            : adminsData?.admins || []
        );
      }

      if (!hasSuccess) {
        setError(
          "Dashboard data is currently unavailable. Please verify that your admin session is active."
        );
      }
    } catch {
      setError(
        "Dashboard data is not available yet. Please check the admin API connection.",
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

  return (
    <div className="ops-page">
      <div className="ops-heading">
        <div>
          <div className="ops-eyebrow">Overview / Operations</div>
          <h1>Good morning, team.</h1>
          <p>A calm kitchen makes a better pizza.</p>
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
      <div className="ops-metrics">
        {metricLabels.map(([label, getValue]) => (
          <article className="metric" key={label}>
            <div className="metric__label">{label}</div>
            <strong>
              {loading
                ? "..."
                : orders.length || inventory.length || admins.length
                  ? getValue(orders, inventory, admins)
                  : "0"}
            </strong>
            <div className="metric__hint">
              {loading
                ? "Loading"
                : orders.length || inventory.length || admins.length
                  ? "Live API data"
                  : "Awaiting data"}
            </div>
          </article>
        ))}
      </div>
      <div className="ops-panels">
        <section className="ops-panel">
          <h2>Operations shortcuts</h2>
          <div className="ops-action-grid">
            <Link className="ops-action" to="/admin/orders">
              Review incoming orders &rarr;
            </Link>
            <Link className="ops-action" to="/admin/inventory">
              Check stock levels &rarr;
            </Link>
            <Link className="ops-action" to="/admin/admins">
              Manage Admins &rarr;
            </Link>
          </div>
        </section>
        <section className="ops-panel">
          <h2>Workspace status</h2>
          <p style={{ color: "color-mix(in srgb, var(--theme-text) 65%, transparent)", lineHeight: 1.6, fontSize: ".85rem" }}>
            {loading
              ? "Connecting to the operations API..."
              : error
                ? "API connection needs attention."
                : "Live operational data connected."}
          </p>
        </section>
        <section className="ops-panel ops-panel--wide">
          <h2>Order status flow</h2>
          {orders.length ? (
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                color: "color-mix(in srgb, var(--theme-text) 70%, transparent)",
                fontSize: ".82rem",
                padding: ".5rem 0",
              }}
            >
              <span>
                <strong>01 · ORDER_RECEIVED:</strong>{" "}
                {orders.filter((o) => (o.orderStatus || o.status) === "ORDER_RECEIVED").length}
              </span>
              <span>
                <strong>02 · IN_KITCHEN:</strong>{" "}
                {orders.filter((o) => (o.orderStatus || o.status) === "IN_KITCHEN").length}
              </span>
              <span>
                <strong>03 · SENT_TO_DELIVERY:</strong>{" "}
                {orders.filter((o) => (o.orderStatus || o.status) === "SENT_TO_DELIVERY").length}
              </span>
              <span>
                <strong>04 · DELIVERED:</strong>{" "}
                {orders.filter((o) => (o.orderStatus || o.status) === "DELIVERED").length}
              </span>
            </div>
          ) : (
            <div className="empty-state">
              Order flow will appear when active orders are placed.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
