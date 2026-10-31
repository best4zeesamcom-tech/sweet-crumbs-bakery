
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "sweet-crumbs-cart";

function getSavedCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getSavedCart);

  // Save cart whenever it changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a product or update an existing matching cart item.
  const addItem = (selection) => {
    const { product, option, flavour, quantity, unitPrice } = selection;

    const cartId = [
      product.id,
      option?.name || "Standard",
      flavour || "Standard",
    ].join("::");

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.cartId === cartId
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...currentItems,
        {
          cartId,
          product,
          option,
          flavour,
          quantity,
          unitPrice,
        },
      ];
    });
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (cartId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.cartId !== cartId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  const deliveryFee = subtotal === 0 || subtotal >= 5000 ? 0 : 250;
  const total = subtotal + deliveryFee;

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      subtotal,
      deliveryFee,
      total,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [cartItems, cartCount, subtotal, deliveryFee, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
