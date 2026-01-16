import React from "react";
import { PRODUCT } from "@/components/product-card/hook/use-product-query";

interface ProductCardProps {
  product: PRODUCT;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props;

  return (
    <div
      key={product.id}
      className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-zinc-900"
    >
      <div className={`h-48 w-full  flex items-center justify-center`}>
        <span className="text-4xl">🥤</span>
      </div>
      <div className="p-6">
        <h3 className="break-words text-xl font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 h-14">
          {product.name}
        </h3>
        <div className="flex flex-col gap-y-3">
          <div className="mt-4 flex items-center justify-between">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-500">
              ฿{product.price}
            </span>
            <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500">
              Buy
            </button>
          </div>
          <div>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Remaining
            </span>{" "}
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {product.quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
