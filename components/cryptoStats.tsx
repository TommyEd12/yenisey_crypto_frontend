import React from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { CryptoDataTable } from "./cryptoDataTable";

export const CryptoStats = () => {
  return (
    <div className="flex mr-5">
      <CryptoDataTable></CryptoDataTable>
    </div>
  );
};
