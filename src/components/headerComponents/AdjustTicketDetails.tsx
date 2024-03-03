import React, { useEffect,useRef} from "react";
import { toggleShowHideHomeMenuActions } from "@/redux/toggleSlice/toggleActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import LogoImage from "./LogoImage";
import { windowDimensionsActions } from "@/redux/globalVariables/windowDimensions";
import CancelTicketFormInput from "./CanelTicketFormInputs";
import LoginPage from "@/app/auth/login/page";
import { CloseIcon } from "./icons/SvgIconAssests";
import { toggleBookingInfoActions } from "@/redux/toggleSlice/toggleActions";
import DateAndTimePicker from "../sharedComponents/forImageComponents/DateTimePicker";



export default function AdjustBookingInfo(){

    const dispatch = useDispatch<AppDispatch>();
    const { toggleBooking} = useSelector((state: RootState) => state.toggleHomeMenu);  
    const {loading, status, errorMessage, ticketsDetails} = useSelector((state: RootState) => state.allTickets);

    const isYear = new Date().getFullYear();

    const ref = useRef(false);
       useEffect(() => {      
            if (ref.current === false) {
                dispatch(windowDimensionsActions());
            }
        
            return () => {
              ref.current = true;
            };
        }, [dispatch, status,ticketsDetails,errorMessage, loading]);


    return (  
       <div className={"h-[100vh] w-[100%] z-5"}>
           <section className="homeMenuWrap relative justify-end  
             flex flex-row h-full bg-sky-300 bg-opacity-30 
             w-[100%]              
            "
           >  
               {/* menu items_______________ right
               */}
                <div className="menuItemsWrap w-[60%]  md:w-[70%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%]
                    bg-white  
                ">
                    <div className="homeMenuWraper relative                  
                        min-h-[100%] w-full           
                        "
                    >
                        {/* sidebar header */}
                        <div className="sideBarWrapper  ">
                            <div className="relative">
                                <div className="bg-sky-300 
                                    h-[4em] md:h-[5em] lg:h-[6em] xl:h-[7em] 
                                    min-w-[70v]
                                    flex items-center  justify-between
                                    bg-gradient-to-tr from-white via-transparent to-sky-400

                                    px-2
                                ">
                                    <div className="relative ">  
                                      <LogoImage/>
                                    </div>
                                    <div>
                                        <h1 className="font-thinbold text-blue-950
                                          text-[20px] sm:text-base md:text-base lg:text-[26px] xl:text-[26px] ml-1"
                                        >
                                            Tui 4 you
                                        </h1>  
                                    </div>
                                    <div className="relative right-
                                       top-16 lg:top-20   xl:top-24 2xl:top-24 
                                    "
                                    >
                                        <button 
                                            onClick={()=>dispatch(toggleBookingInfoActions(toggleBooking))}
                                            className="z-5 absolute  right-10
                                             xlh-9 xlw-9 flex items-center border-4  justify-center bg-teal-50m
                                            "
                                        >
                                            <CloseIcon/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* form */}
                        <div className="cancleTicketForm relative  
                         px-6 xl:px-8 2xl:px-8
                         "
                        >
                           {/* <CancelTicketFormInput/> */}
                           <DateAndTimePicker/>
                        </div>
                        {/* siderbar footer */}
                        <div
                            className="sidebar  top-0 bottom-  text-center
                                w-full h-[99%]
                                bg-yellow-40 
                                bg-opacity-80 
                                space-x-4
                                px-1f
                                flex flex-col  justify-evenly                               
                            "
                        >    
                            <div className="absolute w-full bg-gray-60 flex flex-col  bottom-0  ">
                                Developer:  
                                <span className="text-teal-100 bg-amber-900 bg-opacity-25 px-1 ">
                                Magima Felix 
                                </span>
                               <span className="px-0.5 bg-white">©️ <span className="px-1">{isYear}</span></span>
                            </div>
                        </div>
                    </div>
                 </div>
               
            </section>
      </div>
  )

}


