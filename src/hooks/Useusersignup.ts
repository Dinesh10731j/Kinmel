import toast from "react-hot-toast";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import {useMutation} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    return useMutation({mutationKey:['usersignup'],mutationFn:UserSignup,
        onSuccess:()=>{

            toast.success('User signup sucessfully');

            setTimeout(()=>{
                navigate("/auth/login")
            },1000)

        },onError:()=>{
            toast.error('User signup failed! ')
        }})
}