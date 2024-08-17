import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
const fetchproductImage = async ()=>{
    try{

        const response = await axios.get('https://fakestoreapi.com/products');

        return response.data;

    }catch{
        throw new Error("Failed to fetch the productimages");
    }
}


export const UseGetProductsImages=()=>{
    return useQuery({queryKey:['productsimage'],queryFn:fetchproductImage,staleTime:1000,refetchInterval:1000,refetchOnWindowFocus:'always',refetchOnMount:'always'})
}