import React, { createContext, useReducer, useContext } from 'react';
import { CartItem } from 'types';

// Define action types
type CartAction =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } };

// Cart reducer function
const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    let newCart;
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
        default:
            return state;
    }

    localStorage.setItem('cart', JSON.stringify(newCart)); // Persist cart in local storage
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
        return storedCart ? JSON.parse(storedCart) : [];
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
