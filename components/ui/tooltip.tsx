"use client";

import type React from "react";
import { useState, type ReactNode } from "react";

interface CustomTooltipProps {
  children: ReactNode;
  content: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  content,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-black bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2">
          {content}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};
