import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  allUsers: [],
  getUserDetails: {},
}  as any; //add type check!


export const getAllUsersAction = createAsyncThunk("getAllUsers", async () => {
  const response = await axios(`${process.env.BASE_URL}/api/auth/`);
  return response.data;
  }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    
    extraReducers: (builder) => {
      // get all users
      builder.addCase(getAllUsersAction.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        if(!state.allUsers.length){
          state.loading = true;
          state.allUsers.push(...action.payload);
        }
        return;
      });  
      builder.addCase(getAllUsersAction.pending, (state, action: PayloadAction<any>) => {
        state.loading = true;
      });

  }
});
  

export const { 
  // getUserDetailsActions,
}  = usersSlice.actions;
  
export default usersSlice.reducer;


  


  