"use client"
import Link from "next/link"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import React, { Suspense, useEffect, useRef } from "react";



export default function TicketPage() {

            
  return (
    <div className=" TicketPageContainer relative m-0 p-0 w-[100%] h-full   ">
      <div className=" TicketPageWrap w-[100%] h-full   ">
          Welcome to Tui 4 You all tickets to be accessed by Admin
      </div>  
    </div>  
  )
}