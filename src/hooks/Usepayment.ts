import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import { useMutation } from "@tanstack/react-query";
const {Userpayment} = endpoints;
const Payment = async ()=>{

    try{

        const response = await axiosInstance.post(Userpayment);
return response.data;


    }catch{
        throw new Error('Failed Payment');
    }

}


export const UseUserPayment = ()=>{
    return useMutation({mutationKey:['userpayment'],mutationFn:Payment});
}

