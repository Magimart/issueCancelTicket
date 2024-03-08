import mongoose from 'mongoose'
import { Schema, Types } from 'mongoose';
import { TicketInitials } from '@/lib/types/MyTypes';



const TicketSchema = new Schema({
    airlineName: {
        type: String, 
        required: true,
    },
    departure: {
        type: String, 
        required: true,
    },
    destination: {
        type: String, 
        required: true,
    },
    departureTime:{
        type: Date, 
        required: true,
    },
    arrivalTime:{
        type: Date, 
        required: true,
    },
    numberOfTransfers: {  
        type: Number, 
        required: true,
    },
    flightNumber: {
        type: Number, 
        required: false,
     },
    costPrice: {
        price:  {
            type: Number, 
            required: false,
        },
        currency: {type: String},
    },
    ticketStatus: {
        canclellation:  {
            canclellationDate: {
                type: String, 
                required: false,
             },
             cancellationState:  {
              type: Boolean, 
              required: false,
           },
            reasons: {
                type: String,
                required: [false, 'Please select a reason for cancelling this ticket'],
                enum: {
                    values: [
                        'default',
                        'unknown reasons',
                        'am sick and can not travel',
                        'my flight is delayed',
                        'over booking',
                        'wrong seat number',
                    ],
                    message: 'Please let us know why you are cancelling your flight'
                }
           },
        },
        isTicketBooked: {
            type: Boolean, 
            required: false,
        }
    },
    user: [
        { 
      type: Schema.Types.ObjectId,
      ref: "User"
    }
    ], 
    expiresAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
  
});
export default  mongoose.models.Ticket ||  mongoose.model<TicketInitials>("Ticket", TicketSchema);



















