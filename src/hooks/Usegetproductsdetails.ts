
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProductsDetails = async (productid:string )=>{
    try{


        const response = await axios.get(`https://fakestoreapi.com/products/${productid}`);


        return response.data;

    }catch{
        throw new Error('Failed to fetch products details');
    }
}



export const UseProductDetails = (productid:string)=>{

    return useQuery({queryKey:['productdetails'],queryFn:()=>ProductsDetails(productid)});

}