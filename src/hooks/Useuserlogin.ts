import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Userlogin } = endpoints;

interface UserloginType {
    email: string,
    password: string,
}

const UserLogin = async (data: UserloginType): Promise<any> => {
    try {
        const response = await axiosInstance.post(Userlogin, data);
        return response.data;
    } catch {
        throw new Error('Failed to Login!');
    }
}

export const UseUserLogin = () => {
    const navigate = useNavigate(); // Get the navigate function

    return useMutation({
        mutationKey: ['userlogin'],
        mutationFn: UserLogin,
        onSuccess: (data) => {
          
            Cookies.set('token', data?.token);
            Cookies.set("role", data?.role);

            setTimeout(() => {
                toast.success('Login Successful');

                if (data?.role === 'admin') {
                    navigate('/dashboard/admin'); 
                } 
                
                else if(data?.role === 'seller'){
                    navigate('/dashboard/seller');

                }
                else {
                    navigate('/'); 
                }
            }, 1000);
        },
        onError: () => {
            toast.error("Invalid credentials!");
        }
    });
}
