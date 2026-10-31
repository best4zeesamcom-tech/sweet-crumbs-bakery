
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

function formatPrice(amount) {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const {
    cartItems,
    subtotal,
    deliveryFee,
    total,
    updateQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/50"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute right-0 top-0 h-full w-full max-w-md bg-[#fffaf4] shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#eee3d8]">
          <div>
            <h2
              id="cart-title"
              className="font-display text-2xl text-[#493027]"
            >
              Your Shopping Bag
            </h2>
            <p className="text-xs text-[#89796e] mt-1">
              {cartItems.length} different {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping cart"
            className="w-10 h-10 rounded-full bg-[#f5ede3] text-[#493027] text-2xl hover:bg-[#e9d9c8]"
          >
            ×
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#f5ede3] flex items-center justify-center text-4xl">
                🛍️
              </div>

              <h3 className="font-display text-2xl text-[#493027] mt-5">
                Your bag is empty
              </h3>

              <p className="text-sm text-[#89796e] mt-2 max-w-xs leading-6">
                Looks like you haven't added any delicious treats yet.
                Let's find something sweet!
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full bg-[#493027] text-white px-6 py-3 text-sm font-semibold hover:bg-[#302019]"
              >
                Explore our treats
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="flex gap-4 pb-5 border-b border-[#eee3d8]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 rounded-2xl object-cover bg-[#f5ede3]"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <h3 className="font-semibold text-sm text-[#493027]">
                        {item.product.name}
                      </h3>

                      <button
                        type="button"
                        onClick={() => removeItem(item.cartId)}
                        aria-label={`Remove ${item.product.name}`}
                        className="text-xs text-[#a66a42] hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-xs text-[#89796e] mt-2">
                      {item.option?.name || "Standard"}
                      {item.flavour ? ` · ${item.flavour}` : ""}
                    </p>

                    <p className="text-sm font-semibold text-[#b77a50] mt-2">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.cartId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-8 h-8 rounded-full border border-[#e6d8c9] text-[#493027] disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="text-sm font-semibold text-[#493027] w-5 text-center">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.cartId, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                        className="w-8 h-8 rounded-full border border-[#e6d8c9] text-[#493027]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#eee3d8] bg-white px-6 py-5">
            <div className="flex justify-between text-sm text-[#89796e]">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-sm text-[#89796e] mt-3">
              <span>Delivery</span>
              <span>
                {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
              </span>
            </div>

            {subtotal > 0 && subtotal < 5000 && (
              <p className="text-xs text-[#b77a50] mt-3">
                Add {formatPrice(5000 - subtotal)} more to get free delivery.
              </p>
            )}

            {subtotal >= 5000 && (
              <p className="text-xs text-green-700 mt-3">
                You've unlocked free delivery!
              </p>
            )}

            <div className="flex justify-between items-center border-t border-[#eee3d8] mt-4 pt-4">
              <span className="font-semibold text-[#493027]">Total</span>
              <span className="font-display text-2xl font-bold text-[#493027]">
                {formatPrice(total)}
              </span>
            </div>

           <button
  type="button"
  onClick={onCheckout}
  className="w-full mt-5 rounded-full bg-[#493027] text-white py-4 text-sm font-bold hover:bg-[#302019] transition"
>
  Proceed to Checkout
</button>

            <p className="text-center text-xs text-[#89796e] mt-3">
              Freshly baked and prepared for your order.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
