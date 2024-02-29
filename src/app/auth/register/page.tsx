"use client"
import React, { Suspense, useEffect, useRef } from "react";
import RegisterUserModel from "@/components/authComponents/RegisterPageModel";


export default function RegisterPage() {
        
  return (
        <div className=" loginPageContainer relative m-0 p-0 w-[100%] h-full   ">
            <RegisterUserModel/>
        </div>  
    )
}
