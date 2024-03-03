"use client"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {FC, InputHTMLAttributes, useEffect,useState, useRef, useCallback,useMemo,Fragment } from "react";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'
//import { addTerminAction } from "@/redux/terminSlice/allTerminActions";
//import type { TerminModelI } from "@/lib/types/modelTypes";
import { getTime } from "@/lib/utils/getDateTime";

const DateAndTimePicker = () => {

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<any>(null);
    const [endTime, setEndTime] = useState<any>(null);
    const [title, setTitle] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();

    const handledataSubmition = async()=>{

        //posted time Fri Dec 01 2023 09:46:30 GMT+0100
        // db time "2023-12-01T07:16:23.000Z"

        // let myDate = new Date("2023-12-01T07:16:23.000Z").toLocaleDateString();


        const terminDate = new Date(startDate);   
        const termin = {
            title: title,
            date: startDate,
            start: new Date(`${terminDate.toDateString()} ${getTime(startTime)}`).toString(),
            end:  new Date(`${terminDate.toDateString()} ${getTime(endTime)}`).toString(), 
            color:"#808000" ,
            isBooked: false   
        } as any      
      // } as TerminModelI;

        //dispatch(addTerminAction(termin))
    }
    

    return(
 
        <section className="datePickerSectionWrap bg-blue-4 flex flex-col h-full w-full justify-center items-center"> 
             <div>
                    <div className="termiWrap space-y-2 flex flex-col justify-center items-center w-full">
                        <div>
                        <label className="font-bold">Neu Termin</label> 
                        <div>
                            <label>Title : </label>
                            <span>
                                <input
                                className="w-full p-1"
                                placeholder="termin name"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                />
                            </span>
                        </div>
                    </div>
                        <div className=" w-full "> 
                            <label>Date :</label>
                            <div className="flex bg-white py-1 ">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date:any) => setStartDate(date)}
                                    monthsShown={2}
                                />
                            </div>
                        </div>
                    </div>
                <div className="w-full py-2 flex flex-col space-y-5">
                    <div className="timeWrap w-full">
                        <label>from</label>
                        <div className="bg-white py-1 ">
                               <DatePicker
                                    selected={startTime}
                                    onChange={(date) => setStartTime(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                        </div>

                    </div>
                    <div className="timeWrap w-full">
                        <label>to</label>
                        <div className="bg-white py-1">
                            <DatePicker
                                selected={endTime}
                                onChange={(time:any) => setEndTime(time)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                        </div>
                    </div>
                     <div className="flex justify-center w-full">
                        <button
                            type="submit"
                            onClick={(e:any)=>handledataSubmition()} 
                            className=" bg-black text-white rounded-lg p-2 ">
                                check for availlabity
                        </button>
                     </div>
                </div>
            </div>
        </section>       
    )
  }

export default DateAndTimePicker;



