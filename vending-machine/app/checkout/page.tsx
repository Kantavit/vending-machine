"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/components/product-card/store/useCartStore";
import { MoneyInsert } from "@/components/money-insert/money-insert";
import { OrderSummary } from "@/components/order-summary/order-summary";
import { useMoneyStore } from "@/components/money-insert/store/useMoneyStore";
import { useProductMutate } from "@/components/product-card/hook/use-product-mutate";
import { useMoneyMutate } from "@/components/money-insert/hook/use-money-mutate";
import { NotificationModal } from "@/components/modal/notification-modal";
import { AxiosError } from "axios";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const { insertedMoney: insertedMoneyItems } = useMoneyStore();

  const { updateProductMutation } = useProductMutate();
  const { updateMoneyAddMutation, moneyReturnChangeMutation } =
    useMoneyMutate();

  const [changeMoney, setChangeMoney] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsError(false);
    setErrorMessage("");
  };

  const insertedMoney = insertedMoneyItems.reduce(
    (acc, item) => acc + Number(item.name) * item.amount,
    0
  );

  // Calculate total price from cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/products");
    }
  }, [cart, router]);

  const handlePayment = async () => {
    try {
      // return money change
      const change_amount = insertedMoney - totalPrice;
      const payloadMoneyChangeData = { change_amount: change_amount };
      const responseMoneyChange = await moneyReturnChangeMutation(
        payloadMoneyChangeData
      );

      // update money quantity
      const payloadMoneyData = insertedMoneyItems.map((item) => {
        return {
          name: item.name,
          amount: item.amount,
        };
      });
      await updateMoneyAddMutation(payloadMoneyData);

      // update product quantity
      const payloadProductData = cart.map((item) => {
        return {
          id: item.id,
          quantity: item.cartQuantity,
        };
      });
      await updateProductMutation(payloadProductData);

      // clear cart
      setChangeMoney(responseMoneyChange.data.changeMoney);
      setIsOpen(true);
      setIsError(false);
    } catch (error: unknown) {
      console.log("Payment Error:", error);
      const axiosError = error as AxiosError<{
        detail?: string;
        message?: string;
      }>;
      setErrorMessage(
        axiosError.response?.data?.detail ||
          axiosError.response?.data?.message ||
          "Error processing payment"
      );
      setIsOpen(true);
      setIsError(true);
    }
  };

  const isPayEnabled = insertedMoney >= totalPrice;

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Checkout
          </h1>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column: Order Summary & Status */}
          <OrderSummary
            totalPrice={totalPrice}
            onPay={handlePayment}
            isPayEnabled={isPayEnabled}
            onBack={() => router.back()}
          />

          {/* Right Column: Money Insertion */}
          <MoneyInsert />
        </div>

        {/* Notification Modal */}
        <NotificationModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          changesTotal={insertedMoney - totalPrice}
          changeMoney={changeMoney}
          clearCart={clearCart}
          isError={isError}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
