import toast from "react-hot-toast";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const { Usercontact } = endpoints;
import { useMutation } from "@tanstack/react-query";
interface ContactType {
  name: string;
  email: string;
  phone: string;
  message: string;
}
const userContact = async (contactdata: ContactType) => {
  try {
    const response = await axiosInstance.post(Usercontact, contactdata);

    return response?.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.msg || "Failed to send user contact details";
    
    throw new Error(errorMessage);
  }
};

export const UseUserContact = () => {
  return useMutation({
    mutationKey: ["usercontact"],
    mutationFn:userContact,
    onSuccess: () => {
      toast.success("User contact data send successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
