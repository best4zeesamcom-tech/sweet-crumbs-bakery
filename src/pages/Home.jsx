
import { useMemo, useState } from "react";
import { ArrowRight, Heart, MapPin, Clock } from "lucide-react";

import ProductDetailsModal from "../components/ProductDetailsModal";
import Hero from "../components/Hero";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";

import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";

export default function Home() {
  const { addItem } = useCart();
  const { products } = useProducts();

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter(
      (product) => product.category === activeCategory
    );
  }, [activeCategory, products]);

  // Open product details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  // Add selected product configuration to cart
  const handleModalAddToCart = (selection) => {
    addItem(selection);
    setSelectedProduct(null);
  };

  // Open product modal when clicking Add to Cart
  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Trust Information */}
      <section className="bg-[#493027] text-[#fffaf4] py-5">
        <div className="container-main grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">

          <div className="flex items-center justify-center gap-3">
            <Heart size={19} className="text-[#d7a77f]" />
            <span className="text-xs sm:text-sm">
              Made with love
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Clock size={19} className="text-[#d7a77f]" />
            <span className="text-xs sm:text-sm">
              Freshly prepared
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <MapPin size={19} className="text-[#d7a77f]" />
            <span className="text-xs sm:text-sm">
              Rawalpindi & Islamabad
            </span>
          </div>

        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section-padding">
        <div className="container-main">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#b77a50] uppercase tracking-[3px] text-xs font-bold">
              A little sweetness
            </span>

            <h2 className="font-display text-4xl sm:text-5xl text-[#493027] mt-4">
              Our delicious treats
            </h2>

            <p className="text-[#89796e] mt-4 leading-7 text-sm sm:text-base">
              From celebration cakes to everyday little treats,
              discover something delicious in every bite.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-10">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                  onAddToCart={handleAddToCart}
                />
              ))}

            </div>
          ) : (
            <p className="text-center text-[#89796e] py-12">
              No products found in this category.
            </p>
          )}

          <div className="text-center mt-12">
            <p className="text-sm text-[#89796e]">
              Showing {filteredProducts.length} delicious treats
            </p>
          </div>

        </div>
      </section>

      {/* Promotional Section */}
      <section className="bg-[#f5ede3] py-16 sm:py-20">
        <div className="container-main grid md:grid-cols-2 items-center gap-10">

          <div>
            <span className="text-xs uppercase tracking-[3px] font-bold text-[#b77a50]">
              Something special
            </span>

            <h2 className="font-display text-4xl sm:text-5xl text-[#493027] leading-tight mt-5">
              Every celebration deserves a beautiful cake.
            </h2>

            <p className="text-[#89796e] leading-7 mt-5 max-w-md">
              Make birthdays, family gatherings and special
              moments even sweeter with our freshly prepared
              handcrafted cakes.
            </p>

            <a
              style={{ color: "#FFFFFF", fontWeight: 700 }}
              href="#products"
              className="inline-flex items-center gap-3 bg-[#493027] text-white px-7 py-4 rounded-full mt-8 text-sm font-semibold hover:bg-[#b77a50] transition"
            >
              Find your favourite
              <ArrowRight size={17} />
            </a>
          </div>

          <div className="h-[320px] sm:h-[400px] rounded-[24px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1000&q=85"
              alt="Beautiful celebration cake"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container-main max-w-3xl text-center">

          <span className="text-xs uppercase tracking-[3px] font-bold text-[#b77a50]">
            Our little story
          </span>

          <h2 className="font-display text-4xl sm:text-5xl text-[#493027] mt-5">
            Baked with heart, shared with happiness.
          </h2>

          <p className="text-[#89796e] leading-8 mt-6">
            At Sweet Crumbs Bakery, we believe the sweetest
            memories are made around good food. Our little
            home bakery brings together delicious recipes,
            thoughtful ingredients and a whole lot of love
            to make your everyday moments special.
          </p>

          <div className="mt-8 text-[#b77a50] font-display italic text-xl">
            A little sweetness goes a long way.
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#f5ede3] py-12">
        <div className="container-main text-center">

          <h2 className="font-display text-3xl text-[#493027]">
            Have something sweet in mind?
          </h2>

          <p className="text-[#89796e] text-sm mt-3">
            Browse our treats and prepare your order online.
          </p>

          <a
            href="#products"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#b77a50] hover:text-[#493027] transition"
          >
            Explore our collection
            <ArrowRight size={16} />
          </a>

        </div>
      </section>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleModalAddToCart}
      />

    </main>
  );
}
