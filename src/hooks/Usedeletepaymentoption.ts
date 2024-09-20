import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import toast from "react-hot-toast";
const { DeletePaymentoption } = endpoints;

const deletePaymentOption = async (detelePaymentOptionId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${DeletePaymentoption}/${detelePaymentOptionId}`
    );
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.msg;

    throw new Error(errorMessage);
  }
};

export const UseDeletePaymentOption = () => {
  return useMutation({
    mutationKey: ["deletepaymentoption"],
    mutationFn: deletePaymentOption,
    onSuccess: () => {
      toast.success("Payment option deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete payment option");
    },
  });
};
