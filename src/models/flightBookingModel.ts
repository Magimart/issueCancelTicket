import mongoose from 'mongoose'
import { Schema, Types } from 'mongoose';
import { BookingInitials } from '@/lib/types/MyTypes';

const BookingSchema = new Schema({
    title: String,
    flightNumbers:{
        type: Array, 
        required: false,
     },
    numberOfTravelers: {
        type: Number, 
        required: false,
    },
    seatNumber: {
        type: Array, 
        required: false,
     },
     totalPerson: {
        price:  {
            type: Number, 
            required: false,
        },
        currency: {type: String},
    },
    Ticket: [
        { 
      type: Schema.Types.ObjectId,
      ref: "Ticket"
    }],
    user: [
        { 
      type: Schema.Types.ObjectId,
      ref: "User"
    }
    ], 
    createdAt: {
        type: Date,
        default: Date.now
    }
  
});
export default  mongoose.models.Booking ||  mongoose.model<BookingInitials>("Booking", BookingSchema);



















