import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import { useMutation } from "@tanstack/react-query";
const {Userpaymentintent} = endpoints;
const PaymentIntent = async ()=>{
    try{
const response = await axiosInstance.post(Userpaymentintent);
console.log(response.data)

return response.data;

    

    }catch{
        throw new Error('Failed to fetch clientId');

    }
    
}


export const UseUserPaymentIntent = ()=>{
    return useMutation({mutationKey:['paymentintent'],mutationFn:PaymentIntent});
}