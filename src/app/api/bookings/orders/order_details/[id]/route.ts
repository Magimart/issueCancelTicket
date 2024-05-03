// Dynamic route for Get By ID, Post, Delete by ID, Patch by ID
import dbConnect from '@/lib/dbConnect';
import { NextResponse, } from 'next/server';
import BookingOrder from "@/models/bookingOrderModel";
import type { TicketInitials, BookingOrderInitials } from '@/lib/types/MyTypes';
import axios from 'axios';
import { getFullDayTime } from '@/lib/utils/helpers';
import Ticket from "@/models/ticketModel";

interface BookingOrderState {
    BookingOrder:BookingOrderInitials;
    ticketDetails:TicketInitials
}

// get ticketByID end point http://localhost:3000/api/bookings/orders/order_details/:id
export async function GET( request: Request,{ params }: { params: { id: string}}) {                       
    try {
        await dbConnect();
        console.log("params id string ==>", params)
        // adjust code handle multiple ticketNumss
        let bookingNum = params.id;
        const orderDetails = await BookingOrder.findById(bookingNum)
          .populate({
            path: '_id'
         }) as BookingOrderInitials;
        let ticketId =  orderDetails.ticket.toString();
        const getTicket = await Ticket.findById(ticketId);
        const bookingOrder:BookingOrderState = {
            BookingOrder: {
                _id: orderDetails._id,
                transactions: {
                    paymentConfirmation: orderDetails.transactions.paymentConfirmation,
                    paymentMethods: {
                        methodType:orderDetails.transactions.paymentMethods.methodType,
                        electronicCard: orderDetails.transactions.paymentMethods.electronicCard,
                        paypal: orderDetails.transactions.paymentMethods.paypal,
                        otherMethods: orderDetails.transactions.paymentMethods.otherMethods,
                   },
                   transactionMessage: orderDetails.transactions.transactionMessage,
                   transactionConfirmationDate: orderDetails.transactions.transactionConfirmationDate,
                   currency: orderDetails.transactions.currency,
                 },
                 ticket:orderDetails.ticket,
                 user: orderDetails.user, 
                 createdAt: orderDetails.createdAt
            }, 
            ticketDetails:{
                _id: getTicket._id,
                airlineName: getTicket.airlineName,  
                departure: getTicket.departure,
                destination: getTicket.destination,
                arrivalTime: getTicket.arrivalTime,
                departureTime: getTicket.departureTime,
                numberOfTransfers:getTicket.numberOfTransfers, 
                flightNumber:getTicket.flightNumber, 
                costPrice: {
                    price: getTicket.costPrice.price,
                    currency:getTicket.costPrice.currency
                },            
                ticketStatus: {
                    canclellation:  {
                        canclellationDate: getTicket.ticketStatus.canclellation.canclellationDate,
                        cancellationState: getTicket.ticketStatus.canclellation.canclellationState,
                        reasons: getTicket.ticketStatus.canclellation.reasons
                    },
                    isTicketBooked:getTicket.isTicketBooked  
                },
                user: getTicket.user,   
                expiresAt:getTicket.expiresAt,
                createdAt: getTicket.createdAt
            } 
        }
 
        let response = new NextResponse(JSON.stringify(bookingOrder), {status:200}); 
         return response;   
    } catch (error) {
        const errorMessage:string = "INVALID Bookings details."
        return new NextResponse(errorMessage + error, {status: 500});
    }
}


