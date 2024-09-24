import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const {Mycancellation} = endpoints;
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface cancellationType{
    orderId: string;
    productName: string;
    productImage: string;
    cancellationDate: string;
    cancellationStatus: 'Pending' | 'Approved' | 'Rejected';
    refundAmount: number | null;
    reason: string;
    comments: string;

}
const Cancellation = async (data:cancellationType) => {
try{

    const userId = Cookies.get("userId");

    const response = await axiosInstance.post(Mycancellation,{...data,userId:userId});

    return response.data;

}catch(error:any){
    const errorMessage = error?.response?.data?.msg ?? "Failed to create cancellation";

    throw new Error(errorMessage);

}


}


export const UseCancellation = () => {

    return useMutation({mutationKey:['cancellation'],mutationFn:Cancellation,onSuccess:()=>{
        toast.success('Cancellation request send successfully')
    },onError:(error)=>{
        toast.error(error.message)
    }});

}