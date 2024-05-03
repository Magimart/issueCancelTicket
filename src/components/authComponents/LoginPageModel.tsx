"use client"
import React,{useEffect, useState} from "react";
import { motion } from "framer-motion";  //____testing
import {signIn} from 'next-auth/react';
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { LoginInUserActions } from "@/redux/userSlice/authUsersActions";
import { Credentials } from "@/lib/types/MyTypes";
import { toggleShowHideHomeMenuActions } from "@/redux/toggleSlice/toggleActions";

const LoginModel = ( ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const {isOpen} = useSelector((state: RootState) => state.toggleHomeMenu);
    const {loading,userSession, loginStatusMsg} = useSelector((state: RootState) => state.authUsers);
    const {status, errorMessage, ticketsDetails} = useSelector((state: RootState) => state.allTickets);
    const {loginStatus, loginError, loginOk } =loginStatusMsg;
    const dispatch = useDispatch<AppDispatch>();
    const pathName = usePathname();
    const router  = useRouter();
    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault();
            let credentials:Credentials = {
            email, password
            } 
            dispatch(LoginInUserActions(credentials));
        }catch(err){
           console.log(err)
        }
    }   
    useEffect(() => {  
        if(loginOk && loginStatus === 200){
            if(pathName === '/'){
                router.push(`${process.env.BASE_URL}/tickets/ticket_details/${ticketsDetails._id}`); 
                dispatch(toggleShowHideHomeMenuActions(isOpen));
            }else{
              router.push(`${process.env.BASE_URL}`);   //eslse ==> redirect to user page___for later!
            };
        }else{
          console.log(" this login error ==>",loginStatus, "login error", loginError)  // create component to display this error to user
        }
    }, [router, pathName, loginError, loading, loginOk, loginStatus, dispatch, isOpen, ticketsDetails._id]);
    
    return(    
        <motion.div 
            className=" flex  justify-center
                sm:px-6 lg:px-8 
                relative 
                w-full
                h-[10em]
                bg-sky-00 bg-opacity-30 -top-32
                    "
                initial={{ 
                height: "1%", 
                opacity: 0, 
                x: 1000,
                    scale: 0.6
                }}
                animate={{
                height: "100%", 
                width: "100%", 
                    opacity: 1,
                    x: 0,
                    scale: 0.9,
                    transition: {
                    duration: 1,
                        scale: 5, 
                        type: "tween", stiffness: -10 
                    } 

                }
                }          
        >
            <motion.div className="max-w-xl w-full  space-y-8 
                     rounded-lg self-center
                    p-4  relative top-[12em] my-12                  
                    bg-gradient-to-b from-transparent via-sky-300 to-transparent
                " 
                initial={{ 
                    height: "1%", 
                    width: "1%", 
                    opacity: 0, 
                    x: -1000,
                        scale: 0.6
                    }}
                    animate={{
                    height: "100%", 
                    width: "100%", 
                        opacity: 1,
                        // x: -447,small
                        x: 0,
                        // y:0,
                        scale: 0.9,
                        boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.3)",
                        transition: {
                        duration: 1,
                            scale: 5, 
                            type: "tween", stiffness: -10 
                        } 
                    }
                    }                              
            >
                <div className="bg-">
                    <h2 className="mt-3 px-4 py-3 text-center text-2xl 
                        font-semibold text-blue-900
                        decoration-clone                                     
                        "
                    >
                        sign in 
                    </h2>
                </div>

            {/* form signing--- */}
                <div className=" px-6 py-8  shadow-md text-black w-full
                    max-w-full  space-y-8 
                    bg-gradient-to-b from-transparent via-yellow-50 to-transparent p-5 rounded-lg"
                >
                    <div className="emailWrapper">
                        <form 
                                onSubmit={handleFormSubmit} 
                                className="mt-8 space-y-6">
                            <div>
                                <label  className="text-black"  >Email</label>
                                <input id="email-address" name="email" 
                                    type="email" 
                                    autoComplete="none" 
                                    required className="appearance-none rounded-none relative block w-full px-3 py-2 border
                                    -gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                    placeholder="your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label  className="text-black"  >Password</label>
                                <input id="password" name="password" type="password"
                                        autoComplete="none" 
                                        required className="appearance-none rounded-none relative block w-full px-3 py-2 border
                                        border-gray-300 opacity-40 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                                        focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" 
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <button type="submit" className="group relative h-12 w-full flex justify-center py-2
                                    px-4 border border-transparent text-xl font-medium rounded-3xl text-white 
                                            bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  //disabled={loadingButton?true : false}
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-sky-200" 
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
                                            fill="currentColor" aria-hidden="true"
                                        >
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                                                clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    Sign in
                                </button>
                            </div>               
                        </form>
                    </div>
                </div>
            </motion.div>
        </motion.div> 
    )
}

export default LoginModel;


