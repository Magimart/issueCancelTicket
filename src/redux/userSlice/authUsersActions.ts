import { 
  UserAuthInitials, 
  Credentials , UserSession, UserTokenObj} from "@/lib/types/MyTypes";
import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {signIn, getSession} from 'next-auth/react';


const initialState:UserAuthInitials = {
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
    },
    addNewUser:{
      name:"",
      email: "",
      password: "",  
      role:"",
      registerStatus:0,
      createdAt: new Date(),
    }
} ;


export const LoginInUserActions = createAsyncThunk("LoginInUserActions", async(credential:Credentials) => { 
 
  let {email, password } = credential;
  let result : any = await signIn('credentials', {
    redirect: false,
    email,
    password
  });
  try {
    const token =  await axios.get(`${process.env.BASE_URL}/api/auth/csrf`);
    let session :any  = await getSession() ;

    console.log("this results", result);
    
    const response = {
      loginStatusMsg:{
        loginStatus:result.status,
        loginError: result.error,
        loginOk:result.ok,
        errorCause: ""
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
    };
    
    return response;
    
  } catch (error) {
    console.log("this is login  ==>", error)
    const response ={
      loginStatusMsg:{
        loginStatus:result.status,
        loginError: result.error,
        loginOk:result.ok,
        errorCause: error
      },
      tokenObj:{
        tokenStatus:"",
        token:""
      },
      userSession: {
        userId: "", 
        userName: "", 
        userEmail: "", 
        userRole:""
      }
    }
    return response;

  }
});

// new user
//________________add new
export const addNewUserAction = createAsyncThunk("addNewUserAction", async (data:any) => {
  try {
    const response = await axios.post(`${process.env.BASE_URL}/api/auth/register`, data);
    let isData  = response;
      console.log("you are registered", response);
    return isData;
  } catch (err) {
    console.error(err)
  }
});

// loggedin User Actions
export const LoggedInUserAction = createAsyncThunk("LoggedInUserAction", async() => { 
  try {
    const token =   await axios.get(`${process.env.BASE_URL}/api/auth/csrf`);
    let session : any = await getSession() ; 
    const response = {
      tokenObj:{
        tokenStatus:token.status,
        token:token.data.csrfToken
      },
      userSession: {
        userId: session !== undefined && session.user._id, 
        userName: session !== undefined && session.user.name, 
        userEmail: session !== null && session.user.email, 
        userRole:session !== null && session.user.role
      } as UserSession
    };
    
    return response;
    
  } catch (error) {
    console.log(error)
  }
});


const authUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearLoginErrorMessageActions:(state, action)=>{
      console.log(action)
      state.loginStatusMsg.loginStatus = 0;
    },
  },
    
  extraReducers: (builder) => {
    // login
    builder.addCase(LoginInUserActions.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      const {loginStatusMsg,userSession, tokenObj} = action.payload;
      const {loginStatus,loginError,loginOk} = loginStatusMsg;
      const {tokenStatus, token} = tokenObj;
      const {userName, userEmail, userRole, userId } = userSession;
       try {
        if(action.type === "LoginInUserActions/fulfilled"){
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
            state.loginStatusMsg.loginOk = loginOk ;
            state.loginStatusMsg.loginStatus = loginStatus;
            state.tokenObj.token = "" ;
            state.tokenObj.tokenStatus = 0;
            state.userSession.userName = "";
            state.userSession.userEmail = "";
            state.userSession.userId = "";
          }
        }return;  
       } catch (error) {
        console.log(error)
       }        
    });  
    builder.addCase(LoginInUserActions.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
    });

    //register user
    builder.addCase(addNewUserAction.fulfilled, (state, action: PayloadAction<any>) => {
        try {
          if(action.type === "addNewUserAction/fulfilled"){
            console.log(action)
            const {name, email,password,role, createdAt } = action.payload.data;
  
            if(action.payload.status === 200){
              state.loading = true;
              state.addNewUser.registerStatus = 200;
              state.addNewUser.name = name;
              state.addNewUser.email = email;
              //state.addNewUser.password = password; No password to the browser
              state.addNewUser.role = role; 
              state.addNewUser.createdAt = createdAt;             
            }else{
              state.loading = false;
              state.addNewUser.registerStatus = 0;
              state.addNewUser.name = "";
              state.addNewUser.email = "";
              state.addNewUser.createdAt
            }
          }
          return;
        } catch (error) {
            console.log(error)
        }
    });  
    builder.addCase(addNewUserAction.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
    });

    // logged user
    builder.addCase(LoggedInUserAction.fulfilled, (state, action: PayloadAction<any>) => {
      try {
         if(action.type === "LoggedInUserAction/fulfilled"){
            const { tokenObj, userSession }= action.payload;
            const {tokenStatus, token} = tokenObj;
            const {userName, userEmail, userRole, userId } = userSession;
            state.loading = true;
            state.tokenObj.token = token;
            state.userSession.userId = userId;
            state.tokenObj.tokenStatus = tokenStatus;
            state.userSession.userName = userName;
            state.userSession.userEmail = userEmail;
            state.userSession.userRole = userRole;        
         }
        return;
      } catch (error) {
          console.log(error)
      }
    });  

    builder.addCase(LoggedInUserAction.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
    });
  }
});
  
export const { 
  clearLoginErrorMessageActions
}  = authUsersSlice.actions;
  
export default authUsersSlice.reducer;


  


  