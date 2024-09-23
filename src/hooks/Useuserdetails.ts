import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const { Getuserdetails } = endpoints;
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

const FetchUserDetails = async () => {
  try {
    const userId = Cookies.get("userId");

    const response = await axiosInstance.get(`${Getuserdetails}/${userId}`);

    return response.data?.data;
  } catch {
    throw new Error("Failed to fetch user details");
  }
};

export const UseUserDetails = () => {
  return useQuery({
    queryKey: ["userdetails"],
    queryFn: FetchUserDetails,
    refetchInterval:100,
    staleTime: 100,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });
};
