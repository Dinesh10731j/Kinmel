import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const { Getaddressbook } = endpoints;
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
const getAddressBook = async () => {
  try {
    const userId = Cookies.get("userId");

    const response = await axiosInstance.get(`${Getaddressbook}/${userId}`);

    return response.data?.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.msg ?? "Failed to get user addressbook";

    throw new Error(errorMessage);
  }
};

export const UseGetAddressBook = () => {
  return useQuery({
    queryKey: ["getaddressbook"],
    queryFn: getAddressBook,
    staleTime: 100,
    refetchOnMount: "always",
    refetchInterval: 100,
    refetchOnWindowFocus: "always",
  });
};
