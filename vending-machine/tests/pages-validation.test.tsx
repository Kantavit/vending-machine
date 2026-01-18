import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import ProductsPage from "../app/products/page";
import CartPage from "../app/products/cart/page";
import CheckoutPage from "../app/checkout/page";
import React from "react";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock custom hooks
jest.mock("../components/product-card/hook/use-product-query", () => ({
  useProductQuery: () => ({
    productData: {
      data: [
        {
          id: 1,
          name: "Coke",
          price: 15,
          image: "coke.png", // Mock image property if it exists in type, even if not used in render based on previous file view
          quantity: 10,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      isLoading: false,
    },
  }),
}));

jest.mock("../components/product-card/store/useCartStore", () => ({
  useCartStore: () => ({
    cart: [
      {
        id: 1,
        name: "Coke",
        price: 15,
        image: "coke.png",
        quantity: 10,
        cartQuantity: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    getTotalItems: () => 2,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    getItemQuantity: () => 0,
  }),
}));

jest.mock("../components/money-insert/store/useMoneyStore", () => ({
  useMoneyStore: () => ({
    insertedMoney: [
        {
            id: 1,
            name: "10",
            type: "COIN",
            amount: 1
        }
    ],
    setInsertedMoney: jest.fn(),
  }),
}));

jest.mock("../components/product-card/hook/use-product-mutate", () => ({
  useProductMutate: () => ({
    updateProductMutation: jest.fn(),
  }),
}));

jest.mock("../components/money-insert/hook/use-money-mutate", () => ({
  useMoneyMutate: () => ({
    updateMoneyAddMutation: jest.fn(),
    moneyReturnChangeMutation: jest.fn(),
  }),
}));

describe("Page Rendering Tests", () => {
  test("Home page renders correctly", () => {
    render(<Home />);
    expect(screen.getByText("Blue Vending")).toBeDefined();
    expect(screen.getByText("Start Ordering")).toBeDefined();
  });

  test("Products page renders correctly", () => {
    render(<ProductsPage />);
    expect(screen.getByText("Products")).toBeDefined();
    // Check if product card is rendered (mocked data has "Coke")
    expect(screen.getByText("Coke")).toBeDefined();
    expect(screen.getByText(/Checkout/)).toBeDefined();
  });

  test("Cart page renders correctly", () => {
    render(<CartPage />);
    expect(screen.getByText("Cart (2 items)")).toBeDefined();
    expect(screen.getByText("Coke")).toBeDefined();
    expect(screen.getByText("Total:")).toBeDefined();
  });

  test("Checkout page renders correctly", () => {
    render(<CheckoutPage />);
    expect(screen.getByText("Checkout")).toBeDefined();
    expect(screen.getByRole("button", { name: /Pay/i })).toBeDefined();
  });
});
