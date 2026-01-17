import { useMoneyStore } from "../money-insert/store/useMoneyStore";

interface OrderSummaryProps {
  totalPrice: number;
  onPay: () => void;
  isPayEnabled: boolean;
  onBack: () => void;
}

export const OrderSummary = ({
  totalPrice,
  onPay,
  isPayEnabled,
  onBack,
}: OrderSummaryProps) => {
  const { insertedMoney: insertedMoneyItems, clearInsertedMoney } =
    useMoneyStore();

  const insertedMoney = insertedMoneyItems.reduce(
    (acc, item) => acc + Number(item.name) * item.amount,
    0
  );

  const remainingAmount = Math.max(0, totalPrice - insertedMoney);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Order Summary
        </h2>
        <div className="flex justify-between text-lg">
          <span className="text-zinc-600 dark:text-zinc-400">
            Total Amount:
          </span>
          <span className="font-bold text-blue-600 dark:text-blue-500">
            ฿{totalPrice}
          </span>
        </div>
        <div className="mt-4 flex justify-between text-lg border-t border-zinc-100 pt-4 dark:border-zinc-800">
          <span className="text-zinc-600 dark:text-zinc-400">
            Money Received:
          </span>
          <span
            className={`font-bold ${
              insertedMoney >= totalPrice
                ? "text-green-600"
                : "text-zinc-900 dark:text-zinc-100"
            }`}
          >
            ฿{insertedMoney}
          </span>
        </div>
        {remainingAmount > 0 && (
          <div className="mt-2 text-right text-sm text-red-500">
            Remaining: ฿{remainingAmount}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={onPay}
          disabled={!isPayEnabled}
          className={`w-full rounded-xl py-4 text-lg font-bold text-white transition-all ${
            isPayEnabled
              ? "bg-green-600 shadow-lg hover:bg-green-500"
              : "cursor-not-allowed bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-500"
          }`}
        >
          Pay Now
        </button>

        <button
          onClick={() => clearInsertedMoney()}
          className="w-full rounded-xl bg-zinc-200 py-4 text-lg font-bold text-zinc-800 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          Remove inserted money
        </button>
        <button
          onClick={onBack}
          className="w-full rounded-xl bg-zinc-200 py-4 text-lg font-bold text-zinc-800 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
};
