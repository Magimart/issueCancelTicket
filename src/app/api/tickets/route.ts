import dbConnect from '@/lib/dbConnect';
import { NextResponse, } from 'next/server';
import Ticket from "@/models/ticketModel";
import axios from 'axios';

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
          return new NextResponse("Something wrong please reload page" + error, {status: 500})
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

        let defaultCancellation: string = "default"
        let cancellationDefaultDate: any = Date.now()

        const formdata= await req.json();
       console.log(formdata)
        const {   
            airlineName, 
            departure, departureTime, numberOfTravelers,destination,
            arrivalTime,seatNumber, costPrice, ticketStatus, user,
            createdAt 
        } = formdata as any; 
  
        const {canclellation, isTicketBooked} = ticketStatus;
        const {cancellationState, reasons, canclellationDate } = canclellation;
         const { price, currency } = costPrice;

        const ticket = await new Ticket({
          airlineName, 
          departure,
          destination,
          departureTime:Date.now(),
          arrivalTime:Date.now(),
          seatNumber,
          numberOfTravelers,
          costPrice: { price, currency },
          ticketStatus: {
            canclellation: {
              canclellationDate: cancellationDefaultDate,
              cancellationState,
              reasons:defaultCancellation
            },
            isTicketBooked: false
          },
          user: [],
          createdAt: Date.now()          
        });

        const res = await ticket.save();
        let response = new NextResponse(JSON.stringify(res), {status:200}); 
        
        return response;
          
      } catch (error) {
          return new NextResponse("Sory were were unable to save your ticket, try again" + error, {status: 500})
      }
    };
  } catch (error) {
      console.log(error)
  }
}











