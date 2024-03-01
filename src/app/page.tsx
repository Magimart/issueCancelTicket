"use client"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import HomePageModel from "@/components/bodyComponents/HomePageModel";

const HomePage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef(false);  

  useEffect(() => {

    if(ref.current === false) {
      try {
        
        // dispatch(getAllSafarisAction());      
      } catch (error) {
        console.error(error);
      }  
    }
    return () => {
      ref.current = true;
    };
  }, [dispatch]);



  return (
    <main 
      className="homeComponentWrapper 
      p-0 m-0 w-screen h-full left-0 right-0
      relativeg absolute flex items-center 
      " 
    >
      <HomePageModel/>
    </main>
  )
} 


export default   HomePage;


