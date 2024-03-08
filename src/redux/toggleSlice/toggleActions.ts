import { createSlice } from "@reduxjs/toolkit";

type ToggleProps = {
  isOpen: boolean;
  errorMessageToggle: boolean;
  toggleBooking: boolean;
  toggleFoundFlights: boolean;

};

const initialState: ToggleProps = {
  isOpen: false,
  errorMessageToggle: false,
  toggleBooking: false,
  toggleFoundFlights: false
};


const toggleActions = createSlice({
  name: "toggleActions",
  initialState,
  reducers: { 

  toggleShowHideHomeMenuActions:(state, action)=>{
    state.isOpen = !action.payload; 
  },
  
  toggleErrorMessageActions:(state, action)=>{
    state.errorMessageToggle = !action.payload;
  },
  toggleBookingInfoActions:(state, action)=>{
    console.log(action)
    state.toggleBooking = !action.payload;
  },
  toggleFoundFlightActions:(state, action)=>{
    console.log(action)
    state.toggleFoundFlights = !action.payload;
  },

  },
});


export const { 
  toggleShowHideHomeMenuActions,
  toggleErrorMessageActions,
  toggleBookingInfoActions,
  toggleFoundFlightActions
} = toggleActions.actions;


export default toggleActions.reducer;