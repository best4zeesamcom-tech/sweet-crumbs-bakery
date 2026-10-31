
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";

import {
  CartProvider,
  useCart,
} from "./context/CartContext";

import { ProductsProvider } from "./context/ProductsContext";

function StoreLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { cartCount, total } = useCart();

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fffaf4] pb-6 md:pb-0">

      {/* Navbar */}
      <Navbar
        cartCount={cartCount}
        onCartClick={openCart}
      />

      {/* Homepage */}
      <Home />

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Cart */}
      {cartCount > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-[#eee3d8] shadow-[0_-4px_20px_rgba(73,48,39,0.10)]"
          style={{
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="px-4 py-3 flex items-center gap-3">

            {/* Cart Information */}
            <div className="flex items-center gap-3 flex-1 min-w-0">

              <div className="relative w-11 h-11 rounded-full bg-[#f5ede3] flex items-center justify-center shrink-0">
                <ShoppingBag
                  size={21}
                  className="text-[#493027]"
                />

                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#b77a50] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-[#89796e]">
                  {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
                </p>

                <p className="font-bold text-[#493027] text-base">
                  Rs. {Number(total || 0).toLocaleString("en-PK")}
                </p>
              </div>

            </div>

            {/* View Cart Button */}
            <button
              type="button"
              onClick={openCart}
              className="flex items-center justify-center gap-2 bg-[#493027] text-white px-5 py-3.5 rounded-full text-sm font-semibold hover:bg-[#b77a50] active:scale-95 transition shrink-0"
              aria-label="View shopping cart"
            >
              View Cart
              <ArrowRight size={16} />
            </button>

          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={openCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<StoreLayout />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
