
import { useState } from "react";
import {
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";

export default function Navbar({
  cartCount = 0,
  onCartClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fffaf4]/95 backdrop-blur-md border-b border-[#eee3d8]">

      <div className="container-main h-[76px] flex items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2"
          onClick={closeMenu}
        >
          <div className="w-10 h-10 rounded-full bg-[#493027] text-[#fffaf4] flex items-center justify-center font-display text-xl">
            S
          </div>

          <div>
            <h1 className="font-display text-xl font-semibold leading-tight">
              Sweet Crumbs
            </h1>

            <p className="text-[9px] tracking-[3px] uppercase text-[#b77a50]">
              Homemade with love
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-[#655249]">

          <a
            href="#home"
            className="hover:text-[#b77a50] transition"
          >
            Home
          </a>

          <a
            href="#products"
            className="hover:text-[#b77a50] transition"
          >
            Our Bakery
          </a>

          <a
            href="#about"
            className="hover:text-[#b77a50] transition"
          >
            Our Story
          </a>

          <a
            href="#contact"
            className="hover:text-[#b77a50] transition"
          >
            Contact
          </a>

        </nav>

        {/* Navbar Actions */}
        <div className="flex items-center gap-3">

          {/* Cart Button */}
          <button
            type="button"
            onClick={onCartClick}
            aria-label={`Open shopping cart, ${cartCount} items`}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f5ede3] transition"
          >
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#b77a50] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f5ede3] transition"
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-[#fffaf4] border-t border-[#eee3d8] px-6 py-5 flex flex-col gap-5 text-sm font-medium text-[#655249]">

          <a
            href="#home"
            onClick={closeMenu}
            className="hover:text-[#b77a50]"
          >
            Home
          </a>

          <a
            href="#products"
            onClick={closeMenu}
            className="hover:text-[#b77a50]"
          >
            Our Bakery
          </a>

          <a
            href="#about"
            onClick={closeMenu}
            className="hover:text-[#b77a50]"
          >
            Our Story
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
            className="hover:text-[#b77a50]"
          >
            Contact
          </a>

        </nav>
      )}

    </header>
  );
}
