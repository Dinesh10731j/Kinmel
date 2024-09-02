import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import { useQuery } from "@tanstack/react-query";
const {Userpaymentconfig} = endpoints;
const PaymentConfig = async ()=>{

    try{

        const response = await axiosInstance.get(Userpaymentconfig);
return response.data;




    }catch{
        throw new Error('Failed Payment');
    }

}


export const UseUserPaymentConfig = ()=>{
    return useQuery({queryKey:['userpaymentconfig'],queryFn:PaymentConfig});
}

