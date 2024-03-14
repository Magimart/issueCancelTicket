import mongoose from 'mongoose'
import { Schema, Types } from 'mongoose';
import { BookingOrderInitials } from '@/lib/types/MyTypes';

const BookingSchemaOrder = new Schema({
    transactions: {
       paymentConfirmation: {
         type: Boolean, 
         required: false
       },
       paymentMethods: {
            methodType:{
                type: String, 
                required: false
            },
            electronicCard: {
                type: Boolean, 
                required: false
            },
            paypal: {
                type: Boolean, 
                required: false
            },
            otherMethods: {
                type: Boolean, 
                required: false
            },
      },
      transactionMessage: {
        type: String, 
        required: false
      },
      transactionConfirmationDate: {
        type: Date, 
        required: false
      },
      currency: {
        type: String, 
        required: false
      },
    },

    ticket: [
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
export default  mongoose.models.BookingOrder ||  mongoose.model<BookingOrderInitials>("BookingOrder", BookingSchemaOrder);



















