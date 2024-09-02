import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const {Userlogin} = endpoints;
interface UserloginType{
    email:string,
    password:string,

}



const UserLogin = async (data:UserloginType):Promise<any>=>{
    try{

const response = await axiosInstance.post(Userlogin,data);
return response.data;

    }catch{

        throw new Error('Failed to Login!');

    }
}



export const UseUserLogin = () =>{
    return useMutation({mutationKey:['userlogin'],mutationFn:UserLogin})
}