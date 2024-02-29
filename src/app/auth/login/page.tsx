"use client"
import React, { Suspense, useEffect, useRef } from "react";
import LoginModel from "@/components/authComponents/LoginPageModel";


export default function LoginPage() {
        
  return (
        <div className=" loginPageContainer relative m-0 p-0 w-[100%] h-full   ">
            <LoginModel/>
        </div>  
    )
}

