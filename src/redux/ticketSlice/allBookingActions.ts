import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { getSession, GetSessionParams, useSession} from 'next-auth/react';
import type { CancelTicket,BookingOrderInitials,CreateOrderInitials, ResponseI, TicketInitials} from "@/lib/types/MyTypes";
import { getFullDayTime } from "@/lib/utils/helpers";


interface InitialCancelState {
  loading: boolean;
  cancelMessage: string;
  cancelStatus: number;
  errorTrigger: string;
  ticket: object;
  allBookings: object[];
  bookingOrder: {
    orderStatus: number;
    orderMessage:string;
    orderError: string;
    order:BookingOrderInitials;
    bookingOrderDetails:{ // fix types
      orderDetails: BookingOrderInitials;
      ticketDetails: TicketInitials;
    }
  };
} 

const initialState: InitialCancelState = {
  loading: false,
  cancelMessage: "",
  errorTrigger: "",
  cancelStatus: 0,
  ticket: {},
  allBookings: [],
  bookingOrder:{
    orderStatus: 0,
    orderMessage:"",
    orderError: "",
    order:  { // create order
      _id: "",
      transactions: {
        paymentConfirmation: false,
        paymentMethods: {
            methodType:"",
            electronicCard: false,
            paypal: false,
            otherMethods: false,
       },
       transactionMessage: "",
       transactionConfirmationDate: new Date,
       currency: "",
      },
      ticket: [],
      user: [], 
      createdAt: new Date
    },
    bookingOrderDetails:{ // get order details
      orderDetails: {
        _id: "",
        transactions: {
          paymentConfirmation: false,
          paymentMethods: {
              methodType:"",
              electronicCard: false,
              paypal: false,
              otherMethods: false,
         },
         transactionMessage: "",
         transactionConfirmationDate: new Date,
         currency: "",
        },
        ticket: [],
        user: [], 
        createdAt: new Date
      },
      ticketDetails: {  // order ticket details
        _id: "",
        airlineName: "",
        departure: "",
        destination: "",
        arrivalTime: new Date,
        departureTime: new Date,
        numberOfTransfers: 0,
        flightNumber: 0,
        costPrice: {
          price: 0,
          currency: ""
        },
        ticketStatus: {
          canclellation: {
            canclellationDate: new Date,
            cancellationState: false,
            reasons: ""
          },
          isTicketBooked: false
        },
        user: [],
        expiresAt: new Date,
        createdAt: new Date
      },
    }
  }
} 

// cancel booking move2TicketActions
export const changeBookingActions = createAsyncThunk("changeBookingActions", async (flight:CancelTicket):Promise<ResponseI> => {
   try {
        const respose = await axios.patch(`${process.env.BASE_URL}/api/bookings/change_booking`, flight);
        return respose as unknown as ResponseI;
    } catch (error) {
       return error as ResponseI
    }
  }
);


// create booking order
export const createBookingOrderActions = createAsyncThunk("createBookingOrderActions", async (order: CreateOrderInitials):Promise<AxiosResponse | ResponseI> => {
  try {
    const respose = await axios.post(`${process.env.BASE_URL}/api/bookings/orders`,order);
      return respose ;
   } catch (error) {
    return error as ResponseI
  }
 }
);

// get booking by Id getBookingOrderDetailsAction
export const getBookingOrderDetailsActions = createAsyncThunk("getBookingOrderDetailsActions", async (id:string):Promise<AxiosResponse | ResponseI> => {
   //let isId = "65f1935f231ed83e9633bbf0";
   console.log("thisi is the id sent   ===>", id)
  try {
    const respose = await axios.get(`${process.env.BASE_URL}/api/bookings/orders/order_details/${id}`);
      return respose ;
   } catch (error) {
    return error as ResponseI
  }
 }
);


