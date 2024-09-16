import { useMutation } from "@tanstack/react-query";
import { endpoints } from "../Endpoints/endpoints";
const { Addressbook } = endpoints;
import axiosInstance from "../Endpoints/axiosInstance";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface addressBookType {
 
  name: string;
  userId: string;
  address: string;
}

const addressBook = async (addressbook: addressBookType) => {
  const userId = Cookies.get("userId");

  try {
    const response = await axiosInstance.post(Addressbook, {
      ...addressbook,
      userId: userId,
    });

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.msg ?? "Failed to add addressbook";

    throw new Error(errorMessage);
  }
};

export const UseUserAddressBook = () => {
  return useMutation({
    mutationKey: ["useraddress"],
    mutationFn: addressBook,
    onSuccess: () => {
      toast.success("Address book addded successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
