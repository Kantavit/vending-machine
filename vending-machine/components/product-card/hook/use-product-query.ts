import axiosClient from "@/api/axios-client";
import { useQuery } from "@tanstack/react-query";
import { PRODUCT } from "../types/product.type";

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
