//  end point for booking orders Post,  delete, Update
// Dynamic route for Get By ID, Post, Delete by ID, Patch by ID
import dbConnect from '@/lib/dbConnect';
import { NextResponse, } from 'next/server';
import Ticket from "@/models/ticketModel";
import type { TicketInitials, BookingOrderInitials } from '@/lib/types/MyTypes';
import axios from 'axios';
import BookingSchemaOrder from "@/models/bookingOrderModel";


// create booking order
//_______add new tickets end point http://localhost:3000/api/bookings/orders/
export  async function POST(req: Request, res: Response) {

  try {
    const { method } = req;
     await dbConnect() 
    if(method !== "POST") {return}else{
      try {       
        const formdata= await req.json();
        const {ticketId, userId} = formdata;       
     
        // find Ticket obj and update field isTicketBooked to true is payment succeeds
        const order = await new BookingSchemaOrder<BookingOrderInitials>({
          bookingId: "",
            transactions: {
              paymentConfirmation: false,
              paymentMethods: {
                methodType:"stripe",
                electronicCard: true,
                paypal: false,
                otherMethods: false
              },
              transactionMessage: "Payment by visa card is been approved",
              transactionConfirmationDate:  new Date, // only if event is true
              currency: "USD",
            }, 
            ticket: ticketId,  
            user: userId, 
           createdAt: new Date
        });

        const bookeFlight = {
           res: await order.save(),
           message: "Your booking order was successful"
        }
      
        let response = new NextResponse(JSON.stringify(bookeFlight), {status:200});      
        return response;  

      } catch (error) {     
        const errorMsg = {
          res: {
            error,
            message:"Sory we are unable to book your order, Please try again."
          }
       }
        return new NextResponse(JSON.stringify(errorMsg), {status: 500})
      }
    };
  } catch (error) {
      console.log(error)
  }
}






