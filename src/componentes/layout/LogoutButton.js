import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import style from "./LogoutButton.module.css"

const LogoutButton = ()=>{
    const authContext = useContext(AuthContext)
    const {signout} = authContext

    const handleLogout = () => {
        
        signout();
      };
    return (
        <button className={style.btn} onClick={handleLogout}>
            Logout
        </button>
    )
}
export default LogoutButton