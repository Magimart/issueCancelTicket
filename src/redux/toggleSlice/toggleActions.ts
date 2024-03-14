import { createSlice } from "@reduxjs/toolkit";

type ToggleProps = {
  isOpen: boolean;
  errorMessageToggle: boolean;
  toggleBooking: boolean;
  toggleFoundFlights: boolean;
  toggleSuccessMessage:boolean;
};

const initialState: ToggleProps = {
  isOpen: false,
  errorMessageToggle: false,
  toggleBooking: false,
  toggleFoundFlights: false,
  toggleSuccessMessage:false,
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
  handleToggleSuccessMessageActions:(state, action)=>{
    console.log(action)
    state.toggleSuccessMessage = !action.payload;
  },

  },
});


export const { 
  toggleShowHideHomeMenuActions,
  toggleErrorMessageActions,
  toggleBookingInfoActions,
  toggleFoundFlightActions,
  handleToggleSuccessMessageActions
} = toggleActions.actions;


export default toggleActions.reducer;