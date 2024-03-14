"use client"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getBookingOrderDetailsActions } from "@/redux/ticketSlice/allBookingActions";
import { getFullDayTime } from "@/lib/utils/helpers";


const BookingOrdersDetailModel =(params : {id: string}) => {

  const {bookingOrder,} = useSelector((state: RootState) => state.allBooking);
  const {orderStatus, orderMessage, orderError, order, bookingOrderDetails} = bookingOrder;
  const {transactions, ticket} = order;

  const { orderDetails, ticketDetails} = bookingOrderDetails;
  console.log(orderDetails)

const {  paymentConfirmation, paymentMethods, transactionConfirmationDate, transactionMessage}= orderDetails.transactions;
  const {electronicCard, paypal, methodType} = paymentMethods;
  const { airlineName, departure,destination, arrivalTime, departureTime, numberOfTransfers,
     flightNumber, costPrice, ticketStatus, createdAt
   } = ticketDetails;
  const {price, currency } = costPrice; 
  const {canclellation, isTicketBooked} = ticketStatus;
  const orderId = orderDetails && orderDetails._id;
  let ticketId = ticketDetails && ticketDetails._id;

  const dispatch = useDispatch<AppDispatch>();
 let isId = ""
  useEffect(()=>{
   dispatch(getBookingOrderDetailsActions(isId))
  }, [dispatch, isId])
  
  return (
    <main 
      className="homeComponentWrapper 
       p-0 m-0 w-[100%] h-full left-0 right-0
       relativeg absolute flex items-center 
      " 
    >
      <div className="w-[100vw] relative top-24 min-h-screen bg-gradient-to-t from-white to-sky-300 py-10 ">
            <h1 className="text-xl font-bold text-center py-12">booking Information</h1>
            <div className="w-[100%] mx-auto flex flex-col  sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-1 px-5">   
                <div className="w-full sm:w-[40%] md:w-[40%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%] 
                    flex flex-col md:flex-row bg-white   rounded-xl md:bg-transparent shadow-lg shadow-black/20 md:shadow-none gap-1">
                    <div className="min-w-[] bg-white shadow-lg rounded-md  hover:bg-gradient-to-r hover:from-red-50 hover:to-sky-50">
                        <div className="w-full h-[5em] items-center 
                        flex  flex-row 
                            bg-gradient-to-t from-white to-sky-300
                        "
                        >
                        <h2 className="font-bold text-lg pb-4 px-3">Booking Number: <span className="text-md font-normal">{orderId}</span> </h2>                     
                    </div>
                        <div className="relative w-[100%]">
                            <div className="flex flex-col  divide-y-2 ">
                                <h3 className="p-4 font-bold text-lg"> Transactions </h3>
                                <span className="p-4 font-semibold text-md"> Transaction Date:<span className="ml-1 font-normal ">{getFullDayTime(transactionConfirmationDate) }</span> </span>                         
                                <span className="p-4 font-semibold text-md"> Payment Methods:<span className="ml-1 font-normal ">{electronicCard?"electronic pay": "paypal"} </span> </span>
                                <span className="p-4 font-semibold text-md"> Payment confirmation: <span className="ml-1 font-normal ">{paymentConfirmation?"Completed": "payment not completed"} </span> </span>
                            </div>                       
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-[60%] md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] 
                        flex flex-col md:flex-row bg-white   rounded-xl md:bg-transparent shadow-lg shadow-black/20 md:shadow-none gap-10">
                    <div className="min-w-[] bg-white shadow-lg rounded-md  hover:bg-gradient-to-r hover:from-red-50 hover:to-sky-50">
                        <div className="w-full h-[5em] items-center
                         bg-sky-200f flex  flex-row 
                         bg-gradient-to-t from-white to-sky-300 
                        "
                        >
                        <h2 className="font-bold text-lg pb-4 px-3">Ticket Number: <span className="text-md font-normal">{ticketId}</span> </h2>
                    </div>
                        <div className="relative  w-[100%] ">
                            <div className="flex flex-col  divide-y-2 ">
                                <h3 className="p-4 font-bold text-lg"> Flight Details </h3>
                                <span className="p-4 flex flex-row justify-start space-x-12">
                                    <span className="font-semibold text-md"> Airline: <span className="ml-1 font-normal ">{airlineName} </span> </span>
                                    <span className="font-semibold text-md"> Flight Number: <span className="ml-1 font-normal ">{flightNumber} </span> </span>
                                    <span className="font-semibold text-md"> Number of Transfers: <span className="ml-1 font-normal ">{numberOfTransfers}</span></span> 
                                </span> 
                                <span className="p-4 flex flex-row justify-start space-x-12">
                                <span className="font-semibold text-md"> Departure:  <span className="ml-1 font-normal ">{departure} </span> </span>
                                <span className="font-semibold text-md"> Destination: <span className="ml-1 font-normal ">{destination} </span></span> 
                                </span>  
                                <span className="p-4 flex flex-row justify-start space-x-12">
                                    <span className="font-semibold text-md"> Departure Time: <span className="ml-1 font-normal ">{getFullDayTime(departureTime)}</span></span> 
                                </span> 
                                <span className="p-4 flex flex-row justify-start space-x-12">
                                    <span className="font-semibold text-md"> Arrival Time: <span className="ml-1 font-normal ">{getFullDayTime(arrivalTime)}</span></span> 
                                </span>
                                <span className="p-4 flex flex-row justify-start space-x-12">
                                    <span className="font-semibold text-md"> Price:  {price}</span>
                                    <span className="font-semibold text-md">{currency}</span> 
                                </span>                                             
                            </div>                       
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </main>
  )
} 

export default BookingOrdersDetailModel;












