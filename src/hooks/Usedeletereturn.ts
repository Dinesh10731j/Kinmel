import toast from "react-hot-toast";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import { useMutation } from "@tanstack/react-query";
const { Deletereturn } = endpoints;
const deleteReturn = async (returnId: string) => {
  try {
    const response = await axiosInstance.delete(`${Deletereturn}/${returnId}`);

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response.data?.msg ?? 'Failed to delete return';

    throw new Error(errorMessage);
  }
};

export const UseDeleteReturn = () => {
  return useMutation({
    mutationKey: ["deletereturn"],
    mutationFn: deleteReturn,
    onSuccess: () => {
      toast.success("Return deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
