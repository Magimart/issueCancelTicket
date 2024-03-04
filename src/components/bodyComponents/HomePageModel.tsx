"use client"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Link from "next/link";
import SideBarTicketLogin from "../headerComponents/SideBarTIcketLogin.tsx";
import { toggleShowHideHomeMenuActions } from "@/redux/toggleSlice/toggleActions";
import { getAllTicketAction, searchFlightAvailabilityAction } from "@/redux/ticketSlice/allTicketsActions";
import FlightAvailability from "../headerComponents/FlightAvailability";

const HomePageModel = () => {

  const dispatch = useDispatch<AppDispatch>();
  const {isOpen} = useSelector((state: RootState) => state.toggleHomeMenu);

  return (
    <main 
      className="homeComponentWrapper 
      p-0 m-0 w-screen h-full right-0 absolute flex items-center 
      " 
    >  
       {/* canceltiket  amedues: 1053  */}
       {
        isOpen && <SideBarTicketLogin />
       }
                 
      {/*home component  */}
      <div className="fixed  
          flex flex-rowxl flex-col 
          2xl:min-h-[20vh] 
          h-[32%] sm:h-[60%]   md:h-[60%]  md:lg:h-[60%]  lg:h-[60%]  xl:h-[82%]  2xl:xl:h-[82%] 
          w-full text-white"
        >
          <div className="bg-sky-300 flex justify-center items-center relative  
             min-h-[50vh] 
             w-full 
             -top-[8em] sm:-top-[1em]  md:-top-[1em] lg:top-[0em] xl:top-[3em] 2xl:top-[3em]
           "
          >
            <div className="cancellationCardWrapper h-[30vh] p-4 rounded-lg
                w-[70%]  md:w-max lg:w-max xl:w-max  2xl:xl:w-max
                bg-gradient-to-tr from-white via-transparent to-sky-400"
              > 
              <div className="relative bg-white flex w-full justify-end">
                  <div className="bg-red-600 flex items-center justify-center  rounded-full absolute  -top-12 -right-10 h-[7em] w-[7em]">
                      <div className="relative w-full ">
                        <h4 className="text-xs words-breakp space-y-1 flex flex-col items-center"> 
                          <span>Last </span>
                          <span>Minute </span>
                          <span className="bg-red-600 py-1 px-2 rounded-md font-thinbold text-[18px]">Cancelations</span>
                        </h4>
                      </div> 
                  </div>
              </div>
              <div className="relative h-full wu-full">
                  <div className="flex items-center h-full pt-5 ">
                    <h3 className=" text-blue-950 font-light text-[20px]  px-3">
                        Do not worry you are just one click away
                    </h3>
                    <div className="absolute w-full flex justify-end">
                        <button className="relative hover:bg-gradient-to-tr from-white via-transparent to-sky-400
                          hover:text-blue-950 top-[50px] py-1 px-4 rounded-2xl right-6 
                          hover:bg-transparent bg-red-600"
                          onClick={()=>dispatch(toggleShowHideHomeMenuActions(isOpen))}
                          >
                            Continue with your Cancelations
                        </button>
                    </div>
                  </div>
              </div>
            </div>
          </div>         
      </div>
    </main>
  )
} 


export default   HomePageModel;


