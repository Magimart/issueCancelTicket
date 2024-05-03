"use client"
import React,{useEffect, useState} from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getTicketDetailsAction } from "@/redux/ticketSlice/allTicketsActions";
import ErrorMessageToggle from "../sharedComponents/ErrorMessageToggle";
import { motion } from "framer-motion";  //____testing
import { IconImageLoader } from "../sharedComponents/forImageComponents/ContentLoader";


const CancelTicketFormInput = ( ) => {

    const [ticket, setTicket] = useState<string>('');
    const [fetch, setFetch] = useState<boolean>(false);
    const { errorMessageToggle} = useSelector((state: RootState) => state.toggleHomeMenu);
    const {loading, status, errorMessage, ticketsDetails} = useSelector((state: RootState) => state.allTickets);
    const {loginStatusMsg} = useSelector((state: RootState) => state.authUsers);
    const {loginStatus, loginOk } =loginStatusMsg;
    const router = useRouter();
    const dispatch  = useDispatch<AppDispatch>();

    const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>) => {         
        try{
            e.preventDefault();
            if(typeof ticket === 'string'){
              setFetch(true);              
              dispatch(getTicketDetailsAction(ticket));
              setTicket("");
            }return;          
        }catch(err){
        console.log(err)
        }
    } 

    useEffect(() => {          
    }, [router, errorMessage, ticket, status, loading, ticketsDetails, loginOk, loginStatus]);
    

    return(
        <motion.div className="cancelTicketWrapper bg-white px-6 py-8  shadow-md text-black w-full
            space-y-8 relative  top-[10em]
            bg-gradient-to-b from-transparent via-sky-50 to-sky-300 p-3 rounded-lg"
            initial={{ 
                height: "1%", 
                width: "1%", 
                opacity: 0, 
                x: 100,
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
         <div className="absolute z-3 top-4"> 
           {
             errorMessage && errorMessage.length? <ErrorMessageToggle/> :""
           }             
        </div>   
            <div className="emailWrapper ">
                <form 
                   onSubmit={handleFormSubmit} 
                   className="mt-8 space-y-6"
                >
                    <div>
                        <label  className="text-black"  >Ticket Number: 
                           {
                            loading && loading?<IconImageLoader/>:""                 
                           }
                        
                        </label>
                        <input id="ticket" name="ticket" 
                            type="ticket" 
                            autoComplete="none" 
                            required className="appearance-none text-[13px] rounded-none relative block w-full px-3 py-2 border
                            -gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                            placeholder="please enter your ticket number"
                            value={ticket}
                            onChange={(e) => setTicket(e.target.value)}
                        />
                    </div>
                    <div>                        
                        <button type="submit" className={`group relative h-11 w-full
                        flex justify-center py-2 px-4 border 
                        border-transparent text-xl font-medium rounded-3xl 
                        text-white 
                        bg-red-600  
                        focus:outline-none
                        focus:ring-2 focus:ring-offset-2
                        focus:ring-sky-500
                        ${errorMessage && errorMessage.length?'bg-opacity-20':'hover:bg-sky-400 hover:text-black text-gray-100  '}
                        `}
                        disabled={errorMessage && errorMessage.length?true:false}
                        >
                          Continue
                        </button> 
                    </div>               
                </form>
            </div>
        </motion.div>
   )
}

export default CancelTicketFormInput;


