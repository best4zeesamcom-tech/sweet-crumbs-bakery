
import {
  MapPin,
  Heart,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  CakeSlice,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#302019] text-[#fffaf4]">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-main py-14 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-lg">
            <span className="text-[#d5a078] text-xs font-semibold uppercase tracking-[0.2em]">
              A little sweetness in your inbox
            </span>
            <h2 className="font-display text-3xl md:text-4xl mt-3">
              Stay in the loop, stay sweet.
            </h2>
            <p className="text-[#d7c5b8] text-sm mt-3 leading-6">
              Get updates on fresh bakes, seasonal treats and special offers.
            </p>
          </div>

          <form
            className="flex w-full md:max-w-md bg-white rounded-full p-1.5"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for your interest! Newsletter signup will be available soon.");
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="min-w-0 flex-1 px-4 py-3 text-sm text-[#493027] outline-none bg-transparent"
            />
            <button
              type="submit"
              className="shrink-0 bg-[#b77a50] hover:bg-[#a66a42] text-white rounded-full px-5 py-3 text-sm font-semibold transition-colors flex items-center gap-2"
            >
              Join <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-main py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div>
            <a href="#home" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#b77a50] flex items-center justify-center">
                <CakeSlice size={21} />
              </div>
              <span className="font-display text-2xl font-bold">
                Sweet Crumbs<span className="text-[#d5a078]">.</span>
              </span>
            </a>

            <p className="mt-5 text-sm text-[#d7c5b8] leading-7 max-w-xs">
              From celebration cakes to little everyday treats, we bake
              happiness into every bite. Freshly made, beautifully served.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="#contact"
                className="px-4 py-2 rounded-full border border-white/15 text-xs hover:bg-[#b77a50] hover:border-[#b77a50] transition-all"
              >
                Instagram
              </a>
              <a
                href="#contact"
                className="px-4 py-2 rounded-full border border-white/15 text-xs hover:bg-[#b77a50] hover:border-[#b77a50] transition-all"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-base mb-6">Explore</h3>
            <ul className="space-y-4 text-sm text-[#d7c5b8]">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Our Bakery</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-base mb-6">Our Treats</h3>
            <ul className="space-y-4 text-sm text-[#d7c5b8]">
              <li><a href="#products" className="hover:text-white transition-colors">Celebration Cakes</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Cupcakes</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Brownies</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-6">Get in Touch</h3>

            <div className="space-y-5 text-sm text-[#d7c5b8]">
              <div className="flex gap-3 items-start">
                <MapPin size={18} className="text-[#d5a078] shrink-0 mt-0.5" />
                <p>Rawalpindi, Pakistan</p>
              </div>

              <div className="flex gap-3 items-center">
                <Phone size={18} className="text-[#d5a078] shrink-0" />
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact for orders
                </a>
              </div>

              <div className="flex gap-3 items-center">
                <Mail size={18} className="text-[#d5a078] shrink-0" />
                <a href="#contact" className="hover:text-white transition-colors">
                  Send us a message
                </a>
              </div>

              <div className="flex gap-3 items-center">
                <Clock size={18} className="text-[#d5a078] shrink-0" />
                <p>Freshly baked with love</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-14 pt-7 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#bba99d]">
          <p>
            © {new Date().getFullYear()} Sweet Crumbs Bakery. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            Made with <Heart size={13} className="text-[#d5a078] fill-[#d5a078]" /> and a little extra sweetness.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
