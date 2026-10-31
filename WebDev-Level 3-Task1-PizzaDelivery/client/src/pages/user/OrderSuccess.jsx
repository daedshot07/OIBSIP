import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const fetchOrder = useCallback(async () => {
    try {
      const { data } = await api.get(`/orders/tracking/${orderId}`);
      if (data) setOrder(data);
    } catch (error) {
      console.error(error);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [fetchOrder]);

  if (!order)
    return (
      <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] p-10 text-center flex items-center justify-center">
        Loading confirmation...
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[var(--theme-card)] p-10 rounded shadow-md border-t-4 border-[var(--theme-accent)] text-center">
          <div className="w-16 h-16 bg-[var(--theme-bg)] rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--theme-highlight)]">
            <svg
              className="w-8 h-8 text-[var(--theme-highlight)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-sm font-bold tracking-widest text-[var(--theme-highlight)] uppercase mb-2">
            Payment Successful
          </h2>
          <h1 className="text-3xl font-bold text-[var(--theme-text)] mb-6">
            Order Confirmed
          </h1>

          <p className="text-[color-mix(in_srgb,var(--theme-text)_80%,transparent)] mb-8">
            Your pizza order has been successfully received and sent to the
            kitchen.
          </p>

          <div className="bg-[var(--theme-bg)] p-6 rounded-md text-left mb-8 space-y-4 border border-[var(--theme-card)]">
            <div className="flex justify-between border-b border-[var(--theme-card)] pb-3">
              <span className="text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] font-medium">
                Order ID:
              </span>
              <span className="font-bold text-[var(--theme-text)]">
                #{order._id}
              </span>
            </div>

            <div className="border-b border-[var(--theme-card)] pb-3 space-y-2">
              <span className="text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] font-medium block mb-2 uppercase text-xs tracking-wider">
                {order.items?.reduce((a, b) => a + (b.quantity || 1), 0)} PIZZAS
                ORDERED
              </span>
              {order.items &&
                order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[var(--theme-card)] p-3 rounded text-sm space-y-1"
                  >
                    <div className="font-bold text-[var(--theme-highlight)] flex justify-between">
                      <span>
                        Pizza {idx + 1} &mdash; {item.base?.name}
                      </span>
                      <span className="text-[var(--theme-text)]">
                        Total: ₹{item.price * (item.quantity || 1)}
                      </span>
                    </div>
                    <div className="text-xs">
                      Quantity: {item.quantity || 1}
                    </div>
                    <div>Base: {item.base?.name}</div>
                    <div>Sauce: {item.sauce?.name}</div>
                    <div>Cheese: {item.cheese?.name}</div>
                    <div>
                      Toppings:{" "}
                      {item.veggies?.length > 0
                        ? item.veggies.map((v) => v.name).join(", ")
                        : "None"}
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-between border-b border-[var(--theme-card)] pb-3">
              <span className="text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] font-medium">
                Payment:
              </span>
              <span className="font-bold text-[var(--theme-highlight)] uppercase">
                {order.paymentStatus === "SUCCESS"
                  ? "PAID"
                  : order.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between border-b border-[var(--theme-card)] pb-3">
              <span className="text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] font-medium">
                Status:
              </span>
              <span className="font-bold text-[var(--theme-text)]">
                {order.orderStatus.replace(/_/g, " ")}
              </span>
            </div>
            {order.pricing && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] font-medium">
                    Subtotal:
                  </span>
                  <span className="text-[var(--theme-text)]">
                    ₹{order.pricing.subtotal}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[var(--theme-card)] pb-3 text-sm">
                  <span className="text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] font-medium">
                    Delivery:
                  </span>
                  <span className="text-[var(--theme-text)]">
                    ₹{order.pricing.deliveryFee}
                  </span>
                </div>
              </>
            )}
            <div className="flex justify-between pt-2">
              <span className="text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] font-medium">
                Total Paid:
              </span>
              <span className="font-bold text-[var(--theme-accent)] text-lg">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate(`/orders/${orderId}`)}
              className="bg-[var(--theme-accent)] text-[var(--theme-bg)] font-bold px-8 py-3 rounded hover:bg-[var(--theme-highlight)] transition shadow-sm uppercase text-sm tracking-wide"
            >
              Track Order
            </button>
            <Link
              to="/dashboard"
              className="bg-[var(--theme-bg)] text-[var(--theme-text)] font-bold px-8 py-3 rounded border border-[var(--theme-card)] hover:bg-[var(--theme-card)] transition shadow-sm uppercase text-sm tracking-wide"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
