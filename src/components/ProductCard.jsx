
import { ArrowUpRight, ShoppingBag } from "lucide-react";

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
}) {
  return (
    <article className="group bg-white rounded-2xl border border-[#eee3d8] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Product Image */}
      <button
        onClick={() => onViewDetails(product)}
        className="relative block w-full aspect-[4/3] overflow-hidden bg-[#f5ede3] text-left"
        aria-label={`View ${product.name} details`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#493027] text-[10px] uppercase tracking-wider font-bold px-3 py-2 rounded-full">
          {product.category}
        </span>

        {product.soldOut && (
          <span className="absolute inset-0 bg-[#302019]/45 flex items-center justify-center text-white font-semibold tracking-wide">
            SOLD OUT
          </span>
        )}
      </button>

      {/* Product Information */}
      <div className="p-4 sm:p-5">

        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-display text-lg sm:text-xl text-[#493027]">
              {product.name}
            </h3>

            <p className="text-xs text-[#89796e] mt-2 leading-5 line-clamp-2">
              {product.description}
            </p>
          </div>

          <button
            onClick={() => onViewDetails(product)}
            aria-label={`View ${product.name}`}
            className="shrink-0 w-9 h-9 rounded-full border border-[#eee3d8] flex items-center justify-center hover:bg-[#493027] hover:text-white transition"
          >
            <ArrowUpRight size={17} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-[#f1e9e1]">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#89796e]">
              Starting from
            </p>
            <p className="font-semibold text-[#493027] mt-1">
              Rs {product.price.toLocaleString("en-PK")}
            </p>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={product.soldOut}
            className="w-10 h-10 rounded-full bg-[#493027] text-white flex items-center justify-center hover:bg-[#b77a50] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={17} />
          </button>
        </div>

      </div>
    </article>
  );
}
