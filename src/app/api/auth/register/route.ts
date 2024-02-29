import dbConnect from '@/lib/dbConnect';
import { NextResponse, } from 'next/server';
import User from '@/models/usersModel';


//api http://localhost:3000/api/auth/register
export async function POST( req: Request) { 

    try {
        await dbConnect()
        const {method} = req;     

        if(method !== "POST") {return}else{

            try {

                const reqBody= await req.json();
                console.log(reqBody);
                const {name, email, password, role} = reqBody;              
                const user = await  User.create({
                    name, email, password, 
                    role
                })

                let response = new NextResponse(JSON.stringify(user), {status:200});
                return response;
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        return new NextResponse("Sorry unble to register, try again " + error, {status: 500});
    }

};















