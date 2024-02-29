import { AuthLoginInitials, Credentials } from "@/lib/types/MyTypes";
import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {signIn} from 'next-auth/react';


const initialState:AuthLoginInitials = {
    loading: false,
    loginStatusMsg :{         
        loginError: null,
        loginOk:false,
        loginStatus: 0
    },
    tokenObj:{
        token : "",
        tokenStatus: 0
    }
} ;


export const LoginInUserActions = createAsyncThunk("loginUsers", async(credential:Credentials) => {
     
    try {
      let {email, password } = credential;
      const token =   await axios.get(`${process.env.BASE_URL}/api/auth/csrf`);
      console.log(token)
      const result : any = await signIn('credentials', {
        redirect: false,
        email,
        password
      });
      const response = {
        loginStatusMsg:{
          loginStatus:result.status,
          loginError: result.error,
          loginOk:result.ok
        },
        tokenObj:{
          tokenStatus:token.status,
          token:token.data.csrfToken
        }
      } as AuthLoginInitials;
      
      return response;
    
    } catch (error) {
      console.log(error)
    }
  }
);


const authUsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    
    extraReducers: (builder) => {
        builder.addCase(LoginInUserActions.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            console.log(action)
            const {loginStatusMsg, tokenObj} = action.payload;
            const {loginStatus,loginError,loginOk} = loginStatusMsg;
            const {tokenStatus, token} = tokenObj;

            if(loginOk && loginStatus === 200){
              state.loading = true,
              state.loginStatusMsg.loginOk = loginOk,
              state.loginStatusMsg.loginStatus = loginStatus,
              state.tokenObj.token = token
              state.tokenObj.tokenStatus = tokenStatus
            }else{
                state.loading = false,
                state.loginStatusMsg.loginError = loginError
                state.loginStatusMsg.loginOk,
                state.loginStatusMsg.loginStatus,
                state.tokenObj.token = "" ,
                state.tokenObj.tokenStatus = 0 
            }
            
        });  
        builder.addCase(LoginInUserActions.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        });
    }
});
  

export const { 
}  = authUsersSlice.actions;
  
export default authUsersSlice.reducer;


  


  