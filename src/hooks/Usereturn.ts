import toast from "react-hot-toast";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const { Myreturns } = endpoints;
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
interface ReturnItem {
  orderId: string;
  productName: string;
  productImage: string;
  returnDate: string;
  returnStatus: "Pending" | "Approved" | "Completed" | "Rejected";
  refundAmount: number | null;
  reason: string;
  comments: string;
}
const Returns = async (returns: ReturnItem) => {
  try {
    const userId = Cookies.get("userId");
    const response = await axiosInstance.post(Myreturns, {...returns,userId:userId});

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data?.msg ?? "Failed to send return request";

    throw new Error(errorMessage);
  }
};

export const UseReturns = () => {
  return useMutation({
    mutationKey: ["usereturns"],
    mutationFn: Returns,
    onSuccess: () => {
      toast.success("Return request send successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
