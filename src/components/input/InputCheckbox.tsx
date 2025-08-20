import clsx from "clsx";
import { Check } from "lucide-react";
import React from "react";

interface CustomCheckboxProps {
  isChecked: boolean;
  onClick: () => void;
  className?: string;
  checkIconSize?: number;
  checkIconClassName?: string;
  label?: string; // Opsional: tambahkan label jika diperlukan
}

const InputCheckbox: React.FC<CustomCheckboxProps> = ({
  isChecked,
  onClick,
  className,
  checkIconSize = 16,
  checkIconClassName = "stroke-white",
  label,
}) => {
  return (
    <button
      type="button" // Penting untuk mencegah submit form jika di dalam form
      role="checkbox"
      aria-checked={isChecked}
      onClick={onClick}
      className={clsx(
        "w-fit flex items-center justify-center gap-2 cursor-pointer",
        className
      )}
    >
      <div
        className={clsx(
          "border-2 rounded-sm border-neutral-4 p-1 focus:outline-none focus:ring-2 focus:ring-primary-1 focus:ring-offset-1 transition-colors duration-150 ease-in-out",
          isChecked
            ? "bg-primary-1 text-white"
            : "bg-transparent text-neutral-4"
        )}
      >
        <Check
          size={checkIconSize}
          className={clsx(
            "transition-opacity duration-150 ease-in-out",
            isChecked ? "opacity-100" : "opacity-0", // Ikon hanya terlihat jika checked
            checkIconClassName
          )}
        />
      </div>
      {label && <span className="text-xs text-left text-black">{label}</span>}
    </button>
  );
};

export default InputCheckbox;
