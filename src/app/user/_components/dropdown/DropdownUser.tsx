import React from "react";
import { Check } from "lucide-react";
import clsx from "clsx";

interface DropdownUser {
  open: boolean;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

const DropdownUser: React.FC<DropdownUser> = ({
  open,
  options,
  value,
  onChange,
  className = "",
}) => {
  if (!open) return null;
  return (
    <div
      className={clsx(
        "absolute z-10 w-full p-2 mt-2 overflow-y-auto bg-white border-2 rounded-lg shadow-md border-neutral-4 max-h-40",
        className
      )}
    >
      <div className="flex flex-col text-sm">
        {options.map((option, index) => (
          <div
            className="flex items-center p-2 duration-200 ease-in-out rounded-md cursor-pointer hover:bg-neutral-4"
            key={index}
            role="button"
            onClick={() => onChange(option)}
          >
            <p className="mr-auto">{option}</p>
            {value === option && <Check size={16} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownUser;