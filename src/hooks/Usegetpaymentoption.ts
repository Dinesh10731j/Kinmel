import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const { Getpaymentoption } = endpoints;
import Cookies from "js-cookie";
const fetchPaymentOption = async () => {
  try {
    const userId = Cookies.get("userId");

    const response = await axiosInstance.get(`${Getpaymentoption}/${userId}`);
    return response.data?.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.msg;

    throw new Error(errorMessage);
  }
};

export const UseGetPaymentOption = () => {
  return useQuery({
    queryKey: ["getpaymentoption"],
    queryFn: fetchPaymentOption,staleTime:100,refetchInterval:100,refetchOnWindowFocus:'always',refetchOnMount:'always'
  });
};
