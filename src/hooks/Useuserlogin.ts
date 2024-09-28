import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setUserRole } from "../store/slices/userRoleSlice";
import { useDispatch } from "react-redux";
import bs64 from "base-64"


const { Userlogin } = endpoints;

interface UserloginType {
    email: string,
    password: string,
}

const UserLogin = async (data: UserloginType): Promise<any> => {
    try {
        const response = await axiosInstance.post(Userlogin, data);
        return response.data;
    } catch(error:any) {
        const errorMessage = error.response.data?.msg;
        throw new Error(errorMessage);
    }
}

export const UseUserLogin = () => {
    const navigate = useNavigate(); // Get the navigate function
    const dispatch = useDispatch();

    return useMutation({
        mutationKey: ['userlogin'],
        mutationFn: UserLogin,
        onSuccess: (data) => {
         Cookies.set('userId',data?.userid)
            Cookies.set('token', data?.token);

            const encodedRole = bs64.encode(data?.role)
        

            dispatch(setUserRole(encodedRole));


            
            toast.success('Login Successful');

            setTimeout(() => {
            

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
        onError: (error) => {
            toast.error(error.message);
        }
    });
}
