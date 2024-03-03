import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// import type { IStateTermin } from "@/lib/types/modelTypes";
//  interface TIerminDetails{
//   _id:string; 
//   isBooked: boolean;
//   title: string;
//   date: Date | string;
//   start: string;
//   end: string;
//   color:string
// }

// interface IStateTermin {
//   allTermins: object[];
//   loading: boolean;
//   getTerminDetails: TIerminDetails;
//   addTerminAction: [];
// };

const initialState = {
  allUsers: [],
  loading: false,
  getUserDetails: {},
  addNewUserAction: [],
} as unknown as any;


export const getAllUsersAction = createAsyncThunk("getAllUsers", async () => {
  const response = await axios(`${process.env.BASE_URL}/api/auth/`);
  return response.data;
  }
);


//_________________update
export const updateBooking:any = createAsyncThunk("bookTerminAction", async (isSelectedTermin) => { 
    try { 
      let {id, isBooked, color} = isSelectedTermin as any; 
      
      const response = await fetch(`${process.env.BASE_URL}/api/termins/termin_details/${id}`,  {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isBooked:isBooked, color:color}),
    });
     //const data = await response.json();
    console.log(response);
    return response
  } catch (error) {
    console.log(error)
  } 
});


//________________add new
export const addNewUserAction = createAsyncThunk("addNewUserAction", async (data:any) => {
  try {
    const response = await axios.post(`${process.env.BASE_URL}/api/auth/register`, data);
    let isData  = await response.data;
    return isData;
  } catch (err) {
    console.error(err)
  }
});



const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    
    extraReducers: (builder) => {

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


  


  