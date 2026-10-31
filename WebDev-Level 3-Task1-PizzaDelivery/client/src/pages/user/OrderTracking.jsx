import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrder = useCallback(async () => {
    try {
      const { data } = await api.get(`/orders/tracking/${orderId}`);
      setOrder(data);
    } catch (error) {
      console.error(error);
    }
  }, [orderId]);

  useEffect(() => {
    const initialFetch = setTimeout(fetchOrder, 0);
    const interval = setInterval(() => {
      if (order && order.orderStatus === "DELIVERED") {
        return;
      }
      fetchOrder();
    }, 5000);
    return () => {
      clearTimeout(initialFetch);
      clearInterval(interval);
    };
  }, [fetchOrder, order]);

  if (!order)
    return (
      <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] p-8 text-center flex items-center justify-center">
        Loading order tracking...
      </div>
    );

  const statuses = [
    { id: "ORDER_RECEIVED", label: "Order Received", icon: "📝" },
    { id: "IN_KITCHEN", label: "In Kitchen", icon: "👨‍🍳" },
    { id: "SENT_TO_DELIVERY", label: "Sent to Delivery", icon: "🛵" },
    { id: "DELIVERED", label: "Delivered", icon: "✅" },
  ];
  const currentStatusIndex = statuses.findIndex(
    (status) => status.id === order.orderStatus,
  );

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="text-[var(--theme-highlight)] hover:text-[var(--theme-accent)] transition-colors font-medium flex items-center gap-2 text-sm uppercase tracking-wider"
          >
            <span>&larr;</span> Back to Dashboard
          </Link>
        </div>
        <div className="bg-[var(--theme-card)] p-8 rounded shadow-sm border border-[var(--theme-card)] text-center">
          <h2 className="text-3xl font-bold text-[var(--theme-text)] mb-2">
            Track Your Order
          </h2>
          <p className="text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] mb-8">
            Order ID: {order._id}
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center relative mb-12 px-4 md:px-12">
            {statuses.map((status, index) => (
              <div
                key={status.id}
                className="flex flex-col items-center mb-6 md:mb-0 relative bg-[var(--theme-card)] px-2 z-10"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border-4 ${
                    index <= currentStatusIndex
                      ? "bg-[var(--theme-bg)] border-[var(--theme-accent)] text-[var(--theme-accent)]"
                      : "bg-[var(--theme-bg)] border-[var(--theme-card)] text-[color-mix(in_srgb,var(--theme-text)_30%,transparent)]"
                  }`}
                >
                  {index <= currentStatusIndex ? "✓ " : ""}
                  {status.icon}
                </div>
                <p
                  className={`mt-3 font-medium text-sm ${
                    index <= currentStatusIndex
                      ? "text-[var(--theme-accent)] font-bold"
                      : "text-[color-mix(in_srgb,var(--theme-text)_40%,transparent)]"
                  }`}
                >
                  {status.label}
                </p>
              </div>
            ))}
            <div className="hidden md:block absolute top-8 left-12 right-12 h-1 bg-[var(--theme-bg)]"></div>
          </div>

          <div className="border-t border-[var(--theme-bg)] pt-6 text-left bg-[var(--theme-bg)] p-6 rounded text-sm mt-8">
            <h3 className="font-bold text-lg mb-3 text-[var(--theme-text)]">
              Order Details
            </h3>
            <p className="mb-1 text-[color-mix(in_srgb,var(--theme-text)_80%,transparent)]">
              <strong className="text-[var(--theme-text)]">
                Payment Status:
              </strong>
              <span
                className={
                  order.paymentStatus === "PAID" ||
                  order.paymentStatus === "SUCCESS"
                    ? "text-[var(--theme-highlight)] font-bold ml-2"
                    : "ml-2"
                }
              >
                {order.paymentStatus === "SUCCESS"
                  ? "PAID"
                  : order.paymentStatus}
              </span>
            </p>
            <p className="mb-1 text-[color-mix(in_srgb,var(--theme-text)_80%,transparent)]">
              <strong className="text-[var(--theme-text)]">
                Total Amount:
              </strong>{" "}
              <span className="ml-2">₹{order.totalAmount}</span>
            </p>
            <div className="mt-4 text-[color-mix(in_srgb,var(--theme-text)_80%,transparent)]">
              <strong className="text-[var(--theme-text)]">Items:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {order.items.map((item, index) => (
                  <li key={index}>
                    Pizza Config {index + 1}: {item.base?.name || "Unknown"},{" "}
                    {item.sauce?.name || "Unknown"},{" "}
                    {item.cheese?.name || "Unknown"} — Qty {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
