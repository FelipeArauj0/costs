import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Outlet, useNavigate } from "react-router-dom"

export const PrivateRoute = ()=>{
    const navigate = useNavigate()
    const authContext = useContext(AuthContext);
    
    if (!authContext) {
        console.error("AuthContext não foi fornecido corretamente.");
        return null;
      }
    const {signed} = authContext
    return signed ? <Outlet/> : navigate("/login")
}