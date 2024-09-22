import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import Cookies from "js-cookie";
const { Getcancellation } = endpoints;
const getCancellation = async () => {
  try {
    const userId = Cookies.get("userId");

    const response = await axiosInstance.get(`${Getcancellation}/${userId}`);

    return response.data;
  } catch (error: any) {
    const errorMesage =
      error?.reposne?.data?.msg ?? "Failed to get user cancellations";

    throw new Error(errorMesage);
  }
};

export const UseGetCancellation = () => {
  return useQuery({
    queryKey: ["getcancellations"],
    queryFn: getCancellation,
    staleTime: 100,
    refetchInterval: 100,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });
};
