"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMoneyStore } from "../money-insert/store/useMoneyStore";

interface Money {
  id?: string;
  name: string;
  type: "COIN" | "BILL";
  amount: number;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  clearCart: () => void;
  changesTotal: number;
  changeMoney: Money[];
  isError?: boolean;
  errorMessage?: string;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  changesTotal,
  changeMoney,
  clearCart,
  isError = false,
  errorMessage,
}) => {
  const router = useRouter();
  const { clearInsertedMoney } = useMoneyStore();

  if (!isOpen) return null;

  if (isError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-all animate-in fade-in duration-200">
        <div className="w-full max-w-sm scale-100 rounded-2xl bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200 dark:bg-zinc-900">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Transaction Failed
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {errorMessage || "An unexpected error occurred."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-zinc-900 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-all animate-in fade-in duration-200">
      <div className="w-full max-w-sm scale-100 rounded-2xl bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Change Returned
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Please collect your change below
          </p>
        </div>

        <div className="mb-6 flex flex-col items-center justify-center rounded-xl bg-zinc-50 py-4 dark:bg-zinc-800/50">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Total Amount
          </span>
          <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            {changesTotal}
          </span>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Money Breakdown
          </h3>
          <div className="max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
            {changeMoney.length > 0 ? (
              <div className="space-y-2">
                {changeMoney.map((money, index) => (
                  <div
                    key={`${money.name}-${money.type}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-zinc-100 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                          money.type === "BILL"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {money.type === "BILL" ? "B" : "C"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {money.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {money.type === "BILL" ? "Bill" : "Coin"}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                      x{money.amount}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-2 text-center text-sm text-zinc-500">
                No change details available.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              router.push("/");
              clearInsertedMoney();
              clearCart();
            }}
            className="w-full rounded-xl bg-zinc-900 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Collect & Close
          </button>
        </div>
      </div>
    </div>
  );
};

