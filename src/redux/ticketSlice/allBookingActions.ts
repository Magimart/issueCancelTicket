import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  allBookings: [],
  addBooking: {},
}  as any; //add type checks!


export const addBookingActions = createAsyncThunk("addBookingActions", async (flight:any) => {
  const response = await axios.post(`${process.env.BASE_URL}/api/bookings/cancel_booking`, flight);
  const available = response;

  // add another end point to cancel old Ticket and booking
  console.log(available);
  return available;
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
  },
    
    extraReducers: (builder) => {
      // get all users
      builder.addCase(addBookingActions.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
         console.log(action)
        return;
      });  
      builder.addCase(addBookingActions.pending, (state, action: PayloadAction<any>) => {
        state.loading = true;
      });
  }
});
  
export const { 
}  = bookingSlice.actions;
  
export default bookingSlice.reducer;


  






  