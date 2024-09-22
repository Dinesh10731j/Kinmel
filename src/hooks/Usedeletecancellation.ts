import toast from "react-hot-toast";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import { useMutation } from "@tanstack/react-query";

const { Deletecancellation } = endpoints;
const deleteCancellation = async (cancellationId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${Deletecancellation}/${cancellationId}`
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.msg ?? "Failed to delete cancellation";

    throw new Error(errorMessage);
  }
};

export const UseDeleteCancellation = () => {
  return useMutation({
    mutationKey: ["deletecancellation"],
    mutationFn: deleteCancellation,
    onSuccess: () => {
      toast.success("Cancellation deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
