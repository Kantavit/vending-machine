import { useMoneyStore } from "./store/useMoneyStore";

const COINS = [1, 5, 10];
const BILLS = [20, 50, 100, 500, 1000];

export const MoneyInsert = () => {
  const { setInsertedMoney } = useMoneyStore();

  const handleInsert = (value: number, type: "COIN" | "BILL") => {
    setInsertedMoney({
      name: value.toString(),
      type,
      amount: 1,
    });
  };

  return (
    <div className="space-y-8">
      {/* Coins */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
          Insert Coins
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {COINS.map((value) => (
            <button
              key={`coin-${value}`}
              onClick={() => handleInsert(value, "COIN")}
              className="aspect-square rounded-full border-4 border-zinc-200 bg-zinc-100 text-xl font-bold text-zinc-600 shadow-sm transition-transform active:scale-95 hover:border-blue-400 hover:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-blue-500"
            >
              ฿{value}
            </button>
          ))}
        </div>
      </div>

      {/* Bills */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
          Insert Bills
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {BILLS.map((value) => (
            <button
              key={`bill-${value}`}
              onClick={() => handleInsert(value, "BILL")}
              className="h-20 rounded-lg border-2 border-zinc-200 bg-green-50 text-xl font-bold text-green-700 shadow-sm transition-transform active:scale-95 hover:border-green-400 hover:bg-green-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-green-500 dark:hover:border-green-600"
            >
              ฿{value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
