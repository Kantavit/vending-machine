"use client";

import { useMemo } from "react";
import { useProductQuery } from "../../components/product-card/hook/use-product-query";
import { ProductCard } from "@/components/product-card/productCard";
import { useCartStore } from "@/components/product-card/store/useCartStore";
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const { productData } = useProductQuery();
  const router = useRouter();

  const filteredProducts = useMemo(() => {
    if (productData?.data) {
      return productData.data.filter((item) => item.quantity > 0);
    }
    return [];
  }, [productData]);

  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

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
            Products
          </div>
        </header>

        {!productData.isLoading &&
          (filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex h-[50vh] items-center justify-center text-2xl font-semibold text-zinc-500">
              No products available
            </div>
          ))}

        {totalItems > 0 && (
          <div className="fixed bottom-8 right-8 flex items-center gap-4">

            <button className="relative flex items-center justify-center rounded-full bg-white p-4 shadow-lg transition-transform dark:bg-zinc-800" onClick={() => router.push('/products/cart')}>
              <span className="font-bold">🛒 Checkout</span>
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            </button>
           
          </div>
        )}
      </div>
    </div>
  );
}
