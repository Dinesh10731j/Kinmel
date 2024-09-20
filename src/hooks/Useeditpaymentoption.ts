import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import toast from "react-hot-toast";
const { Editpaymentoption } = endpoints;

interface editedPaymentOptionype {
  name: string;
  details: string;
  paymentOptionId: string;
}
const editPaymentOption = async (
  editedPaymentOption: editedPaymentOptionype
) => {
  try {
    const response = await axiosInstance.patch(
      Editpaymentoption,
      editedPaymentOption
    );

    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.msg;

    throw new Error(errorMessage);
  }
};

export const UseEditPaymentOption = () => {
  return useMutation({
    mutationKey: ["editpaymentoption"],
    mutationFn: editPaymentOption,
    onSuccess: () => {
      toast.success("Payment option edited successfully");
    },
    onError: () => {
      toast.error("Failed to edit payment option");
    },
  });
};
