import { create } from "zustand";
import { PRODUCT } from "@/components/product-card/hook/use-product-query";

export interface CartItem extends PRODUCT {
  cartQuantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: PRODUCT) => void;
  deleteFromCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  getItemQuantity: (productId: number) => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  addToCart: (product: PRODUCT) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.cartQuantity < product.quantity) {
        set({
          cart: cart.map((item) =>
            item.id === product.id
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          ),
        });
      }
    } else {
      set({
        cart: [...cart, { ...product, cartQuantity: 1 }],
      });
    }
  },
  removeFromCart: (productId: number) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      if (existingItem.cartQuantity > 1) {
        set({
          cart: cart.map((item) =>
            item.id === productId
              ? { ...item, cartQuantity: item.cartQuantity - 1 }
              : item
          ),
        });
      } else {
        set({
          cart: cart.filter((item) => item.id !== productId),
        });
      }
    }
  },
  deleteFromCart: (productId: number) => {
    const { cart } = get();
    set({
      cart: cart.filter((item) => item.id !== productId),
    });
  },
  getItemQuantity: (productId: number) => {
    const { cart } = get();
    const item = cart.find((i) => i.id === productId);
    return item ? item.cartQuantity : 0;
  },
  getTotalItems: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.cartQuantity, 0);
  },
  clearCart: () => set({ cart: [] }),
}));
