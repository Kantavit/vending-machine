import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/api/axios-client";
import { MONEY } from "../types/money.type";

export const useMoneyMutate = () => {
  const queryClient = useQueryClient();

  const updateMoneyAddMutation = useMutation({
    mutationFn: (data: Pick<MONEY, "name" | "amount">[]) => {
      return axiosClient.post("/moneys/add", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["MONEYS"],
      });
    },
  });

  const moneyReturnChangeMutation = useMutation({
    mutationFn: (data: { change_amount: number }) => {
      return axiosClient.post("/moneys/return-change", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["MONEYS"],
      });
    },
  });

  return {
    updateMoneyAddMutation: updateMoneyAddMutation.mutateAsync,
    moneyReturnChangeMutation: moneyReturnChangeMutation.mutateAsync,
  };
};
