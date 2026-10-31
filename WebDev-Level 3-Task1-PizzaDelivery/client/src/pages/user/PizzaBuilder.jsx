import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const BASES = [
  { id: "b1", name: "Thin Crust", price: 100 },
  { id: "b2", name: "Thick Crust", price: 120 },
  { id: "b3", name: "Cheese Burst", price: 200 },
  { id: "b4", name: "Wheat Crust", price: 130 },
  { id: "b5", name: "Gluten-Free", price: 150 },
];

const SAUCES = [
  { id: "s1", name: "Tomato Basil", price: 20 },
  { id: "s2", name: "Garlic Parmesan", price: 30 },
  { id: "s3", name: "BBQ Sauce", price: 40 },
  { id: "s4", name: "Spicy Sriracha", price: 25 },
  { id: "s5", name: "Pesto Sauce", price: 50 },
];

const CHEESES = [
  { id: "c1", name: "Mozzarella", price: 50 },
  { id: "c2", name: "Cheddar", price: 60 },
  { id: "c3", name: "Parmesan", price: 70 },
  { id: "c4", name: "Vegan Cheese", price: 90 },
];

const TOPPINGS = [
  { id: "v1", name: "Onions", price: 15 },
  { id: "v2", name: "Tomatoes", price: 15 },
  { id: "v3", name: "Bell Peppers", price: 20 },
  { id: "v4", name: "Mushrooms", price: 30 },
  { id: "v5", name: "Olives", price: 35 },
  { id: "v6", name: "Jalapenos", price: 25 },
  { id: "v7", name: "Sweet Corn", price: 20 },
  { id: "n1", name: "Chicken Tikka", price: 50 },
  { id: "n2", name: "Pepperoni", price: 60 },
  { id: "n3", name: "Bacon", price: 70 },
  { id: "n4", name: "Grilled Chicken", price: 55 },
];

