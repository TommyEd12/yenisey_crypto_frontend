import React from "react";
import cryptoIcon from "../public/ethereum-1.svg";
import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";

export const Navbar = () => {
  return (
    <div className="dark: bg-purple-700  dark: text-white font-semibold flex-col sticky top-0 flex items-start justify-between  text-pretty text-4xl p-4 w-fit h-screen z-50 ">
      <Link href="/">
        <h1 className='text-wrap  ml-3  w-10'>Yenisey Crypto </h1>
        <img src={cryptoIcon.src} className="mt-3 w-10 h-10 bg-transparent" />
      </Link>
 
      <section className="mt-1 px-2 py-1 gap-5  flex flex-col align-start items-start ">
        <Link href="/dateInfo" className="text-2xl px-2 py-1 dark:bg-zinc-900 rounded-2xl">
          Объем $
        </Link>
        <Link href="/tradingRates" className="text-2xl  px-2 py-1 dark:bg-zinc-900 rounded-2xl">
          Операции
        </Link>
        
      </section>
      <ModeToggle></ModeToggle>
    
    </div>
  );
};
