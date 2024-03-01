"use client"
import ReduxProvider from '@/redux/Provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import HeaderModel from '@/components/headerComponents/HeaderModel';
import FooterModel from '@/components/footerComponents/footerModel';
import { useRouter, usePathname  } from 'next/navigation'
import 'mapbox-gl/dist/mapbox-gl.css'; // !! important

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Tui 4 you',
//   description: 'We handle all your ticket issuing and cancellations with ease, just with a click',
// }


export default function RootLayout({children,}: {children: React.ReactNode}) {
  
   const pathName = usePathname()
   
  return (
    <html lang="en">
      <body className={inter.className}>  
        <ReduxProvider>
         <HeaderModel/>
            {children}  
        </ReduxProvider>
      </body>
    </html>
  )
}
