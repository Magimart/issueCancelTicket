/* eslint-disable @next/next/no-img-element */
"use client"
import React,{ChangeEvent, useEffect, useRef, useState} from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";  //____testing
import {useSelector, useDispatch} from 'react-redux';
import {  AppDispatch, RootState } from "@/redux/store";
import { addNewUserAction } from "@/redux/userSlice/authUsersActions";


const RegisterUserModel = () => {


    const dispatch = useDispatch<AppDispatch>();
    const pathName = usePathname();
    const router = useRouter();


    const [user, setUser] = useState({
          name:"",
          address:"",
          email: "",
          password:""
    });
    const [avatar, setAvatar]  = useState<string | any>('');
    const {loading, addNewUser} = useSelector((state: RootState) => state.authUsers);
      const {registerStatus} = addNewUser;
        console.log(addNewUser, pathName)
   
    useEffect(() => {
        //  if(success)  {
        //      router.push('/login')
        // console.log(success)
        // }
        //   if(error)toast.error(error)
        if(registerStatus && registerStatus === 200){
            if(pathName === '/auth/register'){
                console.log("function fired")
                router.push(`${process.env.BASE_URL}/auth/login`); 
            };
            //eslse ==> redirect to user profile page___for later!
        }else{
          return;
        }

     }, [dispatch, pathName, router, registerStatus]);

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
        try { 
            const userData = { name:user.name, address:user.address, email: user.email, password:user.password}
             dispatch(addNewUserAction(userData));            
        }catch(err) { 
            console.error(err);
       }   
    };

    const handleChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {   
        setUser({ ...user, [e.target.name]: e.target.value });   
    };
      
    return (
        <>
           <section 
                className={`singlePageContainer mt-9  h-[100%] w-[100%]
                 bg-gradient-to-b from-sky-300 via-sky-300 to-transparent
                `}
            >
                <motion.div className=" flex  justify-center
                    sm:px-6 lg:px-8 
                    relative 
                    w-full
                    h-[10em]
                    "
                    initial={{ 
                        height: "1%", 
                        opacity: 0, 
                        // x: 60, scale: -0.6 }} no sale on small screens
                        x: -300,
                        scale: 0.5
                    }}
                    animate={{
                        height: "100%", 
                        width: "100%", 
                        opacity: 1,
                        x: 0,
                        scale: 0.7,
                        transition: {
                            duration: 1,
                            scale: 2, 
                            type: "tween", stiffness: 500 
                        }

                        }
                    }          
                >
                    <div className="bg-grey-lighter   flex flex-col">
                        <div className="container  mx-auto flex flex-col items-center justify-center px-2">
                            <div className="bg-white px-6 py-8  shadow-md text-black w-full
                                    max-w-xl  space-y-8 
                                    bg-gradient-to-b from-sky-300 via-sky-300 to-transparent
                                    p-5 rounded-lg
                                    ">
                                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                
                                <form   
                                    onSubmit={handleFormSubmit}             
                                    className="mt-4 space-y-6 w-full"  action="http://localhost:3000/" method="POST">
                                    <div className="flex justify-center justify-items-center w-full">
                                    <div className="w-max mx-1">
                                        <input 
                                            type="text"
                                            className="block border border-grey-light w-full p-2 rounded mb-1"
                                            name="name"
                                            value={user.name}
                                            placeholder="your full names"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    </div>

                                    {/* email */}
                                    <div>
                                        <input id="email-address" name="email" type="email" autoComplete="email" 
                                                required 
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                                            placeholder-gray-500 text-gray-900 rounded-t-md
                                                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                            placeholder="email"
                                            value={user.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input id="password"  
                                            type="password"
                                            autoComplete="current-password" 
                                            required className="appearance-none rounded-none relative block w-full px-3 py-2 border
                                            border-gray-300 opacity-40 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                                            focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                            placeholder="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                    />
                                    </div>
                                        <button
                                            type="submit"
                                            className="w-full text-center  rounded bg-yellow-500 p-3 text-gray-500 hover:bg-green-dark focus:outline-none my-1"
                                        >Create Account
                                        </button>
                                </form>             
                            </div>
                
                        </div>
                    </div>
                </motion.div>
           </section>

     
       </>
    )
}


export default RegisterUserModel;