import { create } from "zustand";
import { PRODUCT } from "./use-product-query";

interface CartState {
  productList: PRODUCT[];
}

interface CartStore {
  state: CartState;
  setProductList: (data: PRODUCT[]) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  state: {
    productList: [],
  },
  setProductList: (data) => {
    return set((state) => ({ state: { ...state.state, productList: data } }));
  },
}));
