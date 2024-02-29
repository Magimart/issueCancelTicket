"use client"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";


export default function FooterModel(){

    const { isOpen} = useSelector((state: RootState) => state.toggleHomeMenu);
    const isYear = new Date().getFullYear();
 
  return (
     <div>
        {/* footer */}
        <section className={`bg-gradient-to-b from-transparent via-sky-50 to-sky-300 ${isOpen?"opacity-0":""} !!toogle  w-[100%] `}>
            <div
               className="max-w-lg bg-sky-300 px-4 pt-24 py-8 mx-auto text-left md:max-w-none md:text-center"
            >
                    <h1
                     className=" font-extrabold leading-10 tracking-tight t text-white text-center sm:leading-none md:text-6xl text-4xl lg:text-7xl"
                    >
                    <span
                        className=" mt-2 bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-red-600 to-sky-200 md:inline-block"
                    > Tui 4U                    
                    </span>
                    </h1>
                    <div
                    className="mx-auto rounded-lg font-black mt-5 text-zinc-400 md:mt-12 md:max-w-lg text-center lg:text-lg"
                    >
                    <button className="bg-red-600 border text-sm text-white py-3 px-7 rounded-full" >
                        Let us lead you to your dream Vacation
                    </button>
                    </div>
                </div>
                <hr className="text-white mx-5" />
                <footer className="bg-gradient-to-b from-sky-100 via-sky300 to-sky-300 pb-5">
                    <div className="max-w-screen-xl px-4 pt-8 mx-auto sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="flex justify-center text-teal-300 sm:justify-start">
                            {/* <img className="rounded-full" src="https://sahilnetic.xyz/evilcat.png" width="40" height="40" /> */}
                            </div>

                            <p className="mt-4 text-sm text-center text-gray-400 lg:text-right lg:mt-0">
                            Impressium &nbsp; Terms &nbsp; Privacy & Policy &nbsp; 
                            </p>
                            <div className="my-4 -bg-blackf relativen ">
                                    Developer:  <span className="text-teal-100 bg-amber-400 px-1 ">Magima Felix  </span>
                                    <span className="px-0.5 bg-white">
                                        ©️ <span className="p-0.5">
                                            {isYear}
                                        </span>
                                    </span>
                            </div>
                        </div>
                    </div>
                </footer>
        </section>

     </div>
  )

}