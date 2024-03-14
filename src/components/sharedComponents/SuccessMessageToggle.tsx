import React from "react"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleSuccessMessageActions, toggleErrorMessageActions } from "@/redux/toggleSlice/toggleActions";

export default function SuccessMessageToggle(){

    const {loading, cancelMessage} = useSelector((state: RootState) => state.allBooking);
    const { toggleSuccessMessage} = useSelector((state: RootState) => state.toggleHomeMenu);

    const dispatch = useDispatch();


  return (
    <div className="errorToggleWrapper bg-white px-3 py-8  text-black w-full
        max-w-fullf  space-y-1  shadow-cyan-500 shadow-inner min-w-[40vw]
        bg-gradient-to-b from-transparent via-sky-50 to-sky-300  rounded-lg"
    >
        <div className="flex w-full flex-row justify-end ">
        <button  className="closeErrorMessageWrapper relative"
          onClick={() =>dispatch(handleToggleSuccessMessageActions(toggleSuccessMessage))}
        >
            ✖️
        </button>
        </div> 
        <div className="relative text-teal-400 flex w-full flex-row items-center justify-center">
            <p className="text-red-600 break-words">
                {cancelMessage}
            </p>
        </div>   
    </div>
  )

}