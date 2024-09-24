import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import toast from "react-hot-toast";
const {Editreturn} = endpoints;
interface FormValues {
    orderId: string;
    productName: string;
    reason: string;
    comments: string;
    _id:string;
    returnId:string;
  }
const editReturn = async (editedData:FormValues) => {

    try{
        const response = await axiosInstance.patch(Editreturn,editedData);

        return response.data;

    }catch(error:any){

        const errorMesage = error.response.data?.msg ?? "Failed to edit return";

        throw new Error(errorMesage);

    }

   
}


export const UseEditReturn = ()=>{
    return useMutation({mutationKey:['editreturn'],mutationFn:editReturn,onSuccess:()=>{
        toast.success('Return edited successfully')
    },onError:(error)=>{
        toast.error(error.message)

    }})
}