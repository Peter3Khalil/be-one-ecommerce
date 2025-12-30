'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CartProduct } from '../types';

interface CartContextType {
  products: CartProduct[];
  count: number;
  subtotal: number;
  isEmpty: boolean;
  // eslint-disable-next-line no-unused-vars
  updateQuantity: (index: number, quantity: number) => void;
  // eslint-disable-next-line no-unused-vars
  removeProduct: (index: number) => void;
  // eslint-disable-next-line no-unused-vars
  addProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cart-products';

const getInitialProducts = (): CartProduct[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }

  return [];
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>(getInitialProducts);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(products));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [products]);

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const isEmpty = products.length === 0;

  const updateQuantity = (index: number, quantity: number) => {
    setProducts((prev) => {
      const newProducts = [...prev];
      newProducts[index].quantity = quantity;
      return newProducts;
    });
  };

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const addProduct = (product: CartProduct) => {
    setProducts((prev) => {
      const index = prev.findIndex((p) => p.variantId === product.variantId);
      if (index === -1) {
        return [...prev, product];
      } else {
        const newProducts = [...prev];
        console.log('before update:', newProducts[index]);
        newProducts[index].quantity += product.quantity;
        console.log('after update:', newProducts[index]);
        return newProducts;
      }
    });
  };

  const clearCart = () => {
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subtotal,
        count: products.length,
        isEmpty,
        updateQuantity,
        removeProduct,
        addProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
