import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  imageColor: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Cola", price: 20, imageColor: "bg-red-500" },
  { id: 2, name: "Pepsi", price: 20, imageColor: "bg-blue-600" },
  { id: 3, name: "Soda", price: 15, imageColor: "bg-green-500" },
  { id: 4, name: "Water", price: 10, imageColor: "bg-blue-200" },
  { id: 5, name: "Tea", price: 25, imageColor: "bg-amber-100" },
  { id: 6, name: "Coffee", price: 30, imageColor: "bg-amber-700" },
  { id: 7, name: "Orange Juice", price: 25, imageColor: "bg-orange-400" },
  { id: 8, name: "Milk", price: 20, imageColor: "bg-slate-100" },
  { id: 9, name: "Energy Drink", price: 40, imageColor: "bg-yellow-400" },
];

export default function ProductsPage() {
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
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-zinc-900"
            >
              <div className={`h-48 w-full ${product.imageColor} flex items-center justify-center`}>
                <span className="text-4xl">🥤</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {product.name}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-500">
                    ฿{product.price}
                  </span>
                  <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
