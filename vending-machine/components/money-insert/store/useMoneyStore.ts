import { create } from "zustand";
import { MoneyStoreType } from "../types/money.type";


interface MoneyStore {
  insertedMoney: MoneyStoreType[]
  setInsertedMoney: (money: MoneyStoreType) => void;
  clearInsertedMoney: () => void;
}

export const useMoneyStore = create<MoneyStore>((set, get) => ({
  insertedMoney: [],
  setInsertedMoney: (money: MoneyStoreType) => {
    const { insertedMoney } = get();
    const existingIndex = insertedMoney.findIndex(
      (data) => data.name === money.name
    );

    if (existingIndex !== -1) {
      const updatedMoney = [...insertedMoney];
      updatedMoney[existingIndex] = {
        ...updatedMoney[existingIndex],
        amount: updatedMoney[existingIndex].amount + 1,
      };
      set({ insertedMoney: updatedMoney });
    } else {
      set({ insertedMoney: [...insertedMoney, { ...money, amount: 1 }] });
    }
  },
  clearInsertedMoney: () => set({ insertedMoney: [] }),
}));
