import { createSlice , createAsyncThunk, current} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TicketInitials } from '@/lib/types/MyTypes';

  interface IState{
    loading: boolean;
    errorMessage: string;
    status: number;
    allTickets: object[];
    ticketsDetails: TicketInitials
  }

  const initialState:IState = {
    loading: false,
    status: 0,
    errorMessage:"",
    allTickets: [],
    ticketsDetails: {
      _id: "",
      airlineName: "",
      departure: "",
      destination: "",
      arrivalTime: new Date(),
      departureTime: new Date(),
      numberOfTravelers: 0,
      seatNumber: [],
      costPrice: {
        price: 0,
        currency: ""
      },
      ticketIssued: false,
      ticketStatus: {
        canclellation: {
          canclellationDate: "",
          cancellationState: false,
          reasons: ""
        },
        isTicketBooked: false
      },
      createdAt: new Date(),
     
    } 
  } 

export const getAllTicketAction = createAsyncThunk("getAllTickets", async () => {

  console.log("this fireed")

              var Amadeus = require('amadeus');

              var amadeus = new Amadeus({
                clientId: process.env.AMADEUS_cLIENT_ID,
                clientSecret: process.env.AMADEUS_cLIENT_SECRET
              });

             await  amadeus.shopping.flightOffersSearch.get({
                  originLocationCode: 'SYD',
                  destinationLocationCode: 'BKK',
                  departureDate: '2024-04-01',
                  returnDate: '2024-06-01',
                  adults: '2'
              }).then(function(response){
                console.log(" flights =>", response.data);
              }).catch(function(responseError){
                console.log(responseError.code);
              });

  const response = await axios(`${process.env.BASE_URL}/api/tickets`);
  return response.data;
});

export const getTicketDetailsAction = createAsyncThunk("getTicketDetails", async (id:string) => { 
  try {
    console.log("there is full url  ==> ", `${process.env.BASE_URL}/api/tickets/ticket_details/${id}`)
    const response = await axios(`${process.env.BASE_URL}/api/tickets/ticket_details/${id}`);  
    console.log(" here is my response  ",  response)
    return response; 
  } catch (error) {    
    const response = error;     
    return response;
  } 
});

export const addNewSafarisAction = createAsyncThunk("addNewTicketAction", async (data:any) => {
  try {
    const response = await axios.post(`${process.env.BASE_URL}/api/tickets`, data);
    const isData  = await response.data;
    return isData;
  } catch (err) {
    console.error(err)
  }
});


const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearErrorMessageActions:(state, action)=>{
        let errMsg = action.payload
        errMsg = ""
        state.errorMessage = errMsg;
    },
  },
    
  extraReducers: (builder) => {
    builder.addCase(getAllTicketAction.fulfilled, (state, action: PayloadAction<any>) => {
      if(!state.allTickets.length){
        state.loading = true;
        state.allTickets.push(...action.payload);
      }
      return;
    });  
    builder.addCase(getAllTicketAction.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
    });

    // Ticket details builder
    builder.addCase(getTicketDetailsAction.fulfilled, (state, action:PayloadAction<any> ) => {
      if(action.type === "getTicketDetails/fulfilled"){
        try {            
            if(action.payload === undefined || action.payload === null){
              state.ticketsDetails;  
            }
            else{
              if(typeof action.payload.response === 'object'){
                let errorMsg = action.payload.response.data
                state.loading = false;
                state.errorMessage = errorMsg.split(".")[0]
                state.status = action.payload.response.status;
                state.ticketsDetails; 
              }else{
                state.loading = true;
                state.status = action.payload.status
                state.ticketsDetails = action.payload.data;
              }  
            };

          } catch (error) {
          console.log("error at getTicketDetails ==> ", error)
        } 
      }
      return;
    });  
    builder.addCase(getTicketDetailsAction.pending, (state, action) => {
      state.loading = true; 
    });

   }
});
  

export const { clearErrorMessageActions}  = ticketSlice.actions;  
export default ticketSlice.reducer;


  


  