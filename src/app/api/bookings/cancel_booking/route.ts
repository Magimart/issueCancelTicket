import dbConnect from '@/lib/dbConnect';
import { NextResponse, } from 'next/server';
import axios from 'axios';
import Booking from '@/models/flightBookingModel';


// get all booking
export  async function GET(req: Request, res: Response) {
  try {
    const { method } = req;
     await dbConnect()
      
    if(method !== "GET") {return}else{
      try {


         let  origin= 'BER'
         let  destination= 'LON'
         let departDate= '2024-10'
        let  returnDate= '2024-11'
        
           const isBody = await req.json()

          console.log("ööööööööööööööööö  GETTTTTTTTT", await req.json())
        //@ts-ignore          
          // const {airline, origin} = req.newTicket;

          const cheapestPrices:any = await fetch(`https://api.travelpayouts.com/v1/prices/monthly?origin=${origin}&destination=${destination}&currency=USD&token=${process.env.TRAVEL_PAYOUT_TOKEN}`)
          let fly = await cheapestPrices.json()

          console.log(cheapestPrices)

        // const { bookingName , flightNumbers ,numberOfTravelers ,
        //    number, seatNumber ,totalPerson ,ticket , user , createdAt} = isBody;


          const createBooking = await new Booking({


          })

          const response =  new NextResponse(JSON.stringify(fly), {status:200});                   
         res =  response;
           console.log(res)
         return res;  
      } catch (error) {
          return new NextResponse("we are not able t0 find flights at this time my you adjust your dates" + error, {status: 500})
      }
    };
  } catch (error) {
      console.log(error)
  }
 

}

//___ add booking
export  async function POST(req: Request, res: Response) {
  try {
    console.log(" it new one booking folder üüüüüüüüüüüüüüüüüüü")
    const { method } = req;
     await dbConnect()
      
    if(method !== "POST") {return}else{
      try {
           const isBody = await req.json()
           console.log(isBody, "____req---body")

          
        const response =  new NextResponse(JSON.stringify(isBody), {status:200});                   
         res =  response;
        console.log(res)
         return res;  
      } catch (error) {
          return new NextResponse("we are not able t0 find flights at this time my you adjust your dates" + error, {status: 500})
      }
    };
  } catch (error) {
      console.log(error)
  }
 
}




















