import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import clsx from "clsx"

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  person?: number;
  buttonClassName?: string;
  listClassName?: string;
  itemClassName?: string;
}

const DropdownInput: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select",
  buttonClassName = " cursor-pointer w-full border-2 border-neutral-4 rounded-lg flex items-center focus:border-primary-3 text-xs focus:shadow-primary-4 p-4 py-3",
  listClassName = "absolute z-10 w-full mt-2 bg-white rounded-lg border-2 border-neutral-4 p-2 shadow-md overflow-y-auto max-h-40",
  itemClassName = "cursor-pointer hover:bg-neutral-4 rounded-md duration-200 ease-in-out p-2 flex items-center",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => setOpen(prev => !prev);

  return (
    <div className="relative w-full" ref={ref}>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={handleToggle}
        className={buttonClassName}
      >
        <p className="text-sm mr-auto">
          {value !== "" ? value : placeholder}
        </p>
        <ChevronDown
          size={20}
          strokeWidth={1.5}
          className={clsx(
            "transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* DropdownInput List */}
      {open && (
        <div className={listClassName}>
          {options.map((option, index) => (
            <div
              key={index}
              className={clsx(itemClassName, option === value && "bg-neutral-3/25")}
              role="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              <p className="mr-auto">{option}</p>
              {value === option && <Check size={16} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
