import { createSlice , createAsyncThunk, current} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FlightsInitials, TicketInitials, ResponseI } from '@/lib/types/MyTypes';
import { AppDispatch, RootState } from "@/redux/store";
import { getArray } from "@/lib/utils/helpers";

  interface IState{
    loading: boolean;
    errorMessage: string;
    errorTrigger: string;
    status: number;
    selectedFlight: boolean;
    allTickets: object[];
    ticketsDetails: TicketInitials;
    foundNewFlights: {
      foundFlights: FlightsInitials[];
      cheapRecommendedFlights:  FlightsInitials[];
    },
    //addTicket:object;  
  }

  const initialState:IState = {
    loading: false,
    errorTrigger:"",
    status: 0,
    selectedFlight: false,
    errorMessage:"",
    allTickets: [],
    ticketsDetails: {
      _id: "",
      airlineName: "",
      departure: "",
      destination: "",
      arrivalTime: new Date,
      departureTime: new Date,
      numberOfTransfers:0,
      flightNumber:0,
      costPrice: {
        price: 0,
        currency: ""
      },
      ticketStatus: {
        canclellation: {
          canclellationDate: new Date, // from str
          cancellationState: false,
          reasons: ""
        },
        isTicketBooked: false
      },
      user:[],
      expiresAt: new Date,
      createdAt: new Date,
    } ,
    foundNewFlights: {
      foundFlights: [],
      cheapRecommendedFlights: []
    },
    //addTicket:{} 

  } 


export const getAllTicketAction = createAsyncThunk("getAllTickets", async () => {
const response = await axios(`${process.env.BASE_URL}/api/tickets`);
  return response.data;
});

export const getTicketDetailsAction = createAsyncThunk("getTicketDetails", async (id:string) => { 
  console.log(id)
  try {

    const response = await axios(`${process.env.BASE_URL}/api/tickets/ticket_details/${id}`); 

    console.log(" here is my response  ",  response)

    return response; 
  } catch (error) {    
    const response = error;     
    return response;
  } 
});


export const searchFlightAvailabilityAction = createAsyncThunk("searchFlights", async(data:any) => {
  
  const isData = {  // replace with data
    origin: 'BER',
    destination: 'LON',
    departDate: '2024-10',
    returnDate: '2024-11'
  }   
  const response = await axios.post(`${process.env.BASE_URL}/api/tickets/available_flights`, data);
    return response;
});


//add ticket
export const addSelectedFlightActions = createAsyncThunk("addSelectedFlightActions", async (data:any):Promise<object | ResponseI> => {
  try {
     const response = await axios.post(`${process.env.BASE_URL}/api/tickets`, data);
     const isData  = await response;
           console.log(isData);
     return isData;
  } catch (err) {
    console.error(err)
    return err as ResponseI;
  }
});

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearErrorMessageActions:(state, action)=>{
      let errMsg = action.payload
      errMsg = ""
      console.log(action)
      state.errorMessage = errMsg;
    },
    resetStatusActions:(state, action)=>{
      let status = action.payload;
      status = 0;
      state.status = status;
      state.selectedFlight = false;
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
        console.log(action)
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

    //search availability
    builder.addCase(searchFlightAvailabilityAction.fulfilled, (state, action: PayloadAction<any>) => {
       if(action && action.payload.status === 200){
          const {foundFlights, recommendedPrices} = action.payload.data;
          if(foundFlights.success || recommendedPrices.success ){
              const flights = foundFlights.data;
              const cheapFlight = recommendedPrices.data;
              state.loading = true; 
              state.status = 200             
              const isFoundFlight :any = getArray(flights);
              state.foundNewFlights.foundFlights = isFoundFlight ;
              const cheapPrice :any = getArray(cheapFlight);
              state.foundNewFlights.cheapRecommendedFlights = cheapPrice;                             
          }else {
            state.loading = false;
            state.errorMessage = "sorry No flight matched your selected dates";
           // retun state
          }
       }
      return;
    });  
    builder.addCase(searchFlightAvailabilityAction.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
    });

    // add ticket
    builder.addCase(addSelectedFlightActions.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("add select booking ==>", action)
        if(action.type === 'addSelectedFlightActions/fulfilled'){

          console.log(" if this act true create booking ==>", action)

          const {status, data} = action.payload
          if(status === 200){
            state.loading = true;
            state.status = status;
            state.selectedFlight = true
            state.ticketsDetails = data && data.res;
          }else{
            console.log(action)
            const {status, data} = action.payload.response;
            const {error, message} = data;
            state.status = status;
            state.loading = false;
            state.selectedFlight = false;
            state.errorMessage = message;
            state.errorTrigger = error;           
          }
        }
      return;
   });  
    builder.addCase(addSelectedFlightActions.pending, (state, action: PayloadAction<any>) => {
     state.loading = true;
    });

   }
});
  

export const { 
  clearErrorMessageActions,
  resetStatusActions
}  = ticketSlice.actions;  
export default ticketSlice.reducer;


// for query manipaltions later!!
function fetchBaseQuery(arg0: { baseUrl: string; prepareHeaders: (headers: any, { getState }: { getState: any; }) => any; }) {
  throw new Error("Function not implemented.");
}
  