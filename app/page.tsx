"use client";

import { CryptoStats } from "@/components/cryptoStats";
import { backendInstance } from "@/http";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await backendInstance.get("/user/profile");
        return res.status;
      };
      fetchData();
    } catch {
      redirect("/login");
    }
  }, []);
  return (
    <div className="w-screen">
      <CryptoStats></CryptoStats>
    </div>
  );
}
