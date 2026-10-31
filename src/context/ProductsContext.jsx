
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import initialProducts from "../data/products";

const ProductsContext = createContext(null);

const STORAGE_KEY = "sweet-crumbs-products";

// Remove products that have duplicate IDs.
function removeDuplicateProducts(products) {
  const seenIds = new Set();

  return products.filter((product) => {
    if (!product || !product.id) {
      return false;
    }

    if (seenIds.has(product.id)) {
      console.warn(
        `Duplicate product removed: ${product.id} - ${product.name}`
      );
      return false;
    }

    seenIds.add(product.id);
    return true;
  });
}

// Load products safely from localStorage.
function getInitialProducts() {
  try {
    const savedProducts = localStorage.getItem(STORAGE_KEY);

    if (savedProducts !== null) {
      const parsedProducts = JSON.parse(savedProducts);

      if (Array.isArray(parsedProducts)) {
        return removeDuplicateProducts(parsedProducts);
      }
    }
  } catch (error) {
    console.error("Could not load saved products:", error);
  }

  return removeDuplicateProducts(initialProducts);
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(getInitialProducts);

  // Save the cleaned product list to localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(products)
      );
    } catch (error) {
      console.error("Could not save products:", error);
    }
  }, [products]);

  // Add a product with a unique ID.
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: `product-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      soldOut: Boolean(product.soldOut),
    };

    setProducts((currentProducts) => [
      newProduct,
      ...currentProducts,
    ]);
  };

  // Update an existing product.
  const updateProduct = (productId, updatedData) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, ...updatedData, id: productId }
          : product
      )
    );
  };

  // Delete a product.
  const deleteProduct = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== productId
      )
    );
  };

  // Toggle product availability.
  const toggleSoldOut = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, soldOut: !product.soldOut }
          : product
      )
    );
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleSoldOut,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductsProvider"
    );
  }

  return context;
}
