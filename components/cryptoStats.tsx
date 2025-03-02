import React from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datePicker";
import { CryptoDataTable } from "./cryptoDataTable";

export const CryptoStats = () => {
  return (
    <div className="flex mr-5">
      <div className="p-3 gap-3 flex flex-wrap items-start justify-center m-3 h-48 bg-gray-700 rounded-2xl w-80">
        <h1 className="text-white text-center text-xl">
        Изменение  объема за день
        </h1>
      </div>
      <CryptoDataTable></CryptoDataTable>
    </div>
  );
};
