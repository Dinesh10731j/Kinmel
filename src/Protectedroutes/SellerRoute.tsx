
import { Outlet,Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const SellerRoute = () => {
const role = Cookies.get("role");
  return (
   <>
   {role === 'seller'?<Outlet/>:<Navigate to={'/auth/login'}/>}
   </>
  )
}

export default SellerRoute