import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession, GetSessionParams, useSession} from 'next-auth/react';
import type { CancelTicket, ResponseI} from "@/lib/types/MyTypes";

interface InitialCancelState {
  loading: boolean;
  cancelMessage: string;
  cancelStatus: number;
  errorTrigger: string;
  ticket: object;
  allBookings: object[];
  addBooking: object;
} 

const initialState: InitialCancelState = {
  loading: false,
  cancelMessage: "",
  errorTrigger: "",
  cancelStatus: 0,
  ticket: {},
  allBookings: [],
  addBooking: {},
} 



 

// cancel booking
export const changeBookingActions = createAsyncThunk("changeBookingActions", async (flight:CancelTicket):Promise<ResponseI> => {
   try {
        const respose = await axios.patch(`${process.env.BASE_URL}/api/bookings/change_booking`, flight);
        return respose as unknown as ResponseI;
    } catch (error) {
       return error as ResponseI
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
  },
    
  extraReducers: (builder) => {
    builder.addCase(changeBookingActions.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
        if(action.type === "changeBookingActions/fulfilled"){
          const {status, data} = action.payload
          if(status === 200){
            state.loading = true;
            state.cancelStatus = status;
            state.ticket = data;
            state.cancelMessage = "";
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
  }
});
  
export const { 
}  = bookingSlice.actions;
  
export default bookingSlice.reducer;


  






  