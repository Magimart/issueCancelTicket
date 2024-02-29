import dbConnect from '@/lib/dbConnect';
import { NextResponse, } from 'next/server';
import Ticket from "@/models/ticketModel";
import type { TicketInitials } from '@/lib/types/MyTypes';

// get ticketByID end point http://localhost:3000/api/tickets/ticket_details/:id
export async function GET( request: Request,{ params }: { params: { id: string}}) {                       
    try {
        await dbConnect()
        const safariDetails = await Ticket.findById(params.id);
        let response = new NextResponse(JSON.stringify(safariDetails), {status:200}); 
        return response;   
    } catch (error) {
        const errorMessage:string = "INVALID TICKET check your ticket please."
        console.log(errorMessage);
        return new NextResponse(errorMessage + error, {status: 500});
    }
}


// update or change ticket details end point http://localhost:3000/api/tickets/ticket_details/:id
export async function PATCH(req: Request, {params}: {params: {id: string}}) {
    
    try {
       await dbConnect()
       if(req.method !== "PATCH")return; 
       else { 
            try {  
                const reqBody  = await req.json();
                let cancellationDefaultDate: any = Date.now()
                let {
                    airlineName, 
                    departure, departureTime,seatNumber, numberOfTravelers, destination,
                    arrivalTime, costPrice, ticketStatus, user,
                    createdAt                      
                } = reqBody as any;  // add types check!!!

                console.log(reqBody)

                let doc = await Ticket.findOneAndUpdate({_id:params.id}, {
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
                        "ticketStatus.canclellation.canclellationDate": ticketStatus !== undefined && cancellationDefaultDate,   
                        "ticketStatus.canclellation.cancellationState":ticketStatus !== undefined && ticketStatus.canclellation.cancellationState,
                        "ticketStatus.canclellation.reasons":ticketStatus !== undefined && ticketStatus.canclellation.reasons,
                        user,                      
                        createdAt:Date.now()
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
                return new NextResponse("Ticket was not updated please try again" + error, {status: 500})
            }
       };
    } catch (error) {
        console.log(error)
    }   
};

// delete ticket from the database point http://localhost:3000/api/tickets/ticket_details/:id
export async function DELETE( request: Request,{ params }: { params: { id: string}}) {                       
    try {
        await dbConnect()
        const safariDetails = await Ticket.findByIdAndRemove(params.id);
        let response = new NextResponse(JSON.stringify(safariDetails), {status:200}); 
        return response;   
    } catch (error) {
        return new NextResponse("Ticket was not deleted" + error, {status: 500});
    }
}



