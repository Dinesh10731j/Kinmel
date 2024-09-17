import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const {Deleteaddressbook} = endpoints;
import toast from "react-hot-toast";
const deleteAddressBook = async (addressBookId:string) => {
    try{


        const response = await axiosInstance.delete(`${Deleteaddressbook}/${addressBookId}`);

        return response.data;

    }catch(error:any){

        const errorMessage = error?.response?.data?.msg ?? "Failed to delete addressbook";


        throw new Error(errorMessage);
    }
}


export const UseDeleteAddressBook = ()=>{


    return useMutation({mutationKey:['deleteaddressbook'],mutationFn:deleteAddressBook,onSuccess:()=>{
        toast.success('User addresbook deleted successfully');
    },onError:()=>{
        toast.error('Failed to delete user addressbook');
    }})


}