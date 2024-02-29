
import { createSlice } from "@reduxjs/toolkit";

type IScreenPosition = {
  screenPosition: boolean
};

const initialState: IScreenPosition = {
    screenPosition: false
};

///_______________________________________________ not in use
const globalVariableSlice = createSlice({
  name: "globalVariableActions",
  initialState,
  reducers: { 
    globalVariableActions:(state, action)=>{
        console.log(action)
        state.screenPosition = !action.payload
    },
  },
});


export const { 
    globalVariableActions
} = globalVariableSlice.actions;

export default globalVariableSlice.reducer;





























