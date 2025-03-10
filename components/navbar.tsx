import React from "react";
import cryptoIcon from "../public/ethereum-1.svg";
import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";

export const Navbar = () => {
  return (
    <div className="dark: bg-purple-700  dark: text-white font-semibold sticky top-0 flex items-center text-pretty text-4xl p-4 w-screen z-50 ">
      <Link href="/">
        <h1>YeniseyCrypto </h1>
      </Link>
      <img src={cryptoIcon.src} className="mt-2 w-10 h-10 bg-transparent" />
      <section className="ml-3 mt-1 px-2 py-1  flex items-center ">
        <Link href="/dateInfo" className="text-2xl px-2 py-1 bg-zinc-900 rounded-2xl">
          Объем $
        </Link>
        <Link href="/tradingRates" className="text-2xl ml-5 px-2 py-1 bg-zinc-900 rounded-2xl">
          Операции
        </Link>
        
      </section>
      <ModeToggle></ModeToggle>
    
    </div>
  );
};
