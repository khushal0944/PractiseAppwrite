import { logout } from "../../store/authSlice"
import authService from "../../appwrite/auth"
import { useDispatch } from "react-redux"
export default function Logout(){
    const dispatch = useDispatch();
    function logoutHandle(){
        authService.logout().then(()=> dispatch(logout()))
    }
    return (
        <button 
        onClick={logoutHandle}
        >Logout</button>
    )
}