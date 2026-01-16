import axiosClient from "@/api/axios-client";
import { useQuery } from "@tanstack/react-query";

export interface PRODUCT {
  id: number;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export const useProductQuery = () => {
  const productQuery = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      const response = await axiosClient.get<PRODUCT[]>("/products/");
      return response.data;
    },
  });
  const productData = productQuery || [];

  return {
    productData,
  };
};
