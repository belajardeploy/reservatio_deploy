import React from "react";
import { BaseButtonProps } from "@/components/interface/InterfaceButton";

const DangerButton = ({
  children,
  className,
  onClick,
  disabled = false,
  isLoading = false,
  type="button"
}: BaseButtonProps) => {
  return (
    <button
      type={type}
      className={ "p-2 min-w-[40px] font-medium "+
        (disabled || isLoading
          ? "bg-neutral-3 text-white cursor-not-allowed "
          : "bg-red-2 hover:bg-red-3 ease-in duration-200 text-gray-100 cursor-pointer  ") +
        "rounded-lg " +
        className
      }
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex flex-col items-center space-y-4">
          <div
            className={`w-6 h-6 border-[3px] border-t-[3px] border-white border-t-gray-300 rounded-full animate-spin`}
          ></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default DangerButton;
