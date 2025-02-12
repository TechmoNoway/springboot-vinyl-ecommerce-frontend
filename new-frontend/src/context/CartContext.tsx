import React, { createContext, useReducer, useContext } from 'react';
import { CartItem } from 'types';

// Define action types
type CartAction =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' }; // New action to clear the cart

const CART_EXPIRATION_TIME = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

// Cart reducer function
const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    let newCart: CartItem[];
    switch (action.type) {
        case 'ADD_TO_CART':
            newCart = [...state, action.payload];
            break;
        case 'REMOVE_FROM_CART':
            newCart = state.filter((item) => item.id !== action.payload);
            break;
        case 'UPDATE_QUANTITY':
            newCart = state.map((item) =>
                item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
            );
            break;
        case 'CLEAR_CART':
            newCart = [];
            break;
        default:
            return state;
    }

    // Persist cart and timestamp in local storage
    if (newCart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(newCart));
        localStorage.setItem('cartTimestamp', JSON.stringify(Date.now()));
    } else {
        localStorage.removeItem('cart');
        localStorage.removeItem('cartTimestamp');
    }

    return newCart;
};

// Create context
interface CartContextType {
    cart: CartItem[];
    dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const storedCart = localStorage.getItem('cart');
        const storedTimestamp = localStorage.getItem('cartTimestamp');

        if (storedCart && storedTimestamp) {
            const savedTime = JSON.parse(storedTimestamp);
            if (Date.now() - savedTime > CART_EXPIRATION_TIME) {
                // Cart expired, clear it
                localStorage.removeItem('cart');
                localStorage.removeItem('cartTimestamp');
                return [];
            }
            return JSON.parse(storedCart);
        }
        return [];
    });

    return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
};

// Custom hook to use Cart Context
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
