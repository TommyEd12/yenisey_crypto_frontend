"use client";

import { CryptoStats } from "@/components/cryptoStats";



export default function Home() {
  return (
    <div className="w-screen max-w-max absolute bg-zinc-900">
      <CryptoStats></CryptoStats>
    </div>
  );
}
