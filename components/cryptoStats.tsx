import React from "react";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/datePicker";
import { CryptoDataTable } from "./cryptoDataTable";

export const CryptoStats = () => {
  return (
    <div className="flex mr-5">
      <div className="p-3 gap-3 flex flex-wrap items-start justify-start m-3 h-48 bg-gray-700 rounded-2xl w-80">
        <DatePickerDemo></DatePickerDemo>
        <DatePickerDemo></DatePickerDemo>
        <Button variant="secondary" className="self-start mr-auto ">
          Расчитать
        </Button>
      </div>
      <CryptoDataTable></CryptoDataTable>
    </div>
  );
};
