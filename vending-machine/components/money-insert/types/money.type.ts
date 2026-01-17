export type MONEY = {
  id: number;
  name: string;
  type: "COIN" | "BILL";
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type MoneyStoreType = {
  name: string;
  type: "COIN" | "BILL";
  amount: number;
}
