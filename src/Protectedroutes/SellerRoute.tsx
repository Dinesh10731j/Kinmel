
import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SellerRoute = () => {
const userRole = useSelector((state:any)=>{
  return state.userRole.role;
});
  return (
   <>
   {userRole === 'seller'?<Outlet/>:<Navigate to={'/auth/login'}/>}
   </>
  )
}

export default SellerRoute