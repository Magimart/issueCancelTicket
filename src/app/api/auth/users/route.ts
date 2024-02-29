import dbConnect from '@/lib/dbConnect';
import { NextResponse, } from 'next/server';
import User from '@/models/usersModel';


//api http://localhost:3000/api/auth/users
export  async function GET(req: Request, res: Response) {

    try {
      const { method } = req;
       await dbConnect()
        
      if(method !== "GET") {return}else{
        try {
          const allUsers = await User.find({})
           let response = new NextResponse(JSON.stringify(allUsers), {status:200, 
           });                   
          return response;
            
        } catch (error) {
            return new NextResponse("error fetching users with GET method" + error, {status: 500})
        }
      };
    } catch (error) {
        console.log(error)
    }
   
  }















