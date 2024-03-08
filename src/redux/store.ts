import { configureStore } from "@reduxjs/toolkit";
// import todoReducer from "@/redux/features/todo-slice";
import useTicketSliceReducer from "@/redux/ticketSlice/allTicketsActions";
import toggleActionsReducer from "@/redux/toggleSlice/toggleActions"
import globalVariableSliceReducer from "./globalVariables/globalVariableSlice";
import windowDimensionsSliceReducer from "./globalVariables/windowDimensions"
import userUSerSliceReducer  from "./userSlice/allUserActions";
import useAuthUsersSliceReducer  from "./userSlice/authUsersActions";
import useBookingSliceReducer  from "@/redux/ticketSlice/allBookingActions";



export function makeStore() {
  return configureStore({
    reducer: {
      windowDimessions: windowDimensionsSliceReducer ,
      globalVariables:globalVariableSliceReducer,
      toggleHomeMenu: toggleActionsReducer,
      allTickets: useTicketSliceReducer,
      allUsers: userUSerSliceReducer ,    
      authUsers: useAuthUsersSliceReducer, 
      allBooking: useBookingSliceReducer    
   
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    })
  });
}

export const store = makeStore();


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;









