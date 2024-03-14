"use client"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getBookingOrderByIdActions } from "@/redux/ticketSlice/allBookingActions";

type Params = {
  params : {id: string}
}

const BookingOrders =() => {
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef(false); 
  console.log("thisis the id ==> ") 

  
   useEffect(()=>{
      // if(typeof ticket === 'string'){
      //   setFetch(true);              
      //   //dispatch(getTicketDetailsAction(ticket));
      //   setTicket("");
      // }return;

        //dispatch(getBookingOrderByIdActions(id));

   }, [])

  return (
    <main 
      className="homeComponentWrapper 
      p-0 m-0 w-screen h-full left-0 right-0
      relativeg absolute flex items-center 
      " 
    >
      <h2>All Booking Orders</h2>
    </main>
  )
} 

export default   BookingOrders;

