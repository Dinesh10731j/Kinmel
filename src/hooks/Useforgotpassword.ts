import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import toast from "react-hot-toast";
const {Forgotpassword} = endpoints;
interface FormInputs {
    email: string;
  }
const forgotPassword = async (email:FormInputs)=>{
    try{

        const response =  await axiosInstance.post(Forgotpassword,email);

        return response.data;

    }catch(error:any){

        const errorMessage = error.response.data?.msg ?? 'Failed to forgotpassword';

        throw new Error(errorMessage);
    }
}


export const UseForgotPassword = () => {

    return useMutation({mutationKey:['forgotpassword'],mutationFn:forgotPassword,onSuccess:()=>{
        toast.success('New password sent to your email');
    },onError:(error)=>{
        toast.error(error.message);
    }})
}