"use client"
import React,{useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getTicketDetailsAction } from "@/redux/ticketSlice/allTicketsActions";


const LoginForm = ( ) => {

    const [ticket, setTicket] = useState<string>('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { errorMessageToggle} = useSelector((state: RootState) => state.toggleHomeMenu);
    const {loading, status, errorMessage, ticketsDetails} = useSelector((state: RootState) => state.allTickets);
    const router = useRouter();

    const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>) => {         
        try{
            e.preventDefault();
            if(typeof ticket === 'string'){
            //@ts-ignore
            dispatch(getTicketDetailsAction(ticket));
            setTicket("");
            }return;          
        }catch(err){
        console.log(err)
        }
    } 

    useEffect(() => {  
        if(status === 200){
           router.push(`${process.env.BASE_URL}/tickets/ticket_details/${ticketsDetails._id}`);  
        }
    }, [router, errorMessage, ticket, status, loading, ticketsDetails]);
    

    return(
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
                        // onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button type="submit" className="group relative h-12 w-full flex justify-center py-2
                 px-4 border border-transparent text-xl font-medium rounded-3xl text-white 
                            bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                // disabled={loadingButton?true : false}
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
   )
}

export default LoginForm;


