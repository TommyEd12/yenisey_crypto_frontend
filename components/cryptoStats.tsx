import React from "react";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/datePicker";

export const CryptoStats = () => {
  return (
    <div className="p-3 flex justify-start">
      <Button variant="secondary" className="mr-3">
        Click me
      </Button>
      <DatePickerDemo></DatePickerDemo>
    </div>
  );
};
