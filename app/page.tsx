"use client";

import { CryptoStats } from "@/components/cryptoStats";
import { backendInstance } from "@/http";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["isAuthenticated"],
    queryFn: async () =>{
      const res = await backendInstance.get("/user/profile")
      return res
    }
      
  });
  if (isPending) return <h1>Загрузка</h1>;

  if (error) redirect("/login")
  return (
    <div className="w-screen">
      <CryptoStats></CryptoStats>
    </div>
  );
}
