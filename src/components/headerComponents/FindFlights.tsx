"use client"
import React,{useEffect, useState} from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getTicketDetailsAction, searchFlightAvailabilityAction } from "@/redux/ticketSlice/allTicketsActions";
import ErrorMessageToggle from "../sharedComponents/ErrorMessageToggle";
import { motion } from "framer-motion";  //____testing
import { IconImageLoader } from "../sharedComponents/forImageComponents/ContentLoader";
import { getMonthYear } from "@/lib/utils/helpers";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { toggleBookingInfoActions, toggleFoundFlightActions } from "@/redux/toggleSlice/toggleActions";


const FindFlights = ( ) => {
    const [destination, setDestination] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [departDate, setDepartDate] = useState<Date>(new Date());
    const [returnDate, setReturnDate] = useState<Date>(new Date());
    const { errorMessageToggle} = useSelector((state: RootState) => state.toggleHomeMenu);
    const {loading, status, foundNewFlights,errorMessage, ticketsDetails} = useSelector((state: RootState) => state.allTickets);
    const {loginStatusMsg} = useSelector((state: RootState) => state.authUsers);
    const {loginStatus, loginOk } =loginStatusMsg;
    const {cheapRecommendedFlights, foundFlights} = foundNewFlights
    const {toggleFoundFlights} = useSelector((state: RootState) => state.toggleHomeMenu);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>) => {  // reuse this func       
        try{
            e.preventDefault();
              const data = {
                    origin: origin,
                    destination: destination,
                    departDate:getMonthYear(departDate),
                    returnDate: getMonthYear(returnDate),
               }
               dispatch(searchFlightAvailabilityAction(data));
               // clear fields  --!!!
    
        }catch(err){
        console.log(err)
        }
    } 

    useEffect(() => {          
    }, [router, errorMessage,toggleFoundFlights, cheapRecommendedFlights,status, loading, ticketsDetails, loginOk, loginStatus]);
    

    return(
        <motion.div
           className="cancelTicketWrapper 
              top-20 bg-transparent px-6 py-8  shadow-md text-black
              items-center
              space-y-8 
              relative
              z-2
              bg-gradient-to-b from-transparent via-sky-50 to-sky-300  rounded-lg"
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
            <div className="absolute top-2 "> 
            {
                errorMessage && errorMessage.length? <ErrorMessageToggle/> :""
            }             
            </div>   
            <div className="emailWrapper ">
                <form 
                    onSubmit={handleFormSubmit} 
                    className="mt-8d space-y-6"
                >
                    <div className="space-y- ">
                        <h3 className="text-black font-bold text-lg py-2"  >Change Flight: 
                            {
                            // loading && loading?<IconImageLoader/>:""                 
                            }                        
                        </h3>

                        <label className=" text-md ">Departure</label>
                        <input id="origin" name="origin" 
                            type="origin" 
                            autoComplete="none" 
                            required className="my-2 appearance-none text-[13px] rounded-none relative block w-full px-3 py-2 border
                            -gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                            placeholder="please enter your origin i.e BER (berlin)"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                        />
                        <label className=" text-md ">Destination</label>
                        <input id="destination" name="destination" 
                            type="destination" 
                            autoComplete="none" 
                            required className=" my-2 appearance-none text-[13px] rounded-none relative block w-full px-3 py-2 border
                            -gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                            placeholder="please enter your destination LON (london)"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                        <div className="flex flex-col md:flex-row xl:flex-row 2xl:flex-row  justify-between w-full space-y-1 
                            "
                            > 
                            <div className=" w-full h-full space-y-1 space-x-2    ">
                                <label className=" text-md">Departure date</label>
                                <DatePicker
                                selected={departDate}
                                showIcon
                                onChange={(date) => setDepartDate(date)}
                                className=" p-1 rounded-t-lg"
                                />
                            </div>
                            <div className=" w-full h-full space-y-1 space-x-2    ">
                                <label className=" text-md">Return date</label>
                                <DatePicker
                                selected={returnDate}
                                showIcon
                                onChange={(date) => setReturnDate(date)}
                                monthsShown={2}
                                className="p-1 rounded-t-lg"
                                />
                            </div>
                            </div>
                    </div>
                    <div>                        
                        <button
                            type="submit" 
                            className={`group relative h-11 w-full
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
                            onClick={()=> dispatch(toggleFoundFlightActions(toggleFoundFlights))}
                        >
                            find flight
                        </button> 
                    </div>               
                </form>
            </div>
        </motion.div>
   )
}

export default FindFlights;


