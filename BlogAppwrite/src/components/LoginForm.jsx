import React,{useState} from 'react'
import {Input, Logo, Button} from './index'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'


export default function LoginForm(){
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const login = async (data)=>{
        setError("");
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getLoginInfo()
                if(userData) dispatch(authLogin(userData))
                navigate("/");
            }
        } catch (error) {
            setError(error)
        }
    }
    return (
        <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p>Error Found : {error}</p>}
        
        <form onSubmit={handleSubmit(login)}>
        <Input
        label="Email : "
        type="email"
        placeholder="Enter Your Email"
        {...register("email",{
            required:true,
        })}
        />

        <Input
        label="Password : "
        type="password"
        placeholder="Enter Your Password"
        {...register("password",{
            required:true,
        })}
        />

        <Button
        type='submit'
        >Log In</Button>
        </form>
        </div>
    </div>
    )
}