import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
const {Editprofile} = endpoints;
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
interface editProfileType{
    email:string,
    fullName:string,
    currentPassword:string,
    newPassword:string,
    confirmPassword:string,

}

const editProfile = async (editprofiledata:editProfileType)=>{
    try{


        const response = await axiosInstance.patch(Editprofile,editprofiledata);

        return response.data;

    }catch(error:any){
        const errorMessage = error.response?.data?.msg || 'Failed to edit profile';
        throw new Error(errorMessage);
    }
}


export const UseEditProfile = ()=>{


    return useMutation({mutationKey:['editprofile'],mutationFn:editProfile,onSuccess:()=>{
        toast.success('Profile updated successfully')
        
    },onError:(error)=>{
        toast.error(error?.message)

    }});

}