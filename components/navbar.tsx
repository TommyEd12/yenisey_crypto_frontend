"use client";
import React from "react";
import cryptoIcon from "../public/ethereum-1.svg";
import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  return (
    <div className="dark: bg-purple-700  dark: text-white font-semibold flex-col sticky top-0 flex items-start justify-between  text-pretty text-4xl p-4 w-fit h-screen z-50 ">
      <div>
      <Link href="/">
        <h1 className="text-wrap  ml-3  w-10">Yenisey Crypto </h1>
      </Link>
      <Button
        onClick={() => {
          router.push("/login");
        }}
        className="w-full flex justify-around ml-3 bg-white dark:bg-zinc-900  mt-3 p-1 h-fit"
      >
        <img src={cryptoIcon.src} className="w-10 h-10 bg-transparent" />
        <h2 className="dark:text-white text-black">Войти</h2>
      </Button>
      </div>

      <section className="mt-1 px-2 py-1 gap-5  flex flex-col align-start items-start ">
        <Link
          href="/dateInfo"
          className="text-2xl px-2 py-1 dark:bg-zinc-900 rounded-2xl"
        >
          Объем $
        </Link>
        <Link
          href="/tradingRates"
          className="text-2xl  px-2 py-1 dark:bg-zinc-900 rounded-2xl"
        >
          Операции
        </Link>
        <Link
          href="/streams"
          className="text-2xl  px-2 py-1 dark:bg-zinc-900 rounded-2xl"
        >
          Стримы
        </Link>
        <Link
          href="/news"
          className="text-2xl  px-2 py-1 dark:bg-zinc-900 rounded-2xl"
        >
          Новости
        </Link>
      </section>
      <ModeToggle></ModeToggle>
    </div>
  );
};
