import mainLogo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { inventoryService } from "../../services/inventoryService";
const status = (item) =>
  item.stock === 0 ? "out" : item.stock < item.threshold ? "low" : "good";
export default function InventoryManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await inventoryService.list();
      setItems(Array.isArray(data) ? data : data.inventory || []);
    } catch {
      setError(
        "Inventory data is not available yet. Connect the admin inventory API to populate this page.",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const initialLoad = setTimeout(load, 0);
    return () => clearTimeout(initialLoad);
  }, [load]);
  const update = async (item, stock) => {
    try {
      const result = await inventoryService.update(item.id || item._id, {
        stock: Number(stock),
      });
      const updated = result.item || result;
      setItems(
        items.map((current) =>
          (current.id || current._id) === (item.id || item._id)
            ? {
                ...current,
                ...updated,
                stock: Number(stock),
                updated: "Just now",
              }
            : current,
        ),
      );
    } catch {
      setError(
        "Stock could not be updated. Please try again when the API is available.",
      );
    }
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
          <div className="ops-eyebrow">Operations / Inventory</div>
          <h1>Stock, in view.</h1>
          <p>Manage pizza bases, sauces, cheeses, and vegetables.</p>
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
      {loading ? (
        <div className="empty-state">Loading inventory...</div>
      ) : !items.length ? (
        <div className="empty-state">
          No inventory items returned yet. The page is ready for `GET
          /api/admin/inventory`.
        </div>
      ) : (
        <div className="inventory-grid">
          {items.map((item) => {
            const state = status(item);
            return (
              <article className="inventory-card" key={item.id || item._id}>
                <div className="inventory-card__top">
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      {item.category} · Updated{" "}
                      {item.updated || item.updatedAt || "—"}
                    </p>
                  </div>
                  <span className={`stock-status stock-status--${state}`}>
                    {state === "good"
                      ? "In stock"
                      : state === "low"
                        ? "Low stock"
                        : "Out of stock"}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: ".7rem",
                    alignItems: "end",
                    marginTop: "1rem",
                  }}
                >
                  <label style={{ fontSize: ".7rem", color: "#9e9184" }}>
                    Current stock
                    <input
                      className="stock-input"
                      type="number"
                      min="0"
                      defaultValue={item.stock ?? item.currentStock ?? 0}
                      onBlur={(e) => update(item, e.target.value)}
                    />
                  </label>
                  <span style={{ fontSize: ".7rem", color: "#9e9184" }}>
                    Low-stock threshold: {item.threshold ?? "—"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
