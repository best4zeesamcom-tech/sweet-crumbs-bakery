import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const BAKERY_WHATSAPP_NUMBER = "923357089076";
// Replace this with the bakery's WhatsApp number.
// Format: country code + number, without + or spaces.
// Example format: 923001234567

function formatPrice(amount) {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

export default function CheckoutModal({ isOpen, onClose }) {
  const { cartItems, subtotal, deliveryFee, total } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;
useEffect(() => {
  if (!isOpen) return;

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleEscape);

  return () => {
    window.removeEventListener("keydown", handleEscape);
  };
}, [isOpen, onClose]);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must contain at least 3 characters.";
    }

    const phone = formData.phone.replace(/[\s-]/g, "");

    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^(\+92|92|0)?3\d{9}$/.test(phone)) {
      newErrors.phone = "Enter a valid Pakistani mobile number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your delivery address.";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a more complete address.";
    }

    if (cartItems.length === 0) {
      newErrors.cart = "Your shopping cart is empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    if (!/^\d{10,15}$/.test(BAKERY_WHATSAPP_NUMBER) ||
        BAKERY_WHATSAPP_NUMBER.includes("X")) {
      alert("Please configure the bakery WhatsApp number in CheckoutModal.jsx first.");
      return;
    }

    const orderItems = cartItems.map((item, index) => {
      return (
        `${index + 1}. ${item.product.name}\n` +
        `   Option: ${item.option?.name || "Standard"}\n` +
        `   Flavour: ${item.flavour || "Standard"}\n` +
        `   Quantity: ${item.quantity}\n` +
        `   Unit price: ${formatPrice(item.unitPrice)}\n` +
        `   Item total: ${formatPrice(item.unitPrice * item.quantity)}`
      );
    }).join("\n\n");

    const message = [
      "🍰 *NEW ORDER - SWEET CRUMBS BAKERY*",
      "",
      "*CUSTOMER DETAILS*",
      `Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Address: ${formData.address.trim()}`,
      "",
      "*ORDER DETAILS*",
      orderItems,
      "",
      "*PAYMENT SUMMARY*",
      `Subtotal: ${formatPrice(subtotal)}`,
      `Delivery: ${deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}`,
      `TOTAL: ${formatPrice(total)}`,
      "",
      `Note: ${formData.note.trim() || "No additional note"}`,
      "",
      "Thank you for choosing Sweet Crumbs Bakery! ❤️",
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${BAKERY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#fffaf4] rounded-3xl shadow-2xl"
      >
        <div className="sticky top-0 z-10 bg-[#fffaf4] border-b border-[#eee3d8] px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.18em] font-bold text-[#b77a50]">
              Almost there
            </span>
            <h2
              id="checkout-title"
              className="font-display text-2xl sm:text-3xl text-[#493027] mt-1"
            >
              Complete your order
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="w-10 h-10 rounded-full bg-[#f5ede3] text-[#493027] text-2xl hover:bg-[#e9d9c8]"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {/* Customer information */}
          <h3 className="font-semibold text-[#493027] mb-5">
            Delivery information
          </h3>

          <div className="space-y-5">
            <div>
              <label htmlFor="customer-name" className="block text-sm font-medium text-[#493027] mb-2">
                Full name *
              </label>
              <input
                id="customer-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="w-full rounded-xl border border-[#e6d8c9] bg-white px-4 py-3 text-sm text-[#493027] outline-none focus:border-[#b77a50]"
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-red-600 mt-2">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="customer-phone" className="block text-sm font-medium text-[#493027] mb-2">
                Phone number *
              </label>
              <input
                id="customer-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="03XX XXXXXXX"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="w-full rounded-xl border border-[#e6d8c9] bg-white px-4 py-3 text-sm text-[#493027] outline-none focus:border-[#b77a50]"
              />
              {errors.phone && (
                <p id="phone-error" className="text-xs text-red-600 mt-2">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="customer-address" className="block text-sm font-medium text-[#493027] mb-2">
                Delivery address *
              </label>
              <textarea
                id="customer-address"
                name="address"
                rows={3}
                autoComplete="street-address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House number, street, area and city"
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? "address-error" : undefined}
                className="w-full resize-y rounded-xl border border-[#e6d8c9] bg-white px-4 py-3 text-sm text-[#493027] outline-none focus:border-[#b77a50]"
              />
              {errors.address && (
                <p id="address-error" className="text-xs text-red-600 mt-2">
                  {errors.address}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="customer-note" className="block text-sm font-medium text-[#493027] mb-2">
                Additional note <span className="text-[#89796e] font-normal">(Optional)</span>
              </label>
              <textarea
                id="customer-note"
                name="note"
                rows={2}
                value={formData.note}
                onChange={handleChange}
                placeholder="Any special instructions for your order?"
                className="w-full resize-y rounded-xl border border-[#e6d8c9] bg-white px-4 py-3 text-sm text-[#493027] outline-none focus:border-[#b77a50]"
              />
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-8 bg-[#f5ede3] rounded-2xl p-5">
            <h3 className="font-semibold text-[#493027] mb-4">
              Your order summary
            </h3>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.cartId} className="flex justify-between gap-4 text-sm">
                  <div className="min-w-0">
                    <p className="text-[#493027] font-medium">
                      {item.product.name} × {item.quantity}
                    </p>
                    <p className="text-xs text-[#89796e] mt-1">
                      {item.option?.name || "Standard"}
                      {item.flavour ? ` · ${item.flavour}` : ""}
                    </p>
                  </div>

                  <span className="text-[#493027] font-medium whitespace-nowrap">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#e6d8c9] mt-5 pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-[#89796e]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-[#89796e]">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[#e6d8c9]">
                <span className="font-bold text-[#493027]">Total</span>
                <span className="font-display text-2xl font-bold text-[#493027]">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>

          {errors.cart && (
            <p className="text-sm text-red-600 mt-4">{errors.cart}</p>
          )}

          <button
            type="submit"
            disabled={cartItems.length === 0}
            className="w-full mt-7 rounded-full bg-[#493027] text-white py-4 px-6 font-bold text-sm hover:bg-[#302019] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send order on WhatsApp
          </button>

          <p className="text-center text-xs text-[#89796e] mt-3 leading-5">
            Your order details will open in WhatsApp for you to review and send.
          </p>
        </form>
      </div>
    </div>
  );
}
