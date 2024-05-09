import {useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import {useForm} from 'react-router-dom'
import {Input, Button, Logo} from './index'

export default function SignIn(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError] = useState("");
    const {register , handleSubmit} = useForm();

    const signin = async(data)=>{
        setError("")
        try {
            const session = await authService.createAccount(data)
            if(session){
                const userData = authService.getLoginInfo()
                if(userData) dispatch(login(userData))
                navigate("/");
            }
        } catch (error) {
            setError(error);
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input label="Full Name :" placeholder="Enter Your Full Name" {...register("name",{required:true})}/>
                        <Input label="Email :" type="email" placeholder="Enter Your Email" {...register("email",{required:true})}/>
                        <Input label="Password :" type="password" placeholder="Enter Your Password" {...register("password",{required:true})}/>
                        <Button type='submit'>Sign In</Button>
                    </div>
                </form>
            </div>

    </div>
    )
}