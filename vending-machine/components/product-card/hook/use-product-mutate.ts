import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/api/axios-client";
import { PRODUCT } from "../types/product.type";

export const useProductMutate = () => {
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: (data: Pick<PRODUCT, "id" | "quantity">[]) => {
      return axiosClient.patch("/products/", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PRODUCTS"],
      });
    },
  });

  return {
    updateProductMutation: updateProductMutation.mutateAsync,
  };
};
