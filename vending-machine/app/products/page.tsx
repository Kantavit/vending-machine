"use client";

import { useProductQuery } from "../../components/product-card/hook/use-product-query";
import { ProductCard } from "@/components/product-card/productCard";
import Link from "next/link";

export default function ProductsPage() {
  const { productData } = useProductQuery();

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-500"
          >
            Blue Vending
          </Link>
          <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Products
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productData.data &&
            productData.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
