import { TokenChart } from "@/components/tokenChart";
import React from "react";

interface tokenPageParams {
  params: Promise<{ tokenAddress: string }>;
}

export default async function page({ params }: tokenPageParams) {
  const tokenAddress = (await params).tokenAddress;
  return (
    <div className="w-100 flex mx-5 justify-center align-center">
      <TokenChart props={{ tokenAddress }}></TokenChart>
    </div>
  );
}
