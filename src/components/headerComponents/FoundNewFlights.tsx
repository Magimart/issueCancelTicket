import Image from 'next/image';
// import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useRef } from "react";
import { useRouter } from 'next/router';

export default function FoundNewFlights(){

    const {loading, ticketsDetails, foundNewFlights} = useSelector((state: RootState) => state.allTickets);
    const {userSession} = useSelector((state: RootState) => state.authUsers);
    const {userName, userEmail} = userSession;
    const {toggleBooking} = useSelector((state: RootState) => state.toggleHomeMenu);  
    const {cheapRecommendedFlights, foundFlights} = foundNewFlights;
    console.log(cheapRecommendedFlights)

  
    const dispatch = useDispatch<AppDispatch>();

  return (
        <div className="bg-white p-8 rounded-md min-h-screen w-[100%]">
            <div className=" flex items-center justify-between pb-6">
                <div className="">
                    <h2 className="text-gray-600 font-semibold">Found Flights</h2>
                    <span className="text-xs">Found Flights</span>
                </div>
                </div>
                <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                              {/*table head  */}
                                <thead>
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Airline or Flight No.
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Departure and Destination
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Travel Date and Time
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Prices and Transfers
                                        </th>
                                       
                                    </tr>
                                </thead>
                                {/* table body */}
                                <tbody className=" p-3 m-5">
                                   <tr className="relative bg-red-600 text-white tr-3 first-letter:flex flex-row justify-center h-24 w-[100%"> 
                                        <span className="">
                                           Flights matched your search
                                        </span>
                                    </tr>
                                    {
                                      foundFlights && foundFlights.map((el, i)=>{
                                        return(
                                            <tr className=" p-5" key={i}>
                                                <td className="px-5 className=  border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                        
                                                        </div>
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                <span className="bg-sky-200 p-1">{el && el[1].airline} </span> 
                                                                Number: <span className="bg-sky-200 p-1">{el && el[1].flight_number} </span> 
                                                                </p>
                                                            </div>
                                                        </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="flex m-w-56 flex-col text-gray-900 whitespace-no-wrap">
                                                    <span>Departure: {el && el[1].origin}</span>
                                                    <span>Destination : {el && el[1].destination}</span>
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                    <span>Departure Time: {el && el[1].departure_at}</span>
                                                    <span> Return Time : {el && el[1].return_at }</span>
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                    <span>Price: {el && el[1].price}</span> USD
                                                    <span>Transfers: {el && el[1].transfers}</span>
                                                    </p>
                                                </td>  
                                            </tr> 
                                        )
                                      })
                                    }
                                    {/* chaep recommended prices */}
                                    <tr className="relative bg-red-600 text-white p-3 flex flex-row justify-center h-24 w-[100%]"> 
                                        <span className="">
                                           Flights recommended for you
                                        </span>
                                    </tr>
                                    {
                                       cheapRecommendedFlights && cheapRecommendedFlights.map((el, i)=>{
                                        return(
                                            <tr className=" p-5" key={i}>
                                            <td className="px-5 className=  border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                      
                                                    </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                              <span className="bg-sky-200 p-1">{el && el.airline} </span> 
                                                              Number: <span className="bg-sky-200 p-1">{el && el.flight_number} </span> 
                                                            </p>
                                                        </div>
                                                    </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="flex m-w-56 flex-col text-gray-900 whitespace-no-wrap">
                                                   <span>Departure: {el && el.origin}</span>
                                                   <span>Destination : {el && el.destination}</span>
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                   <span>Departure Time: {el && el.departure_at}</span>
                                                   <span> Return Time : {el && el.return_at }</span>
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                   <span>Price: {el && el.price}</span> USD
                                                   <span>Transfers: {el && el.transfers}</span>
                                                </p>
                                            </td>  
                                            </tr> 
                                         )
                                       })  
                                    }
                              
                                </tbody>
                            </table>
                            {/* content impliment pagination
                            */}
                            <div
                                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                <span className="text-xs xs:text-sm text-gray-900">
                                    Showing 1 to 4 of 50 Entries
                                </span>
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                        Prev
                                    </button>
                                    &nbsp; &nbsp;
                                    <button
                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
      
  )

}