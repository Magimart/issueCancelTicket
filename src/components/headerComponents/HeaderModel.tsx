"use client"
import React, { useEffect, useRef } from "react"
import LogoImage from "./LogoImage";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter, usePathname  } from 'next/navigation'
import LoggedInUserSession from "./LoggedInUserSession";



export default function HeaderModel(){

  const dispatch = useDispatch<AppDispatch>();
  const { isOpen} = useSelector((state: RootState) => state.toggleHomeMenu);
  const {loading} = useSelector((state: RootState) => state.allTickets);
  const {userSession} = useSelector((state: RootState) => state.authUsers);
 const {userEmail, userName } = userSession;
  
  return (
        <div className="z-1 absolute top-0  left-0  
          w-[100%] h-[4%]
          p-0 m-0
        ">
          <div className="relative ">
            <div className=" 
              flex flex-row justify-evenly space-x-7
              w-[100%]  
              relative
              px-1 xs:px-2 sm:px-5 md:px-5 lg:px-5  xl:px-5 2xl:px-5 
              py-3 xs:py-1  sm:py-1 md:py-1  lg:py-1 xl:py-1 2xl:py-1
              bg-sky-300 h-[4em] md:h-[5em] lg:h-[6em] xl:h-[7em] 
              "
            >
              <div className="w-[15%]  h-full  items-center">
                  <div className="m-w-fit flex flex-row 
                    sm:space-x-2 md:space-x-4 lg:space-x-6 xl:space-x-6 2xl:space-x-6  items-center">
                      {/* {
                        loading && loading?(
                          <Link  href={`${process.env.BASE_URL}`}>
                             {/* <LogoComponent/>                          
                             logo
                          </Link>
                        ): <IconImageLoader/>
                      } */}
                       <Link  href={`${process.env.BASE_URL}`}>
                          <LogoImage/>                        
                       </Link>                     
                  </div>
              </div>
              <div className="w-[50%] sm:w-[60%] md:w-[60%]  lg:w-[65h%]  xl:w-[70%] 2xl:w-[70%] h-full ">
                <div className="homeTitleWraper h-full  relative  w-[100%]  flex  flex-row justify-center items-center">
                  <div className="flex flex-col w-max  justify-end items-center bg-blac">
                      <span
                        className="w-full flex justify-center font-bold text-base md:text-2xl lg:text-2xl xl:text-3xl xxl:text-3xl mt-2  
                          text-blue-950  md:inline-block"
                      >
                        Ticket Resolution Center
                        <span className="mx-[5px] "> 
                            4 You
                        </span>                    
                      </span>                           
                  </div>

              </div>                  
              </div>
              <div className=" top-0 z-10 w-max text-base flex flex-row justify-end">               
                   <div>
                      <LoggedInUserSession/>
                   </div>
              </div>
            </div> 
          </div>                            
      </div>
  )

}





