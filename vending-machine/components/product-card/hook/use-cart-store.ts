import { create } from "zustand";
import { ProductType } from "../types/product.type";

interface CartState {
  productList: ProductType[];
}

interface CartStore {
  state: CartState;
  setProductList: (data: ProductType[]) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  state: {
    productList: [],
  },
  setProductList: (data) => {
    return set((state) => ({ state: { ...state.state, productList: data } }));
  },
}));
