import React from "react"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleErrorMessageActions } from "@/redux/toggleSlice/toggleActions";
import { clearErrorMessageActions } from "@/redux/ticketSlice/allTicketsActions";

export default function ErrorMessageToggle(){

    const { errorMessageToggle} = useSelector((state: RootState) => state.toggleHomeMenu);
    const {loading, errorMessage} = useSelector((state: RootState) => state.allTickets);
    const dispatch = useDispatch();

    const handleDispatch = () => {
        if(errorMessage.length){
            dispatch(clearErrorMessageActions(errorMessage));
        }
         
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
            </h4>
        </div>   
    </div>
  )

}