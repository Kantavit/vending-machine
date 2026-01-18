"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold tracking-tight text-blue-600 dark:text-blue-500 sm:text-8xl">
          Blue Vending
        </h1>
        <p className="mt-4 text-2xl font-semibold text-zinc-600 dark:text-zinc-400">
          A Unicorn company selling drinks
        </p>
        <div className="mt-10">
          <button
            onClick={() => router.push("/products")}
            className="rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Start Ordering
          </button>
        </div>
      </main>
    </div>
  );
}
