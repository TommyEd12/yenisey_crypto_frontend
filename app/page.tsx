"use client";

import { CryptoStats } from "@/components/cryptoStats";



export default function Home() {
  return (
    <div className="w-screen h-screen absolute bg-zinc-900">
      <CryptoStats></CryptoStats>
    </div>
  );
}
