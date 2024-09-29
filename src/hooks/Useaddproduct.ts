import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Endpoints/axiosInstance";
import { endpoints } from "../Endpoints/endpoints";
import toast from "react-hot-toast";
const {Addproduct} = endpoints;


interface productDataType{
    productName:string,
    productPrice:string,
    productCategory:string,
    productDescription:string,
    productImage:FileList,
    sellerId:string | undefined
}
const addProduct = async (productdata:productDataType)=>{
    try{
      

        const response = await axiosInstance.post(Addproduct,productdata);


        return response.data;


    }catch(error:any){

        const errorMessage = error.response.data?.msg;

        throw new Error(errorMessage)
    }
}


export const UseAddProduct = ()=>{
    return useMutation({
        mutationKey:['addproduct'],
        mutationFn:addProduct,
        onSuccess:()=>{
            toast.success('Product added successfully');
        },

        onError:(error)=>{
            toast.error(error.message);
        }
    })
}