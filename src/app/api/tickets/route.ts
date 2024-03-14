import dbConnect from '@/lib/dbConnect';
import { NextResponse, } from 'next/server';
import Ticket from "@/models/ticketModel";
import axios from 'axios';
import { getFullDayTime } from '@/lib/utils/helpers';
import { TicketInitials } from '@/lib/types/MyTypes';

export  async function GET(req: Request, res: Response) {
  try {
    const { method } = req;
     await dbConnect() 
      
    if(method !== "GET") {return}else{
      try {   

        const tickets = await Ticket.find({})
        let response = new NextResponse(JSON.stringify(tickets), {status:200, 
      
         });                   
        res = response;
        return res;
          
      } catch (error) {
          return new NextResponse("Something went wrong please reload page" + error, {status: 500})
      }
    };
  } catch (error) {
      console.log(error)
  }
 
}

//_______add new tickets end point
export  async function POST(req: Request, res: Response) {

  try {

    const { method } = req;
    await dbConnect()
    if(method !== "POST") {return}else{
      try {        
        const formdata= await req.json();
        const loggedUser = formdata.user;
        const {
          origin, airline,price, departure_at, return_at,
           expires_at, destination, flight_number, transfers
        } = formdata.flight;

        let defaultTicketStatus = {
          canclellation: {
            canclellationDate: new Date,
            cancellationState : false,
            reasons: "unknown reasons"   // change at enum
          },
          isTicketBooked: false
        }
        let defaultPrice = {
          price: price, currency :"USD"
        }
        
        const ticket = await new Ticket({
          airlineName: await airline,
          departure: await origin,
          destination:destination,
          departureTime: departure_at,
          arrivalTime : getFullDayTime( await return_at),
          numberOfTransfers: transfers,
          flightNumber: flight_number,
          costPrice: defaultPrice,
          ticketStatus: defaultTicketStatus,
          expiresAt: expires_at,
          user: loggedUser,
          createdAt: getFullDayTime(new Date)
         } as object as TicketInitials );
        
        const bookeFlight = {
           res: await ticket.save(),
           message: "Your flight has been successfull booked"
        }
        let response = new NextResponse(JSON.stringify(bookeFlight), {status:200}); 
        return response;
          
      } catch (error) {
          let errorMsg = {
              error,
            message:"Sory we are unable to book your flight, Please try again."
          }
        return new NextResponse(JSON.stringify(errorMsg), {status: 500})
      }
    };
  } catch (error) {
      console.log(error)
  }
}











