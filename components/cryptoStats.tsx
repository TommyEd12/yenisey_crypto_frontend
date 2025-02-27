import React from "react";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/datePicker";

export const CryptoStats = () => {
  return (
    <div className="p-3 gap-3 flex flex-wrap justify-center m-3 bg-gray-700 rounded-2xl w-80">
      <DatePickerDemo></DatePickerDemo>
      <DatePickerDemo></DatePickerDemo>
      <Button variant="secondary" className="self-start mr-auto ml-2">Расчитать</Button>
    </div>
  );
};
