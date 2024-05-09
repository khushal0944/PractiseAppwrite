import Logo from "../Logo"
import {useSelector} from "react-redux"
import {Link, useNavigate} from 'react-router-dom'
import authService from '../../appwrite/auth'
import {login, logout} from '../../store/authSlice'
import Logout from "./Logout"

export default function Header(){
    const authentication = useSelector((state) => state.status);
    const navigate = useNavigate();
    
    let navItems = [
        {
            title: "home",
            url: "/",
            status: true
        },
        {
            title: "about",
            url : "/about",
            status : true
        },
        {
            title: "Sign In",
            url : "/signIn",
            status : !authentication
        },
        {
            title: "Login",
            url : "/logIn",
            status : !authentication
        },
        {
            title: "All Posts",
            url : "/allPosts",
            status : authentication
        }
    ]
    return (
        <>
            <div>
                <nav>
                    <Link to={"/"}><Logo width="70px"/></Link>
                    <div>
                        <ul>
                            {
                                navItems.map((item)=>{
                                    item.status ? (
                                        <li key={item}>
                                            <button onClick={()=> navigate(item.url)}>
                                                {item.title}
                                            </button>
                                        </li>
                                    ):null
                                })
                            }
                        </ul>
                    </div>
                    {
                        authentication && (
                            <Logout />
                        )
                    }
                </nav>
            </div>
        </>
    )
}