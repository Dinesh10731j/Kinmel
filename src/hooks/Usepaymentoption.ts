import toast from "react-hot-toast";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const { Paymentoption } = endpoints;
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
interface paymentOptionType {
  name: string;
  details: string;
}
const paymentOption = async (data: paymentOptionType) => {
  try {


    const userId = Cookies.get('userId');
    const response = await axiosInstance.post(Paymentoption, {...data,userId:userId});
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.msg;

    throw new Error(errorMessage);
  }
};

export const UsePaymentOption = () => {
  return useMutation({
    mutationKey: ["paymentoption"],
    mutationFn: paymentOption,
    onSuccess: () => {
      toast.success("Payment option added successfully");
    },
    onError: () => {
      toast.error("Failed! to add payment option");
    },
  });
};
