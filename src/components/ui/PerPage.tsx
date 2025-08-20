import React from "react";
import { ChevronDown } from "lucide-react";

interface PerPageSelectProps {
  value: number;
  onChange: (n: number) => void;
  className?: string;
}

export const PerPageSelect: React.FC<PerPageSelectProps> = ({
  value,
  onChange,
  className = "",
}) => {
  const options = [5, 10, 15, 25];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* custom‐styled select */}
      <div className="relative inline-block">
        <select
          className="
            appearance-none
            bg-primary-3/8
            rounded-lg 
            py-1 pl-3 pr-6
            text-sm 
            focus:outline-none focus:ring-2 focus:ring-primary-3
          "
          value={value}
          onChange={(e) => onChange(parseInt(e.currentTarget.value, 10))}
        >
          {options.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {/* arrow icon */}
        <ChevronDown
          size={16}
          className="pointer-events-none absolute transform top-0 right-4 translate-y-1/2 translate-x-1/2 stroke-gray-500"
        />
      </div>
      <span className="text-sm">per halaman</span>
    </div>
  );
};
