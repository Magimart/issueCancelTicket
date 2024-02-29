import { createSlice } from "@reduxjs/toolkit";

type IsTextArea = {
  isOpen: boolean;
  errorMessageToggle: boolean;
};

const initialState: IsTextArea = {
  isOpen: false,
  errorMessageToggle: false
};


const toggleActions = createSlice({
  name: "toggleActions",
  initialState,
  reducers: { 

  toggleShowHideHomeMenuActions:(state, action)=>{
    state.isOpen = !action.payload; 
  },
  
  toggleErrorMessageActions:(state, action)=>{
    console.log(action)
    state.errorMessageToggle = !action.payload;
  },

  },
});


export const { 
  toggleShowHideHomeMenuActions,
  toggleErrorMessageActions
} = toggleActions.actions;

export default toggleActions.reducer;