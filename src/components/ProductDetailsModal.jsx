
import { useEffect, useState } from "react";

export default function ProductDetailsModal({ product, onClose, onAddToCart }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFlavour, setSelectedFlavour] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;

    setSelectedOption(product.options?.[0] || null);
    setSelectedFlavour(product.flavours?.[0] || "");
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  // Each option's price is treated as the final unit price.
  const unitPrice = selectedOption?.price ?? product.price;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      product,
      option: selectedOption,
      flavour: selectedFlavour,
      quantity,
      unitPrice,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative bg-[#fffaf4] w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-md text-[#493027] text-2xl flex items-center justify-center hover:bg-[#f5ede3] transition"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2">
          {/* Product image */}
          <div className="relative min-h-[260px] md:min-h-[520px] bg-[#f5ede3]">
            <img
  src={product.image}
  alt={product.name}
  loading="lazy"
  decoding="async"
  className="absolute inset-0 w-full h-full object-cover"
/>

            {product.soldOut && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-white text-[#493027] px-5 py-2 rounded-full font-semibold">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Product information */}
          <div className="p-6 sm:p-9 md:p-10 flex flex-col">
            <span className="text-xs uppercase tracking-[0.18em] text-[#b77a50] font-bold">
              {product.category}
            </span>

            <h2
              id="product-modal-title"
              className="font-display text-3xl sm:text-4xl text-[#493027] mt-3"
            >
              {product.name}
            </h2>

            <p className="text-[#89796e] text-sm leading-7 mt-4">
              {product.description}
            </p>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#493027] mb-2">
                Price
              </p>
              <p className="font-display text-3xl font-bold text-[#b77a50]">
                Rs {unitPrice.toLocaleString("en-PK")}
              </p>
            </div>

            {/* Size / product options */}
            {product.options?.length > 0 && (
              <div className="mt-7">
                <p className="text-sm font-semibold text-[#493027] mb-3">
                  Choose an option
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.options.map((option) => {
                    const active = selectedOption?.name === option.name;

                    return (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setSelectedOption(option)}
                        aria-pressed={active}
                        className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition ${
                          active
                            ? "bg-[#493027] text-white border-[#493027]"
                            : "bg-white text-[#493027] border-[#e6d8c9] hover:border-[#b77a50]"
                        }`}
                      >
                        {option.name} · Rs {option.price.toLocaleString("en-PK")}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Flavour selection */}
            {product.flavours?.length > 0 && (
              <div className="mt-6">
                <label
                  htmlFor="product-flavour"
                  className="block text-sm font-semibold text-[#493027] mb-3"
                >
                  Choose a flavour
                </label>

                <select
                  id="product-flavour"
                  value={selectedFlavour}
                  onChange={(event) => setSelectedFlavour(event.target.value)}
                  className="w-full bg-white border border-[#e6d8c9] rounded-xl px-4 py-3 text-sm text-[#493027] outline-none focus:border-[#b77a50]"
                >
                  {product.flavours.map((flavour) => (
                    <option key={flavour} value={flavour}>
                      {flavour}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-[#493027] mb-3">
                Quantity
              </p>

              <div className="inline-flex items-center border border-[#e6d8c9] bg-white rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="w-11 h-11 text-lg text-[#493027] hover:bg-[#f5ede3] disabled:opacity-40"
                >
                  −
                </button>

                <span className="w-12 text-center font-semibold text-[#493027]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                  className="w-11 h-11 text-lg text-[#493027] hover:bg-[#f5ede3]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="mt-auto pt-8">
              <button
                type="button"
                onClick={handleAdd}
                disabled={product.soldOut}
                className="w-full rounded-full bg-[#493027] text-white py-4 px-6 font-bold text-sm hover:bg-[#302019] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {product.soldOut
                  ? "Currently Sold Out"
                  : `Add to Cart · Rs ${totalPrice.toLocaleString("en-PK")}`}
              </button>

              <p className="text-center text-xs text-[#89796e] mt-3">
                Freshly prepared with care for your order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
