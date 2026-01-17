import axiosClient from "@/api/axios-client";
import { useQuery } from "@tanstack/react-query";
import { MONEY } from "../types/money.type";

export const useMoneyQuery = () => {
  const moneyQuery = useQuery({
    queryKey: ["MONEYS"],
    queryFn: async () => {
      const response = await axiosClient.get<MONEY[]>("/moneys/");
      return response.data;
    },
  });
  const moneyData = moneyQuery || [];

  return {
    moneyData,
  };
};
