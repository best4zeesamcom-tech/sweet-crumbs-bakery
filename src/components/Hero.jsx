
import { ArrowRight, Sparkles } from "lucide-react";
import ProductDetailsModal from "../components/ProductDetailsModal";
export default function Hero() {
  return (
    <section
      id="home"
      className="bg-[#f5ede3] overflow-hidden"
    >
      <div className="container-main min-h-[570px] grid md:grid-cols-2 items-center gap-10 py-14 md:py-16">

        {/* Left Content */}
        <div className="max-w-xl order-2 md:order-1">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 text-[#986344] text-xs font-semibold tracking-wide mb-7">
            <Sparkles size={14} />
            FRESHLY BAKED, ALWAYS WITH LOVE
          </div>

          <h2 className="font-display text-[43px] sm:text-[54px] lg:text-[65px] leading-[1.12] font-medium text-[#493027]">
            A little piece of
            <span className="block italic text-[#b77a50]">
              happiness
            </span>
            in every bite.
          </h2>

          <p className="mt-6 text-[#89796e] text-base sm:text-lg leading-8 max-w-md">
            Handcrafted cakes, delicious brownies and sweet
            little moments. Freshly made in our kitchen,
            just for you.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
  href="#products"
  style={{ color: "#FFFFFF", fontWeight: 700 }}
  className="inline-flex items-center gap-3 bg-[#493027] px-7 py-4 rounded-full text-sm hover:bg-[#302019] transition-all"
>
  Explore our treats
  <ArrowRight size={17} />
</a>

            <span className="text-sm text-[#89796e]">
              Made fresh in Rawalpindi
            </span>
          </div>

          <div className="flex gap-9 mt-12 pt-8 border-t border-[#e6d8c9]">
            <div>
              <h3 className="font-display text-2xl text-[#493027]">100%</h3>
              <p className="text-xs text-[#89796e] mt-1">Homemade</p>
            </div>

            <div>
              <h3 className="font-display text-2xl text-[#493027]">Fresh</h3>
              <p className="text-xs text-[#89796e] mt-1">Daily batches</p>
            </div>

            <div>
              <h3 className="font-display text-2xl text-[#493027]">Made</h3>
              <p className="text-xs text-[#89796e] mt-1">With love</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative order-1 md:order-2">

          <div className="absolute -top-5 -right-3 w-32 h-32 rounded-full bg-[#e4c9ad] blur-2xl opacity-60" />

          <div className="relative rounded-[180px_180px_24px_24px] overflow-hidden h-[330px] sm:h-[420px] md:h-[490px] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85"
              alt="Beautiful handcrafted chocolate celebration cake"
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </div>

          <div className="absolute -bottom-5 -left-4 sm:left-0 bg-white rounded-2xl shadow-lg p-4 sm:p-5 max-w-[205px]">
            <p className="text-xs text-[#b77a50] font-semibold tracking-wider uppercase">
              A sweet reminder
            </p>
            <p className="font-display text-lg text-[#493027] mt-2">
              Made with love, served with joy.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
