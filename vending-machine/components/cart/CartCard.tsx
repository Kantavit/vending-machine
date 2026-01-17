import React from "react";
import {
  CartItem,
  useCartStore,
} from "@/components/product-card/store/useCartStore";

interface CartCardProps {
  item: CartItem;
}

export const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const { removeFromCart } = useCartStore();

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-zinc-900">
      <div className="flex h-48 w-full items-center justify-center">
        <span className="text-4xl">🥤</span>
      </div>
      <div className="p-6">
        <h3 className="h-14 line-clamp-2 break-words text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {item.name}
        </h3>
        <div className="mt-4 flex flex-col gap-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-500">
              ฿{item.price}
            </span>
            <div className="rounded-full bg-blue-100 px-4 py-2 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xl font-bold">
              {item.cartQuantity}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Subtotal:
              </span>{" "}
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 break-all">
                ฿{item.price * item.cartQuantity}
              </span>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
            >
              Remove 🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
