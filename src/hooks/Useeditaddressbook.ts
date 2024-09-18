import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const { Editaddressbook } = endpoints;
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
interface editedDataType {
  name: string;
  address: string;
 
}

const editAddressBook = async (editeddata: editedDataType) => {
  try {
    const response = await axiosInstance.patch(Editaddressbook, editeddata);

    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.msg;
    throw new Error(errorMessage);
  }
};

export const UseEditAddressBook = () => {
  return useMutation({
    mutationKey: ["editedaddressbook"],
    mutationFn: editAddressBook,
    onSuccess:()=>{
        toast.success('Addressbook edited successfully')
    },onError:()=>{
        toast.error('Failed to edit addressbook');
    }
  });
};
