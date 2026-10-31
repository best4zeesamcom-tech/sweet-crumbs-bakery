
const categories = [
  "All",
  "Cakes",
  "Cupcakes",
  "Brownies",
  "Cookies",
];

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            aria-pressed={active}
            className={`shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all ${
              active
                ? "bg-[#493027] text-white shadow-md"
                : "bg-white border border-[#eee3d8] text-[#655249] hover:border-[#b77a50] hover:text-[#b77a50]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
