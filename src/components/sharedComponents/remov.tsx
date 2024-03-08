import React from "react"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleErrorMessageActions } from "@/redux/toggleSlice/toggleActions";
import { clearErrorMessageActions } from "@/redux/ticketSlice/allTicketsActions";
import { clearLoginErrorMessageActions } from "@/redux/userSlice/authUsersActions";

export default function ErrorMessageToggle(){

    const { errorMessageToggle} = useSelector((state: RootState) => state.toggleHomeMenu);
    const {loading, errorMessage} = useSelector((state: RootState) => state.allTickets);
    const {userSession, loginStatusMsg} = useSelector((state: RootState) => state.authUsers);
    const {loginStatus, loginError, loginOk } = loginStatusMsg;

    const dispatch = useDispatch();

    const handleDispatch = () => {
        console.log("clicked", errorMessage, " noth", loginError)
        if(errorMessage.length){
            dispatch(clearLoginErrorMessageActions (errorMessage));
        } 
        // if(loginStatus === 401){
        //     dispatch(clearLoginErrorMessageActions(loginStatus));
        // }        
    }

  return (
    <div className="errorToggleWrapper bg-white px-3 py-8  text-black w-full
        max-w-fullf  space-y-1  shadow-cyan-500 shadow-inner max-w-[40vw]
        bg-gradient-to-b from-transparent via-sky-50 to-sky-300  rounded-lg"
    >
        <div className="flex w-full flex-row justify-end ">
        <button  className="closeErrorMessageWrapper relative"
          onClick={handleDispatch}
        >
          ✖️
        </button>
        </div> 
        <div className="relative">
            <h4 className="text-red-600 break-words">
                {errorMessage}
                {loginError &&  loginError}
            </h4>
        </div>   
    </div>
  )

}