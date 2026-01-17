"use client";

import React from "react";
import { useCartStore } from "@/components/product-card/store/useCartStore";
import { useRouter } from "next/navigation";
import { CartCard } from "@/components/cart/CartCard";

export default function CartPage() {
  const { cart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const router = useRouter();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-500"
          >
            Blue Vending
          </button>
          <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Cart ({totalItems} items)
          </div>
        </header>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cart.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-zinc-500">
            <span className="text-6xl">🛒</span>
            <span className="text-2xl font-semibold">Your cart is empty</span>
            <button
              onClick={() => router.push("/products")}
              className="mt-4 rounded-full bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-colors hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              Back to Products
            </button>
          </div>
        )}

        {cart.length > 0 && (
          <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 rounded-xl bg-white/90 p-6 shadow-2xl backdrop-blur-sm dark:bg-zinc-900/90">
            <div className="flex items-center gap-4 text-xl">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Total:</span>
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-500">
                ฿{totalPrice}
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/products")}
                className="rounded-full bg-zinc-200 px-6 py-3 font-bold text-zinc-800 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                Back to Product
              </button>
              <button 
                onClick={() => router.push("/checkout")}
                className="rounded-full bg-blue-600 px-8 py-3 font-bold text-white shadow-lg transition-colors hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
