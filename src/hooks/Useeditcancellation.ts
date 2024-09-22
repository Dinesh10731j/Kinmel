import toast from "react-hot-toast";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const {Editcancellation} = endpoints;
import { useMutation } from "@tanstack/react-query";

interface editedDataType{
    orderId: string;
    productName: string;
    productImage: string;
    cancellationDate: string;
    cancellationStatus: 'Pending' | 'Approved' | 'Rejected';
    refundAmount: number | null;
    reason: string;
    comments: string;
    _id:string,
}

const editCancellation = async (editeddata:editedDataType) => {
    try{

        const response = await axiosInstance.patch(Editcancellation,editeddata)

return response.data;


    }catch(error:any){

        const errorMessage = error?.response?.data?.msg ?? "Failed to edit cancellation";

        throw new Error(errorMessage);

        
    }
}



export const UseEditCancellation = ()=> {

    return useMutation({mutationKey:['editcancelation'],mutationFn:editCancellation,onSuccess:()=>{
        toast.success('Cancellation edited successfully')
    },onError:(error)=>{
        toast.error(error.message);
    }});
}