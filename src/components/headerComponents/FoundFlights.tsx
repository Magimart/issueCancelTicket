import React, {useEffect,useRef} from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import LogoImage from "./LogoImage";
import { windowDimensionsActions } from "@/redux/globalVariables/windowDimensions";
import { CloseIcon } from "./icons/SvgIconAssests";
import { toggleBookingInfoActions } from "@/redux/toggleSlice/toggleActions";
import FlightAvailability from "./FindFlights";
import FoundNewFlightLists from "./FoundNewFlightLists";



export default function FoundFlights(){
    const dispatch = useDispatch<AppDispatch>();
    const {loading, status, errorMessage, ticketsDetails} = useSelector((state: RootState) => state.allTickets);
    const {toggleFoundFlights} = useSelector((state: RootState) => state.toggleHomeMenu);

    useEffect(() => {      
    }, [dispatch, status,ticketsDetails,errorMessage, loading]);

    return (  
       <div className={"min-h-full w-[100%] z-10"}>
           <section className="homeMenuWrap relative justify-end  
             flex flex-row h-full  bg-opacity-30 
             w-[100%]  
             bg-red-500            
            "
           >  
              {/* search results */}
              <div className="searchWrap absolute z-12  left-0 min-h-full  w-[60%]  md:w-[70%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%]
                    bg-white
                    bg-gradient-to-b from-transparent via-sky-50 to-sky-300 

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
                                            Tui 4 U Book new Flights
                                        </h1>  
                                    </div>
                                    <div className="relative right-
                                       top-16 lg:top-20   xl:top-24 2xl:top-24 
                                    "
                                    >
                                        {/* <button 
                                            onClick={()=>dispatch(toggleBookingInfoActions(toggleBooking))}
                                            className="z-5 absolute  right-
                                             xlh-9 xlw-9 flex items-center border-4  justify-center bg-teal-50m
                                            "
                                        >
                                            <CloseIcon/>
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="FoundNewFlightLists relative  
                         px-6 xl:px-8 2xl:px-8
                         "
                        >
                          <FoundNewFlightLists/>
                        </div>                        
                    </div>
              </div>
            </section>
        </div>
  )
}



