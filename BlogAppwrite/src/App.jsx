import { useEffect, useState } from "react"
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

export default function App() {
  const [loading , setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getLoginInfo()
      .then((userData)=> {
        if(userData){
          dispatch(login(userData))
        } else{
          dispatch(logout())
        }
      })
      .finally(()=> setLoading(false))
  },[])

  return !loading ? (
    <div className="mx-auto bg-black text-white w-1/2 m-60 p-5 text-3xl">Loading...</div>
  ):null
}