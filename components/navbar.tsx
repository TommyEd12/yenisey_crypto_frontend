import React from "react";
import cryptoIcon from "../public/ethereum-1.svg"

export const Navbar = () => {
  return (
    <div className="dark: bg-purple-700 dark: text-white font-semibold sticky top-0 flex items-center text-pretty text-4xl p-4 w-screen ">
      <h1>YeniseyCrypto</h1>
      <img src={cryptoIcon.src} className='mt-2 w-10 h-10 bg-transparent'/>
    </div>
  );
};
