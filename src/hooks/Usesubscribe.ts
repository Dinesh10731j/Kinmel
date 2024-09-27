import toast from "react-hot-toast";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import { useMutation } from "@tanstack/react-query";
const { Subscribe } = endpoints;

interface subscriptionTType {
  email: string;
}
const userSubscribe = async (data: subscriptionTType) => {
  try {
    const response = await axiosInstance.post(Subscribe, data);

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response.data?.msg;

    throw new Error(errorMessage);
  }
};

export const UseUserSubscribe = () => {
  return useMutation({
    mutationKey: ["subscription"],
    mutationFn: userSubscribe,
    onSuccess: () => {
      toast.success("Subscription sucessfull");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
