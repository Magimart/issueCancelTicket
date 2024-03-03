import { createSlice } from "@reduxjs/toolkit";

type ToggleProps = {
  isOpen: boolean;
  errorMessageToggle: boolean;
  toggleBooking: boolean;
};

const initialState: ToggleProps = {
  isOpen: false,
  errorMessageToggle: false,
  toggleBooking: false
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

  },
});


export const { 
  toggleShowHideHomeMenuActions,
  toggleErrorMessageActions,
  toggleBookingInfoActions
} = toggleActions.actions;


export default toggleActions.reducer;