const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    resetCancelStatusAction:(state, action)=>{
      if(action.payload === 200) state.cancelStatus = 0;
    },
  },
    
  extraReducers: (builder) => {
    builder.addCase(changeBookingActions.fulfilled, (state, action: PayloadAction<any>) => {
        if(action.type === "changeBookingActions/fulfilled"){
          const {status, data} = action.payload
          // const {message, ticket} = data;
          const ticket = data !== undefined && data.ticket
          const message = data !== undefined && data.message
          if(status === 200){
            state.loading = true;
            state.cancelStatus = status;
            state.ticket = ticket;
            state.cancelMessage = message;
            state.errorTrigger = ""
          }else{
            const {status, data} = action.payload.response;
            const {error, message} = data;
            state.loading = false;
            state.ticket = {};
            state.cancelMessage = message;
            state.cancelStatus = status; 
            state.errorTrigger = error
          }
        }
      return;
    });  
    builder.addCase(changeBookingActions.pending, (state, action: PayloadAction<any>) => {
      state.loading
    });

    // create order reducer
    builder.addCase(createBookingOrderActions.fulfilled, (state, action: PayloadAction<any>) => {
      if(action.type === "createBookingOrderActions/fulfilled"){
        const {status, data} = action.payload;
        const message = data !== undefined && data.message;
        const res = data !== undefined && data.res;
        if(status === 200){
        const {_id, user, ticket, transactions, createdAt}  = res;
        const {currency, paymentConfirmation, paymentMethods,transactionConfirmationDate, transactionMessage} = transactions;
        const {paypal, otherMethods, methodType, electronicCard}  = paymentMethods;
          state.loading = true;
          state.bookingOrder.order._id =_id;
          state.bookingOrder.orderStatus = status;
          state.bookingOrder.orderMessage =message;
          state.bookingOrder.orderError;
          state.bookingOrder.order.user.push(user[0])
          state.bookingOrder.order.ticket.push(ticket);
          state.bookingOrder.order.createdAt = createdAt;
          state.bookingOrder.order.transactions.paymentConfirmation = paymentConfirmation;
          state.bookingOrder.order.transactions.transactionConfirmationDate = transactionConfirmationDate ;
          state.bookingOrder.order.transactions.transactionMessage = transactionMessage;
          state.bookingOrder.order.transactions.currency = currency ;
          state.bookingOrder.order.transactions.paymentMethods.paypal = paypal;
          state.bookingOrder.order.transactions.paymentMethods.methodType = methodType;
          state.bookingOrder.order.transactions.paymentMethods.electronicCard = electronicCard;
          state.bookingOrder.order.transactions.paymentMethods.otherMethods = otherMethods;
        }else{
            if(action && action.payload.response.data-length === 0){
              state.loading = false;
              state.bookingOrder.orderStatus = action.payload.response.status;
              state.bookingOrder.orderMessage =action.payload.response.statusText;
            }else{
            const {status, data} =action && action.payload.response
            const {error, message} =data.res;
            state.loading = false;
            state.errorTrigger = error
            state.bookingOrder.orderStatus = status;
            state.bookingOrder.orderMessage = message;
            state.bookingOrder;
          }
        }
      }
      return;
    });  
    builder.addCase(createBookingOrderActions.pending, (state, action: PayloadAction<any>) => {
      state.loading
    });

    //get booking order details
    builder.addCase(getBookingOrderDetailsActions.fulfilled, (state, action: PayloadAction<any>) => {

        if(action.type === "getBookingOrderDetailsActions/fulfilled"){
          const {status, data} = action.payload
          if(status === 200){
             const {BookingOrder, ticketDetails} = data;
             const {_id, transactions} = BookingOrder;
             const { paymentConfirmation, paymentMethods, transactionConfirmationDate, transactionMessage}= transactions;
             const {electronicCard, paypal, methodType} = paymentMethods;
             const { airlineName, departure,destination, arrivalTime, departureTime, numberOfTransfers,
                flightNumber, costPrice, ticketStatus, createdAt
              } = ticketDetails;
             const {price, currency } = costPrice; 
             const {canclellation, isTicketBooked} = ticketStatus;
             const ticketId = ticketDetails._id;
            state.loading = true;
            state.bookingOrder.bookingOrderDetails.orderDetails._id= _id;
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.paymentMethods.electronicCard = electronicCard;
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.paymentMethods.paypal = paypal;
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.paymentMethods.methodType = methodType;
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.paymentConfirmation = paymentConfirmation;
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.transactionMessage = transactionMessage;
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.transactionConfirmationDate = transactionConfirmationDate;
            state.bookingOrder.bookingOrderDetails.ticketDetails._id = ticketId;
            state.bookingOrder.bookingOrderDetails.ticketDetails.airlineName = airlineName;
            state.bookingOrder.bookingOrderDetails.ticketDetails.departure = departure;
            state.bookingOrder.bookingOrderDetails.ticketDetails.destination = destination;
            state.bookingOrder.bookingOrderDetails.ticketDetails.departureTime = departureTime;
            state.bookingOrder.bookingOrderDetails.ticketDetails.arrivalTime = arrivalTime;
            state.bookingOrder.bookingOrderDetails.ticketDetails.numberOfTransfers = numberOfTransfers;
            state.bookingOrder.bookingOrderDetails.ticketDetails.flightNumber = flightNumber;
            state.bookingOrder.bookingOrderDetails.ticketDetails.costPrice.price = price ;
            state.bookingOrder.bookingOrderDetails.ticketDetails.costPrice.currency = currency ;
            state.bookingOrder.bookingOrderDetails.ticketDetails.createdAt = createdAt;
            state.bookingOrder.bookingOrderDetails.ticketDetails.ticketStatus.canclellation = canclellation;
            state.bookingOrder.bookingOrderDetails.ticketDetails.ticketStatus.isTicketBooked = isTicketBooked;
          }else{
            const {status, data} = action.payload.response;
            const {error, message} = data;
            state.loading = false;
            state.bookingOrder.bookingOrderDetails.orderDetails._id= "";
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.paymentMethods.electronicCard = false;
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.paymentMethods.paypal = false;
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.paymentMethods.methodType = "";
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.paymentConfirmation = false;
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.transactionMessage = "";
            state.bookingOrder.bookingOrderDetails.orderDetails.transactions.transactionConfirmationDate = new Date;
            state.bookingOrder.bookingOrderDetails.ticketDetails._id = "";
            state.bookingOrder.bookingOrderDetails.ticketDetails.airlineName = "";
            state.bookingOrder.bookingOrderDetails.ticketDetails.departure = "";
            state.bookingOrder.bookingOrderDetails.ticketDetails.destination = "";
            state.bookingOrder.bookingOrderDetails.ticketDetails.departureTime = new Date;
            state.bookingOrder.bookingOrderDetails.ticketDetails.arrivalTime = new Date;
            state.bookingOrder.bookingOrderDetails.ticketDetails.numberOfTransfers = 0;
            state.bookingOrder.bookingOrderDetails.ticketDetails.flightNumber = 0.00;
            state.bookingOrder.bookingOrderDetails.ticketDetails.costPrice.price = 0.00 ;
            state.bookingOrder.bookingOrderDetails.ticketDetails.costPrice.currency = "" ;
            state.bookingOrder.bookingOrderDetails.ticketDetails.createdAt =  new Date;
            state.bookingOrder.bookingOrderDetails.ticketDetails.ticketStatus.canclellation;
            state.bookingOrder.bookingOrderDetails.ticketDetails.ticketStatus.isTicketBooked = false;
          }
        }
      return;
    });  
    builder.addCase(getBookingOrderDetailsActions.pending, (state, action: PayloadAction<any>) => {
      state.loading
    });
  }
});
  
export const { 
  resetCancelStatusAction,
}  = bookingSlice.actions;
  
export default bookingSlice.reducer;


  






  