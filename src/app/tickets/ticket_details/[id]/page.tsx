"use client"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import { getTicketDetailsAction } from "@/redux/ticketSlice/allTicketsActions";

type Params = {
  params : {id: string}
}


export default function SafariDetailsPage({params : {id}}: Params) {

  const {loading, ticketsDetails} = useSelector((state: RootState) => state.allTickets);
  const { isOpen} = useSelector((state: RootState) => state.toggleHomeMenu);

  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef(false);
    
    const {
      _id,   
      airlineName, 
      departure, departureTime, numberOfTravelers,destination,
      arrivalTime,seatNumber, costPrice, ticketStatus, user,
      createdAt 
    } = ticketsDetails;

    useEffect(() => {
       console.log(id, ticketsDetails)
      if (ref.current === false) {        
       dispatch(getTicketDetailsAction(id));
      }
      return () => {
        ref.current = true;
      };
    }, [dispatch, id, loading, ticketsDetails]);



    return (
      <main className={`singlePageWraper ${!isOpen?"":"fixed"} z-1  bg-yellow-00`}>
        <div className="bg-sky-300 py-24 sm:py-32 w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
            </div>
            <div className="mx-auto mt-16 max-w-7xl rounded-3xl ring-1 ring-red-600 
               sm:mt-20 lg:mx-0 lg:flexc lg:max-w-nonec
               bg-gradient-to-b from-transparent via-sky-50 to-sky-300
              "
            >
              <div className="relative  p-8 sm:p-10 lg:flex-auton">
                <h3 className="text-2xl font-bold tracking-tight text-blue-900">With Tui 4 U cancellations and adjustments are made with ease</h3>
                  <div className="relative flex flex-rowg space-x-4">
                   <h4 className="mt-6 text-base leading-7 text-gray-600">
                       <span className="font-semibold">Booking Number</span>: {_id.toLocaleUpperCase()}
                    </h4>
                    <h4 className="mt-6 text-base leading-7 text-gray-600">
                      <span className="font-semibold">Name</span>: John Dee
                    </h4>
                    <h4 className="mt-6 text-base leading-7 text-gray-600">
                      <span className="font-semibold">Price</span>: {costPrice.price}
                        <span className="font-normal pl-1">{costPrice.currency}</span>
                    </h4> 
                    <h4 className="mt-6 text-base leading-7 text-gray-600">
                      <span className="font-semibold">Airlines</span>: {airlineName}
                    </h4>
                  </div>
                  <div className="relative flex flex-row space-x-4">
                    <h4 className="mt-6 
                      text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base
                      leading-7 text-gray-600"
                    >
                      <span className="font-semibold"> Departing From<span className="font-normal">(s)</span></span>: 69930022ßß
                    </h4>
                    <h4 className="mt-6 
                      text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base
                      leading-7 text-gray-600"
                    >                      <span className="font-semibold"> Seat Number
                        <span className="font-normal">(s)</span>
                        </span >: <span className="flex flex-row">
                        {
                          seatNumber.map((el, i)=>{
                            return(
                              <span key={el}
                                className="relative flex flex-row">
                                 <p>
                                   {`${i+1}`}: <span className="mr-1 font-bold">{el}</span>
                                 </p>
                              </span>
                            )
                          })
                        }
                        </span>
                    </h4>
                    <h4 className="mt-6 
                      text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base
                      leading-7 text-gray-600"
                    >                      <span className="font-semibold"> 
                       Number of Travelers<span className="font-normal">(s)
                      </span>
                    </span>: {seatNumber.length}
                    </h4>
                    <h4 className="mt-6 
                      text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base
                      leading-7 text-gray-600"
                    >                      <span className="font-semibold">Departure  
                      </span>: 12:00 Uhr
                    </h4>
                  </div>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 ">
                    What would you like to do?
                  </h4>
                  <div className="h-px flex-auto bg-red-400"></div>
                </div>
                <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    Check out for our fund policies
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    availlabity insights for vacations
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    missed flights
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    Lost travel documents
                  </li>
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full
                   bg-gradient-to-b from-sky-transparent via-sky-200 to-sky-300
                  lg:max-w-md lg:flex-shrink-0"
                >
                <div className="rounded-b-3xl bg--400 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-row lg:justify-centerx lg:py-16">
                  <div className="mx-auto max-w-lg px-8">
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-xl font-bold tracking-tight text-gray-900">Toll free</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">0001800 000</span>
                    </p>
                    <a href="#" className="mt-10 block w-full rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white
                      shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 
                      focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Call us
                    </a>
                    <p className="mt-6 text-xs leading-5 text-gray-600">Please terms and conditions for ticket adjustments and cancellations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>    
    )
}




