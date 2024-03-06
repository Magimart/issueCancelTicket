"use client"
import React, { useEffect, useRef } from "react"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";


export default function LoggedInUserSession(){
    const {userSession} = useSelector((state: RootState) => state.authUsers);
    const {userEmail, userName } = userSession;
   return (
        <div className="sticky top-0 w-max  p-1 bg-sky-200 flex flex-col">               
            <h3 className="bg-red-600 text-white p-1">{userName.length?"Logged in as ": "Your not logged in"}</h3>
            <h4 className="p-1 bg-white">{userName}</h4>
            <p className="text-xs p-1">{userEmail}</p>
        </div>
   )
}