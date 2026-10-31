import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function OrderSummary() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Calculate prices accurately
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  const handlePayment = async () => {
    if (cartItems.length === 0) return toast.error("Your cart is empty");
    try {
      setLoading(true);
      // Backend validates and returns computed order details and price
      const { data: orderData } = await api.post("/orders/create", {
        items: cartItems,
      });

      const totalItemsCount = cartItems.reduce(
        (acc, item) => acc + (Number(item.quantity) || 1),
        0
      );

      const itemsSummaryText = cartItems
        .map((i) => `${i.quantity || 1}x ${i.name || "Custom Pizza"}`)
        .join(", ");

      const finalPayableTotal = orderData.pricing?.total ?? (orderData.amount ? orderData.amount / 100 : total);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount, // in paise from backend, matches accurate total
        currency: orderData.currency || "INR",
        name: "Pizza Delivery",
        description: `${totalItemsCount} Pizza(s): ${itemsSummaryText} (₹${finalPayableTotal})`,
        order_id: orderData.id,
        handler: async (paymentResponse) => {
          try {
            await api.post("/orders/verify", {
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              orderId: orderData.receipt,
            });
            toast.success("Payment successful! Order placed.");
            clearCart();
            navigate(`/orders/success/${orderData.receipt}`);
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        notes: {
          itemsSummary: itemsSummaryText,
          subtotal: `₹${orderData.pricing?.subtotal ?? subtotal}`,
          deliveryFee: `₹${orderData.pricing?.deliveryFee ?? deliveryFee}`,
          total: `₹${finalPayableTotal}`,
        },
        theme: {
          color: "#d65a3a",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", () => toast.error("Payment Failed!"));
      rzp1.open();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to initiate payment",
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your order is empty</h2>
        <button
          onClick={() => navigate("/build-pizza")}
          className="bg-[var(--theme-accent)] text-[var(--theme-bg)] px-6 py-2 rounded font-bold hover:bg-[var(--theme-highlight)] transition"
        >
          Build a Pizza
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] py-8">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="text-[var(--theme-highlight)] hover:text-[var(--theme-accent)] transition-colors font-medium flex items-center gap-2 text-sm uppercase tracking-wider w-fit"
          >
            <span>&larr;</span> Back to Dashboard
          </Link>
        </div>
        <h2 className="text-3xl font-bold mb-8 text-[var(--theme-text)] border-b border-[var(--theme-card)] pb-4">
          Order Summary
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-[var(--theme-card)] p-6 rounded shadow-sm border border-[var(--theme-card)]"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-xl text-[var(--theme-text)]">
                    {item.name || `Custom Pizza ${index + 1}`}
                  </h4>
                  <div className="font-bold text-[var(--theme-accent)]">
                    ₹{(Number(item.price) || 0) * (Number(item.quantity) || 1)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-[color-mix(in_srgb,var(--theme-text)_80%,transparent)] mb-4">
                  <div>
                    <span className="font-semibold text-[var(--theme-highlight)] block text-xs uppercase tracking-wider">
                      Base
                    </span>
                    {item.base?.name || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-[var(--theme-highlight)] block text-xs uppercase tracking-wider">
                      Sauce
                    </span>
                    {item.sauce?.name || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-[var(--theme-highlight)] block text-xs uppercase tracking-wider">
                      Cheese
                    </span>
                    {item.cheese?.name || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-[var(--theme-highlight)] block text-xs uppercase tracking-wider">
                      Toppings
                    </span>
                    {item.veggies?.length > 0 ? (
                      <ul className="list-disc pl-4 mt-1">
                        {item.veggies.map((v, vIdx) => (
                          <li key={v.id || v.name || vIdx}>{v.name}</li>
                        ))}
                      </ul>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-[var(--theme-bg)] pt-4 mt-2">
                  <div className="flex items-center gap-4 bg-[var(--theme-bg)] px-3 py-1 rounded border border-[var(--theme-card)]">
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      className="text-lg font-bold text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition px-2"
                    >
                      -
                    </button>
                    <span className="font-medium w-4 text-center">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      className="text-lg font-bold text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition px-2"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        navigate("/build-pizza", {
                          state: { editCartItemId: item.id },
                        })
                      }
                      className="text-sm text-[var(--theme-text)] hover:text-[var(--theme-highlight)] font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-[var(--theme-highlight)] hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/build-pizza")}
                className="px-6 py-3 rounded-lg border-2 border-[var(--theme-accent)] text-[var(--theme-accent)] font-bold hover:bg-[var(--theme-accent)]/10 transition uppercase tracking-wide text-sm w-full md:w-auto"
              >
                + Add Another Pizza
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 h-fit bg-[var(--theme-card)] p-6 rounded shadow-sm border border-[var(--theme-card)] sticky top-6">
            <h3 className="text-xl font-bold text-[var(--theme-text)] mb-6 border-b border-[var(--theme-bg)] pb-2">
              Price Details
            </h3>

            <div className="space-y-4 mb-6 text-[color-mix(in_srgb,var(--theme-text)_80%,transparent)]">
              <div className="flex justify-between">
                <span>Total Pizzas</span>
                <span className="font-medium text-[var(--theme-text)]">
                  {cartItems.reduce(
                    (acc, item) => acc + (item.quantity || 1),
                    0,
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[var(--theme-text)]">
                  ₹{subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-medium text-[var(--theme-text)]">
                  ₹{deliveryFee}
                </span>
              </div>
              <div className="flex justify-between border-t border-[var(--theme-bg)] pt-4 text-lg">
                <span className="font-bold text-[var(--theme-text)]">
                  TOTAL
                </span>
                <span className="font-bold text-[var(--theme-accent)]">
                  ₹{total}
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-bold px-6 py-3 rounded hover:bg-[var(--theme-highlight)] transition disabled:opacity-70 shadow-md uppercase tracking-wide text-sm"
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
