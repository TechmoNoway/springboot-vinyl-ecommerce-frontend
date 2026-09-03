import React, { createContext, useReducer, useContext, useState } from "react";
import { CartItem, IProduct } from "types";

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: IProduct; quantity?: number } }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

const CART_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  let newCart: CartItem[];

  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity = 1 } = action.payload;
      const existing = state.find((item) => item.id === product.id);
      if (existing) {
        newCart = state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...state, { ...product, quantity }];
      }
      break;
    }
    case "REMOVE_FROM_CART":
      newCart = state.filter((item) => item.id !== action.payload);
      break;
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        newCart = state.filter((item) => item.id !== action.payload.id);
      } else {
        newCart = state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      break;
    case "CLEAR_CART":
      newCart = [];
      break;
    default:
      return state;
  }

  if (newCart.length > 0) {
    localStorage.setItem("33rpm_cart", JSON.stringify(newCart));
    localStorage.setItem("33rpm_cart_ts", JSON.stringify(Date.now()));
  } else {
    localStorage.removeItem("33rpm_cart");
    localStorage.removeItem("33rpm_cart_ts");
    localStorage.removeItem("voc_cart");
    localStorage.removeItem("voc_cart_ts");
  }

  return newCart;
};

interface CartContextType {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  totalItems: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (product: IProduct, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const stored =
        localStorage.getItem("33rpm_cart") ||
        localStorage.getItem("voc_cart") ||
        localStorage.getItem("cart");
      const ts =
        localStorage.getItem("33rpm_cart_ts") ||
        localStorage.getItem("voc_cart_ts") ||
        localStorage.getItem("cartTimestamp");
      if (stored && ts) {
        const savedTime = JSON.parse(ts);
        if (Date.now() - savedTime < CART_EXPIRATION_TIME) {
          return JSON.parse(stored);
        }
      }
    } catch (e) {
      console.error("Failed to parse cart storage:", e);
    }
    return [];
  });

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const addToCart = (product: IProduct, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    openDrawer();
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
        totalItems,
        totalPrice,
        isDrawerOpen,
        setIsDrawerOpen,
        openDrawer,
        closeDrawer,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
