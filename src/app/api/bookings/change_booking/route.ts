import dbConnect from '@/lib/dbConnect';
import { NextResponse, } from 'next/server';
import axios from 'axios';
import Booking from '@/models/flightBookingModel';
import Ticket from "@/models/ticketModel";
import type { TicketInitials, Ids } from '@/lib/types/MyTypes';
import moment from 'moment';
import { getFullDayTime } from '@/lib/utils/helpers';
// get all booking
export  async function GET(req: Request, res: Response) {
  try {
    const { method } = req;
     await dbConnect()
      
    if(method !== "GET") {return}else{
      try {
        
          const isBody = await req.json()  // for later!!!!!!!!!!
         // const cheapestPrices:any = await fetch(`https://api.travelpayouts.com/v1/prices/monthly?origin=${origin}&destination=${destination}&currency=USD&token=${process.env.TRAVEL_PAYOUT_TOKEN}`)
          //let fly = await cheapestPrices.json()

        const response =  new NextResponse(JSON.stringify(isBody), {status:200});                   
         res =  response;
         return res;  
      } catch (error) {
          return new NextResponse("we are not able t0 find flights at this time my you adjust your dates" + error, {status: 500})
      }
    };
  } catch (error) {
      console.log(error)
  }
 

}

// cancel
export async function PATCH(req: Request, res: Response) {
    
  try {
     await dbConnect()
     if(req.method !== "PATCH")return; 
     else { 
          try {  
              const reqIds  = await req.json();
              let cancellationDefaultDate: any = Date.now()
              const cancel = reqIds.cancel;
              const ticketDetails = reqIds.ticketsDetails;
              const userId= reqIds.user;
              let {
                  airlineName, _id,
                   destination, departure, departureTime,seatNumber, numberOfTravelers, 
                  arrivalTime, costPrice, ticketStatus, user, createdAt                      
              } = ticketDetails;
              let doc = await Ticket.findOneAndUpdate({_id}, {
                  $set: {
                      airlineName,
                      departure, 
                      destination,
                      departureTime, 
                      arrivalTime, 
                      seatNumber,
                      numberOfTravelers,
                      "costPrice.price": costPrice !== undefined && costPrice.price,
                      "costPrice.currency": costPrice !== undefined && costPrice.currency,
                      "ticketStatus.canclellation.canclellationDate": ticketStatus !== undefined && getFullDayTime(cancellationDefaultDate),  
                       "ticketStatus.canclellation.cancellationState":ticketStatus.canclellation.cancellationState = cancel?true:false,
                      "ticketStatus.canclellation.reasons":ticketStatus !== undefined && ticketStatus.canclellation.reasons,
                      user:userId,                      
                      createdAt
                  } as unknown as TicketInitials,
              },
              {
               upsert: true,
                returnDocument: 'after',
              },
              );
  
            let response = new NextResponse(JSON.stringify(doc), {status:200});            
            return response;  
          } catch (error) {
             let errorMsg = {
                 error,
                message:"We are unable to cancel Ticket, please try again."
             }
            return new NextResponse(JSON.stringify(errorMsg), {status: 500})
          }
     };
  } catch (error) {
      console.log(error)
  }   
};




















