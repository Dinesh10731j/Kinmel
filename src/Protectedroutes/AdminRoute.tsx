import Cookies from "js-cookie";
import { Outlet,Navigate } from "react-router-dom";
const AdminRoute = () => {


  const role = Cookies.get('role');
if(!role){
  throw new Error('Token not found')
}

  return (
    <>{role==='admin'?<Outlet/>:<Navigate to={'/auth/login'}/>}</>
    
  )
}

export default AdminRoute