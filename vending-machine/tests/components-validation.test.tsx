import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "../components/product-card/productCard";
import { CartCard } from "../components/cart/CartCard";
import { OrderSummary } from "../components/order-summary/order-summary";
import { MoneyInsert } from "../components/money-insert/money-insert";
import { NotificationModal } from "../components/modal/notification-modal";

// Mock hooks
jest.mock("../components/product-card/store/useCartStore", () => ({
  useCartStore: () => ({
    addToCart: jest.fn(),
    getItemQuantity: () => 1,
    removeFromCart: jest.fn(),
  }),
}));

jest.mock("../components/money-insert/store/useMoneyStore", () => ({
  useMoneyStore: () => ({
    insertedMoney: [
      { name: "10", type: "COIN", amount: 2 }, // Total 20
    ],
    setInsertedMoney: jest.fn(),
    clearInsertedMoney: jest.fn(),
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Component Rendering Tests", () => {
    
  test("ProductCard renders correctly", () => {
    const mockProduct = {
      id: 1,
      name: "Test Product",
      price: 100,
      image: "",
      quantity: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeDefined();
    expect(screen.getByText("฿100")).toBeDefined();
    expect(screen.getByText("Buy")).toBeDefined();
  });

  test("CartCard renders correctly", () => {
    const mockItem = {
      id: 1,
      name: "Test Cart Item",
      price: 50,
      image: "",
      quantity: 10,
      cartQuantity: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    render(<CartCard item={mockItem} />);
    expect(screen.getByText("Test Cart Item")).toBeDefined();
    expect(screen.getByText("฿50")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined(); // Quantity
  });

  test("OrderSummary renders correctly", () => {
    render(
      <OrderSummary
        totalPrice={100}
        onPay={jest.fn()}
        isPayEnabled={true}
        onBack={jest.fn()}
      />
    );
    expect(screen.getByText("Order Summary")).toBeDefined();
    expect(screen.getByText("Total Amount:")).toBeDefined();
    expect(screen.getByText("฿100")).toBeDefined();
    // Inserted money is mocked as 20 (10 * 2)
    expect(screen.getByText("฿20")).toBeDefined();
  });

  test("MoneyInsert renders correctly", () => {
    render(<MoneyInsert />);
    expect(screen.getByText("Insert Coins")).toBeDefined();
    expect(screen.getByText("Insert Bills")).toBeDefined();
    expect(screen.getByText("฿10")).toBeDefined();
    expect(screen.getByText("฿1000")).toBeDefined();
  });

  test("NotificationModal renders correctly when open", () => {
    const mockChangeMoney = [
      { name: "5", type: "COIN" as const, amount: 1 },
    ];
    render(
      <NotificationModal
        isOpen={true}
        onClose={jest.fn()}
        clearCart={jest.fn()}
        changesTotal={5}
        changeMoney={mockChangeMoney}
        isError={false}
      />
    );
    expect(screen.getByText("Change Returned")).toBeDefined();
    expect(screen.getAllByText("5")).toBeDefined(); // Total Amount and Coin Name
    expect(screen.getByText("Collect & Close")).toBeDefined();
  });

  test("NotificationModal renders error state correctly", () => {
    render(
      <NotificationModal
        isOpen={true}
        onClose={jest.fn()}
        clearCart={jest.fn()}
        changesTotal={0}
        changeMoney={[]}
        isError={true}
        errorMessage="Insufficient funds"
      />
    );
    expect(screen.getByText("Transaction Failed")).toBeDefined();
    expect(screen.getByText("Insufficient funds")).toBeDefined();
  });
});