export default function PizzaBuilder() {
  const { user } = useContext(AuthContext);
  const { addToCart, cartItems, updateCartItem, cartTotal } =
    useContext(CartContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const location = useLocation();
  const editCartItemId = location.state?.editCartItemId;

  useEffect(() => {
    if (editCartItemId && cartItems.length > 0) {
      const item = cartItems.find((i) => i.id === editCartItemId);
      if (item) {
        setSelectedBase(item.base);
        setSelectedSauce(item.sauce);
        setSelectedCheese(item.cheese);
        setSelectedVeggies(item.veggies || []);
      }
    }
  }, [editCartItemId, cartItems]);

  useEffect(() => {
    if (!user) {
      toast("Please login to build your pizza");
      navigate("/login");
    }
  }, [user, navigate]);

  const toggleVeggie = (veggie) => {
    const isSelected = selectedVeggies.some((v) => v.id === veggie.id);
    if (isSelected) {
      setSelectedVeggies(selectedVeggies.filter((v) => v.id !== veggie.id));
    } else {
      setSelectedVeggies([...selectedVeggies, veggie]);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedBase) total += selectedBase.price;
    if (selectedSauce) total += selectedSauce.price;
    if (selectedCheese) total += selectedCheese.price;
    selectedVeggies.forEach((v) => (total += v.price));
    return total;
  };

  const nextStep = () => {
    if (step === 1 && !selectedBase) return toast.error("Please select a base");
    if (step === 2 && !selectedSauce)
      return toast.error("Please select a sauce");
    if (step === 3 && !selectedCheese)
      return toast.error("Please select a cheese type");
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step === 1) {
      navigate("/dashboard");
    } else {
      setStep(step - 1);
    }
  };

  const handleAddAnother = () => {
    if (!selectedBase || !selectedSauce || !selectedCheese) {
      return toast.error("Please complete all steps");
    }
    let existingQty = 1;
    if (editCartItemId) {
      const existingItem = cartItems.find((i) => i.id === editCartItemId);
      if (existingItem) existingQty = existingItem.quantity || 1;
    }
    const pizza = {
      base: selectedBase,
      sauce: selectedSauce,
      cheese: selectedCheese,
      veggies: selectedVeggies,
      price: calculateTotal(),
      quantity: existingQty,
      name: "Custom Pizza",
    };

    if (editCartItemId) {
      updateCartItem(editCartItemId, pizza);
      toast.success("Pizza updated!");
    } else {
      addToCart(pizza);
      toast.success("Pizza added to order!");
    }
    setStep(1);
    setSelectedBase(null);
    setSelectedSauce(null);
    setSelectedCheese(null);
    setSelectedVeggies([]);
    navigate("/build-pizza", { replace: true, state: {} });
  };

  const handleReviewOrder = () => {
    if (selectedBase && selectedSauce && selectedCheese) {
      let existingQty = 1;
      if (editCartItemId) {
        const existingItem = cartItems.find((i) => i.id === editCartItemId);
        if (existingItem) existingQty = existingItem.quantity || 1;
      }
      const pizza = {
        base: selectedBase,
        sauce: selectedSauce,
        cheese: selectedCheese,
        veggies: selectedVeggies,
        price: calculateTotal(),
      quantity: existingQty,
      name: "Custom Pizza",
      };

      if (editCartItemId) {
        updateCartItem(editCartItemId, pizza);
      } else {
        addToCart(pizza);
      }
    } else if (cartItems.length === 0) {
      return toast.error("Please build a pizza first");
    }
    navigate("/summary");
  };

  const handleFinish = () => {
    if (!selectedBase || !selectedSauce || !selectedCheese) {
      return toast.error("Please complete all steps");
    }

    const pizza = {
      base: selectedBase,
      sauce: selectedSauce,
      cheese: selectedCheese,
      veggies: selectedVeggies,
      price: calculateTotal(),
      quantity: 1,
      name: "Custom Pizza",
    };

    addToCart(pizza);
    toast.success("Pizza added to order!");
    navigate("/summary");
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BASES.map((base) => (
              <div
                key={base.id}
                onClick={() => setSelectedBase(base)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${selectedBase?.id === base.id ? "border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 shadow-[0_0_15px_rgba(214,90,58,0.15)]" : "border-[var(--theme-text)]/10 hover:border-[var(--theme-highlight)] hover:bg-[var(--theme-text)]/5"}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[var(--theme-text)]">
                    {base.name}
                  </span>
                  <span className="text-[var(--theme-highlight)] font-bold">
                    ₹{base.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAUCES.map((sauce) => (
              <div
                key={sauce.id}
                onClick={() => setSelectedSauce(sauce)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${selectedSauce?.id === sauce.id ? "border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 shadow-[0_0_15px_rgba(214,90,58,0.15)]" : "border-[var(--theme-text)]/10 hover:border-[var(--theme-highlight)] hover:bg-[var(--theme-text)]/5"}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[var(--theme-text)]">
                    {sauce.name}
                  </span>
                  <span className="text-[var(--theme-highlight)] font-bold">
                    ₹{sauce.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHEESES.map((cheese) => (
              <div
                key={cheese.id}
                onClick={() => setSelectedCheese(cheese)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${selectedCheese?.id === cheese.id ? "border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 shadow-[0_0_15px_rgba(214,90,58,0.15)]" : "border-[var(--theme-text)]/10 hover:border-[var(--theme-highlight)] hover:bg-[var(--theme-text)]/5"}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[var(--theme-text)]">
                    {cheese.name}
                  </span>
                  <span className="text-[var(--theme-highlight)] font-bold">
                    ₹{cheese.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TOPPINGS.map((veggie) => {
              const isSelected = selectedVeggies.some(
                (v) => v.id === veggie.id,
              );
              return (
                <div
                  key={veggie.id}
                  onClick={() => toggleVeggie(veggie)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${isSelected ? "border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 shadow-[0_0_15px_rgba(214,90,58,0.15)]" : "border-[var(--theme-text)]/10 hover:border-[var(--theme-highlight)] hover:bg-[var(--theme-text)]/5"}`}
                >
                  <div className="flex justify-between items-center flex-col sm:flex-row gap-2 sm:gap-0">
                    <span className="font-medium text-[var(--theme-text)] text-center sm:text-left">
                      {veggie.name}
                    </span>
                    <span className="text-[var(--theme-highlight)] font-bold">
                      ₹{veggie.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 text-[var(--theme-text)]">
      {/* Builder Form */}
      <div className="flex-1 bg-[var(--theme-card)] p-6 md:p-8 rounded-2xl shadow-2xl border border-[var(--theme-text)]/5">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-8 relative px-2">
            {/* Background progress line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[var(--theme-bg)] z-0 rounded-full">
              <div
                className="h-full bg-[var(--theme-accent)] transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(214,90,58,0.5)]"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
            </div>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="relative z-10 flex items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${step >= s ? "bg-[var(--theme-accent)] text-[var(--theme-text)] shadow-[0_0_15px_rgba(214,90,58,0.4)] scale-110" : "bg-[var(--theme-card)] border-2 border-[var(--theme-bg)] text-[color-mix(in_srgb,var(--theme-text)_30%,transparent)]"}`}
                >
                  {s}
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--theme-highlight)] mb-2 tracking-wide">
            {step === 1 && "Step 1: Choose Your Base"}
            {step === 2 && "Step 2: Choose Your Sauce"}
            {step === 3 && "Step 3: Choose Your Cheese"}
            {step === 4 && "Step 4: Add Toppings"}
          </h2>
          <p className="text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] text-sm">
            Build your perfect pizza, customized to your taste.
          </p>
        </div>

        <div className="min-h-[320px]">{renderStepContent()}</div>

        <div className="flex justify-between mt-10 border-t border-[var(--theme-text)]/10 pt-8">
          <button
            onClick={prevStep}

            className="px-6 py-2.5 rounded-lg border border-[var(--theme-text)]/20 text-[var(--theme-text)] hover:bg-[var(--theme-text)]/5 transition-all duration-300 font-medium"
          >
            Back
          </button>

          {step < 4 ? (
            <button
              onClick={nextStep}
              className="px-8 py-2.5 rounded-lg bg-[var(--theme-highlight)] text-[var(--theme-bg)] font-bold hover:bg-[var(--theme-accent)] hover:text-[var(--theme-text)] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-8 py-2.5 rounded-lg bg-[var(--theme-accent)] text-[var(--theme-text)] font-bold hover:bg-[var(--theme-highlight)] hover:text-[var(--theme-bg)] transition-all duration-300 shadow-[0_4px_20px_rgba(214,90,58,0.4)] hover:shadow-[0_4px_25px_rgba(229,138,69,0.5)] transform hover:-translate-y-0.5"
            >
              Add to Order
            </button>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-full md:w-80 bg-[var(--theme-card)] p-6 rounded-2xl shadow-2xl border border-[var(--theme-text)]/5 h-fit sticky top-6">
        <h3 className="text-xl font-bold text-[var(--theme-highlight)] mb-6 border-b border-[var(--theme-text)]/10 pb-3 uppercase tracking-wider text-center">
          Your Pizza
        </h3>

        <div className="flex justify-center mb-8 py-8 bg-[var(--theme-bg)] rounded-xl border border-[var(--theme-text)]/5 relative h-64 items-center overflow-hidden shadow-inner">
          {/* Sophisticated CSS Pizza Preview */}
          <div
            className={`css-pizza-preview w-44 h-44 rounded-full transition-all duration-700 ease-in-out relative flex items-center justify-center ${selectedBase ? "scale-100 opacity-100" : "scale-90 opacity-40"}`}
          >
            {/* Plate */}
            <div className="absolute w-52 h-52 rounded-full border border-[var(--theme-text)]/5 bg-[#1a1715] shadow-2xl"></div>
            <div className="absolute w-44 h-44 rounded-full border border-[var(--theme-text)]/5 bg-[#1a1715] shadow-inner"></div>

            {/* Base */}
            <div
              className={`absolute w-40 h-40 rounded-full shadow-inner transition-all duration-500 z-0 ${selectedBase ? "bg-[#E3A869]" : "bg-transparent"}`}
            >
              {selectedBase && (
                <div className="absolute inset-0 rounded-full border-[6px] border-[#C27E42] opacity-80 mix-blend-multiply"></div>
              )}
            </div>

            {/* Sauce */}
            <div
              className={`absolute w-36 h-36 rounded-full transition-all duration-500 z-10 ${selectedSauce ? "bg-[#BA3B24] scale-100 opacity-90" : "scale-50 opacity-0"}`}
            >
              {selectedSauce && (
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_transparent_20%,_#8c2211_120%)] mix-blend-multiply"></div>
              )}
            </div>

            {/* Cheese */}
            <div
              className={`absolute w-[132px] h-[132px] rounded-full transition-all duration-500 z-20 ${selectedCheese ? "bg-[#F4D03F] scale-100 opacity-95" : "scale-50 opacity-0"}`}
            >
              {selectedCheese && (
                <>
                  <div className="absolute w-8 h-8 rounded-full bg-[#F7DC6F] top-2 left-4 blur-[1px] opacity-80"></div>
                  <div className="absolute w-10 h-10 rounded-full bg-[#F9E79F] bottom-3 right-5 blur-[2px] opacity-90"></div>
                  <div className="absolute w-6 h-6 rounded-full bg-[#FCF3CF] top-10 right-3 blur-[1px] opacity-70"></div>
                </>
              )}
            </div>

            {/* Toppings */}
            {selectedVeggies.length > 0 && (
              <div className="absolute w-[120px] h-[120px] rounded-full flex flex-wrap items-center justify-center gap-1.5 p-2 z-30 transition-all duration-300">
                {selectedVeggies.map((v, i) => {
                  let color = "#4CAF50";
                  let shape = "rounded-full w-3 h-3";
                  if (v.name.includes("Chicken") || v.name === "Bacon") {
                    color = "#D35400";
                    shape = "rounded-sm w-4 h-3";
                  } else if (v.name === "Pepperoni") {
                    color = "#C0392B";
                    shape = "rounded-full w-4 h-4 border border-[#922B21]";
                  } else if (
                    v.name === "Tomatoes" ||
                    v.name === "Bell Peppers"
                  ) {
                    color = "#E74C3C";
                    shape = "rounded-md w-3 h-4";
                  } else if (v.name === "Olives") {
                    color = "#17202A";
                    shape =
                      "rounded-full w-2 h-2 ring-1 ring-[#566573] ring-inset";
                  } else if (v.name === "Onions") {
                    color = "#D2B4DE";
                    shape = "rounded-full w-4 h-1";
                  } else if (v.name === "Mushrooms") {
                    color = "#D5D8DC";
                    shape = "rounded-t-full w-3 h-3";
                  } else if (v.name === "Sweet Corn") {
                    color = "#F1C40F";
                    shape = "rounded-full w-2 h-2";
                  } else if (v.name === "Jalapenos") {
                    color = "#1E8449";
                    shape =
                      "rounded-full w-3 h-3 ring-1 ring-[#145A32] ring-inset";
                  }

                  return (
                    <div
                      key={i}
                      className={`${shape} shadow-sm`}
                      style={{
                        backgroundColor: color,
                        transform: `rotate(${i * 45}deg)`,
                      }}
                    ></div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 mb-6 text-sm text-[color-mix(in_srgb,var(--theme-text)_80%,transparent)]">
          <div className="flex justify-between items-center pb-3 border-b border-[var(--theme-text)]/5">
            <span className="font-medium text-[color-mix(in_srgb,var(--theme-text)_50%,transparent)]">
              Base:
            </span>
            <span className="font-medium text-right text-[var(--theme-text)]">
              {selectedBase
                ? `${selectedBase.name} (₹${selectedBase.price})`
                : "-"}
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-[var(--theme-text)]/5">
            <span className="font-medium text-[color-mix(in_srgb,var(--theme-text)_50%,transparent)]">
              Sauce:
            </span>
            <span className="font-medium text-right text-[var(--theme-text)]">
              {selectedSauce
                ? `${selectedSauce.name} (₹${selectedSauce.price})`
                : "-"}
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-[var(--theme-text)]/5">
            <span className="font-medium text-[color-mix(in_srgb,var(--theme-text)_50%,transparent)]">
              Cheese:
            </span>
            <span className="font-medium text-right text-[var(--theme-text)]">
              {selectedCheese
                ? `${selectedCheese.name} (₹${selectedCheese.price})`
                : "-"}
            </span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="font-medium text-[color-mix(in_srgb,var(--theme-text)_50%,transparent)]">
              Toppings ({selectedVeggies.length}):
            </span>
            <span
              className="font-medium text-right text-[var(--theme-text)] max-w-[150px] truncate"
              title={selectedVeggies.map((v) => v.name).join(", ")}
            >
              {selectedVeggies.length > 0
                ? selectedVeggies.map((v) => v.name).join(", ")
                : "-"}
            </span>
          </div>
        </div>

        <div className="border-t border-[var(--theme-text)]/10 pt-6 flex justify-between items-end mt-4">
          <span className="font-bold text-sm text-[color-mix(in_srgb,var(--theme-text)_70%,transparent)] mb-1 uppercase tracking-wider">
            Current Pizza
          </span>
          <span className="font-extrabold text-3xl text-[var(--theme-highlight)] tracking-tight">
            ₹{calculateTotal()}
          </span>
        </div>
        {cartItems.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[var(--theme-text)]/10 text-center">
            <div className="text-xs font-bold text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] uppercase tracking-wider mb-1">
              Cart Subtotal
            </div>
            <div className="font-bold text-xl text-[var(--theme-text)]">
              ₹{cartTotal + (editCartItemId ? 0 : calculateTotal())}
            </div>
            <button
              onClick={() => navigate("/summary")}
              className="mt-4 w-full text-xs font-bold uppercase tracking-wider py-2 border border-[var(--theme-highlight)] text-[var(--theme-highlight)] rounded hover:bg-[var(--theme-highlight)] hover:text-black transition"
            >
              View Full Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
