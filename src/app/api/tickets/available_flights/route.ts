import dbConnect from '@/lib/dbConnect';
import { NextResponse, } from 'next/server';
import axios from 'axios';
interface FlightSearch{
  origin: string;
  destination: string;
  departDate: Date;
  returnDate:Date
}
export  async function POST(req: Request, res: Response) {

  try {
    const { method } = req;
     await dbConnect()
      
    if(method !== "POST") {return}else{
      try {
        const search:FlightSearch = await req.json();
        console.log(search);
        const {
          origin, destination, departDate, returnDate
        } = search 

        // get cheapest ticket
        const availableFlights:any = await axios.get(`https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&destination=${destination}&depart_date=${departDate}&return_date=${returnDate}&token=${process.env.TRAVEL_PAYOUT_TOKEN}`)
        .then(function(response){
           return response.data;
        }); 
     
        // recommended prices replace hardcoded values!!!
        const cheapestPrices:any = await axios.get(`https://api.travelpayouts.com/v1/prices/monthly?origin=BER&destination=DXB&currency=USD&token=${process.env.TRAVEL_PAYOUT_TOKEN}`)
        .then(function(response){
           return response.data;
        }); 
       
        let isObj = {
          foundFlights: availableFlights,
          recommendedPrices:cheapestPrices
        } as any;

        let response =  new NextResponse(JSON.stringify(isObj), {status:200});                   
        res = response;
        console.log(res)
        return res;  
      } catch (error) {
          return new NextResponse("we are not able ti find flights at this time my you adjust your dates" + error, {status: 500})
      }
    };
  } catch (error) {
      console.log(error)
  }
 
}