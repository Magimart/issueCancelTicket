import React from "react"
import Image from 'next/image';
// import Link from "next/link";


export default function LogoImage(){
  const logoIcon:string = "https://www.tui4u.de/sites/default/files/TUI_Logo.png"

  return (
    <div className={`
       h-full
      w-[2em] xs:w-[2.5em] sm:w-[2.5em] md:w-[3em] lg:w-[4em] xl:w-[5em]
      `
     }>
      <Image
        src={logoIcon}
        alt="tui4u"
        width={80}
        height={40}
      />
    </div>
  )

}