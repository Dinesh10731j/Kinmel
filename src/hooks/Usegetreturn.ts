import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const { Getreturns } = endpoints;
import Cookies from "js-cookie";
const getReturn = async () => {
  try {
    const userId = Cookies.get("userId");
    const response = await axiosInstance.get(`${Getreturns}/${userId}`);

    return response.data?.data;
  } catch (error: any) {
    const errorMessage = error.response.data?.msg;

    throw new Error(errorMessage);
  }
};

export const UseGetreturns = () => {
  return useQuery({
    queryKey: ["usersreturns"],
    queryFn: getReturn,
    staleTime: 100,
    refetchInterval: 100,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });
};
