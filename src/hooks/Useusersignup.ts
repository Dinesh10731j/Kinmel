import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import {useMutation} from "@tanstack/react-query";

const {Usersignup} = endpoints;

interface Signupdetails{
    email:string,
    password:string,
    confirmpassword:string,
}

const UserSignup = async (data:Signupdetails) => {
    try{

        const response = await axiosInstance.post(Usersignup,data);

        return response.data.data;

    }catch{


        throw new Error('Failed to signup')

    }
}



export const UserUserSignup = ()=>{
    return useMutation({mutationKey:['usersignup'],mutationFn:UserSignup})
}