"use client"
import BookingOrdersDetailModel from "@/components/bodyComponents/BookingOrderDetails";
import React from "react";

type Params = {
  params : {id: string}
}

const BookingOrdersDetailPage =({params : {id}}: Params) => {
  return (
    <main 
      className="homeComponentWrapper 
       p-0 m-0 w-full h-full left-0 right-0
       relativeg absolute flex items-center 
      " 
    >
      <BookingOrdersDetailModel id={id}/>
    </main>
  )
} 

export default BookingOrdersDetailPage;

