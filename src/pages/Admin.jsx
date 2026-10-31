
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

const categories = ["Cakes", "Cupcakes", "Brownies", "Cookies"];

const emptyForm = {
  name: "",
  category: "Cakes",
  description: "",
  image: "",
  price: "",
  soldOut: false,
  options: [],
  flavours: [],
  optionText: "",
  flavourText: "",
};

function Admin() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleSoldOut,
  } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const availableProducts = products.filter(
    (product) => !product.soldOut
  ).length;

  const soldOutProducts = products.filter(
    (product) => product.soldOut
  ).length;

  const categoryCount = new Set(
    products.map((product) => product.category)
  ).size;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name || "",
      category: product.category || "Cakes",
      description: product.description || "",
      image: product.image || "",
      price: String(product.price ?? ""),
      soldOut: Boolean(product.soldOut),
      options: product.options || [],
      flavours: product.flavours || [],
      optionText: (product.options || [])
        .map((option) => `${option.name}: ${option.price}`)
        .join("\n"),
      flavourText: (product.flavours || []).join(", "),
    });

    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const price = Number(form.price);

    if (!form.name.trim()) {
      alert("Please enter a product name.");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter a product description.");
      return;
    }

    if (!form.image.trim()) {
      alert("Please enter a product image URL.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      alert("Please enter a valid product price.");
      return;
    }

    const options = form.optionText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.lastIndexOf(":");

        if (separatorIndex === -1) {
          return null;
        }

        const name = line.slice(0, separatorIndex).trim();
        const optionPrice = Number(
          line.slice(separatorIndex + 1).trim()
        );

        if (
          !name ||
          !Number.isFinite(optionPrice) ||
          optionPrice <= 0
        ) {
          return null;
        }

        return { name, price: optionPrice };
      });

    if (options.some((option) => option === null)) {
      alert(
        "Please check your options. Use one option per line, for example: Small: 1200"
      );
      return;
    }

    const flavours = form.flavourText
      .split(",")
      .map((flavour) => flavour.trim())
      .filter(Boolean);

    const productData = {
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      image: form.image.trim(),
      price,
      soldOut: form.soldOut,
      options,
      flavours,
    };

    if (editingId) {
      updateProduct(editingId, productData);
      alert("Product updated successfully!");
    } else {
      addProduct(productData);
      alert("Product added successfully!");
    }

    closeForm();
  };

  const handleDelete = (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (confirmed) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#493027]">

      {/* Header */}
      <header className="bg-white border-b border-[#eee3d7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4">

          <div>
            <p className="text-xs uppercase tracking-[3px] text-[#b77a50] font-bold">
              Sweet Crumbs Bakery
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold mt-1">
              Admin Dashboard
            </h1>
          </div>

          <Link
            to="/"
            className="bg-[#493027] text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-[#b77a50] transition"
          >
            View Store →
          </Link>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-10">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-xl font-bold">
            Welcome back, Admin!
          </h2>

          <p className="text-sm text-[#89796e] mt-2">
            Manage your bakery products and inventory from here.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <StatCard
            title="Total Products"
            value={products.length}
            description="Products in your catalogue"
          />

          <StatCard
            title="Available Products"
            value={availableProducts}
            description="Currently available"
          />

          <StatCard
            title="Sold Out"
            value={soldOutProducts}
            description="Unavailable products"
          />

          <StatCard
            title="Categories"
            value={categoryCount}
            description="Active product categories"
          />

        </div>

        {/* Product Management */}
        <section className="bg-white rounded-2xl border border-[#eee3d7] shadow-sm overflow-hidden">

          <div className="p-5 sm:p-7 border-b border-[#eee3d7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold">
                Product Management
              </h2>

              <p className="text-sm text-[#89796e] mt-1">
                Add, update and manage your bakery products.
              </p>
            </div>

            <button
              onClick={openAddForm}
              className="bg-[#493027] text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-[#b77a50] transition"
            >
              + Add New Product
            </button>

          </div>

          {/* Search and Filters */}
          <div className="p-5 sm:p-7 flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full sm:flex-1 border border-[#e9ddd1] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#b77a50]"
            />

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className="border border-[#e9ddd1] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#b77a50] bg-white"
            >
              <option value="All">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">

            <table className="w-full text-left min-w-[850px]">

              <thead className="bg-[#faf6f0] text-xs uppercase tracking-wider text-[#89796e]">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eee3d7]">

                {filteredProducts.map((product) => (
                  <tr key={product.id}>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">

                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="w-14 h-14 rounded-xl object-cover bg-[#f5ede3]"
                        />

                        <div>
                          <p className="font-semibold text-sm">
                            {product.name}
                          </p>

                          <p className="text-xs text-[#89796e] mt-1">
                            {product.id}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {product.category}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold">
                      Rs. {Number(product.price).toLocaleString("en-PK")}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          product.soldOut
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.soldOut ? "Sold Out" : "Available"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">

                        <button
                          onClick={() => openEditForm(product)}
                          className="px-3 py-2 rounded-lg bg-[#f5ede3] text-[#493027] text-xs font-semibold hover:bg-[#ead9c8]"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => toggleSoldOut(product.id)}
                          className="px-3 py-2 rounded-lg bg-amber-50 text-amber-800 text-xs font-semibold hover:bg-amber-100"
                        >
                          {product.soldOut ? "Available" : "Sold Out"}
                        </button>

                        <button
                          onClick={() => handleDelete(product)}
                          className="px-3 py-2 rounded-lg bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-12 text-sm text-[#89796e]"
                    >
                      No products found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          <div className="px-6 py-4 border-t border-[#eee3d7] text-xs text-[#89796e]">
            Showing {filteredProducts.length} of {products.length} products
          </div>

        </section>

      </main>

      {/* Add / Edit Product Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeForm();
            }
          }}
        >
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">

            <div className="sticky top-0 bg-white border-b border-[#eee3d7] px-6 py-5 flex items-center justify-between z-10">

              <div>
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h2>

                <p className="text-xs text-[#89796e] mt-1">
                  Enter your bakery product information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="text-2xl text-[#89796e] hover:text-[#493027]"
                aria-label="Close form"
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Product Name *
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Chocolate Fudge Cake"
                  required
                  className="admin-input"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category *
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="admin-input bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Base Price (PKR) *
                  </label>

                  <input
                    name="price"
                    type="number"
                    min="1"
                    step="1"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="2500"
                    required
                    className="admin-input"
                  />
                </div>

              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Product Image URL *
                </label>

                <input
                  name="image"
                  type="url"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/cake.jpg"
                  required
                  className="admin-input"
                />

                {form.image && (
                  <img
                    src={form.image}
                    alt="Product preview"
                    className="mt-3 w-32 h-32 object-cover rounded-xl bg-[#f5ede3]"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    onLoad={(event) => {
                      event.currentTarget.style.display = "block";
                    }}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe your delicious bakery product..."
                  required
                  className="admin-input resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Size Options
                </label>

                <textarea
                  name="optionText"
                  value={form.optionText}
                  onChange={handleChange}
                  rows="3"
                  placeholder={"Small: 1200\nMedium: 2000\nLarge: 3000"}
                  className="admin-input resize-y"
                />

                <p className="text-xs text-[#89796e] mt-2">
                  Enter one option per line using: Size: Price.
                  Leave empty if the product has no size options.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Available Flavours
                </label>

                <input
                  name="flavourText"
                  value={form.flavourText}
                  onChange={handleChange}
                  placeholder="Chocolate, Vanilla, Strawberry"
                  className="admin-input"
                />

                <p className="text-xs text-[#89796e] mt-2">
                  Separate flavours using commas.
                </p>
              </div>

              <label className="flex items-center gap-3 text-sm font-medium">
                <input
                  type="checkbox"
                  name="soldOut"
                  checked={form.soldOut}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#493027]"
                />
                Mark this product as sold out
              </label>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[#eee3d7]">

                <button
                  type="button"
                  onClick={closeForm}
                  className="px-6 py-3 rounded-full border border-[#e9ddd1] text-sm font-semibold hover:bg-[#faf6f0]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#493027] text-white text-sm font-semibold hover:bg-[#b77a50] transition"
                >
                  {editingId ? "Save Changes" : "Add Product"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

function StatCard({ title, value, description }) {
  return (
    <div className="bg-white rounded-2xl border border-[#eee3d7] p-6 shadow-sm">
      <p className="text-sm text-[#89796e] font-medium">
        {title}
      </p>

      <h3 className="text-3xl font-bold text-[#493027] mt-3">
        {value}
      </h3>

      <p className="text-xs text-[#a18d7e] mt-2">
        {description}
      </p>
    </div>
  );
}

export default Admin;
