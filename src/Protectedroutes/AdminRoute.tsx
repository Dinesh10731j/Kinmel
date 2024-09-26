
import { Outlet,Navigate } from "react-router-dom";
import { useSelector} from "react-redux";

const AdminRoute = () => {
const userRole = useSelector((state:any)=>{

  return state.userRole?.role;

});
  


  return (
    <>{userRole==='admin'?<Outlet/>:<Navigate to={'/auth/login'}/>}</>
    
  )
}

export default AdminRoute