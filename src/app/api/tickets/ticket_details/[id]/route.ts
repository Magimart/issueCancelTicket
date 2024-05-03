import dbConnect from '@/lib/dbConnect';
import { NextResponse, } from 'next/server';
import Ticket from "@/models/ticketModel";
import type { TicketInitials } from '@/lib/types/MyTypes';

// get ticketByID end point http://localhost:3000/api/tickets/ticket_details/:id
export async function GET( request: Request,{ params }: { params: { id: string}}) {                       
    try {
        await dbConnect();
        const ticketDetails = await Ticket.findById(params.id);
            if(ticketDetails === null){
                const errorMessage:string = "INVALID TICKET, this ticket may have expired."
                return new NextResponse(errorMessage, {status: 500});
            }
            let response = new NextResponse(JSON.stringify(ticketDetails), {status:200}); 
        return response;  // 4 later remove overload unknown 
    } catch (error) {
        const errorMessage:string = "INVALID TICKET check your ticket please."
        return new NextResponse(errorMessage + error, {status: 500});
    }
}

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



