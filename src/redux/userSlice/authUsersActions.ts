import { 
   AuthLoginInitials, 
  Credentials } from "@/lib/types/MyTypes";
import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {signIn, getSession} from 'next-auth/react';


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
    },
    userSession: {
      userId: "",
      userName: "",
      userEmail: "",
      userRole: ""
    }
} ;

export const LoginInUserActions = createAsyncThunk("loginUsers", async(credential:Credentials) => { 
  try {
    let {email, password } = credential;
    const token =   await axios.get(`${process.env.BASE_URL}/api/auth/csrf`);
    console.log(token)

    let session :any  = await getSession() ; 

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
      },
      userSession: {
        userId: session !== undefined && session.user._id, 
        userName: session !== undefined && session.user.name, 
        userEmail: session !== null && session.user.email, 
        userRole:session !== null && session.user.role
      }
    } as AuthLoginInitials;
    
    return response;
    
  } catch (error) {
    console.log(error)
  }
});


const authUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
  },
    
  extraReducers: (builder) => {
    builder.addCase(LoginInUserActions.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      console.log(action)
      const {loginStatusMsg,userSession, tokenObj} = action.payload;
      const {loginStatus,loginError,loginOk} = loginStatusMsg;
      const {tokenStatus, token} = tokenObj;
      const {userName, userEmail, userRole, userId } = userSession;
      if(action.type === "loginUsers/fulfilled"){
        if(loginOk && loginStatus === 200){
          state.loading = true;
          state.loginStatusMsg.loginOk = loginOk;
          state.loginStatusMsg.loginStatus = loginStatus;
          state.tokenObj.token = token
          state.tokenObj.tokenStatus = tokenStatus;
          state.userSession.userName = userName;
          state.userSession.userEmail = userEmail;
          state.userSession.userRole = userRole;
          state.userSession.userId = userId;

        }else{
          state.loading = false;
          state.loginStatusMsg.loginError = loginError;
          state.loginStatusMsg.loginOk;
          state.loginStatusMsg.loginStatus;
          state.tokenObj.token = "" ;
          state.tokenObj.tokenStatus = 0;
          state.userSession.userName = "";
          state.userSession.userEmail = "";
          state.userSession.userId = "";
        }
      }return;          
    });  
    builder.addCase(LoginInUserActions.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
    });
  }
});
  
export const { 
}  = authUsersSlice.actions;
  
export default authUsersSlice.reducer;


  


  