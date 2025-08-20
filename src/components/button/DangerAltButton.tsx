"use client"
import React from "react";
import { BaseButtonProps } from "@/components/interface/InterfaceButton";

const DangerAltButton = ({
  children,
  className,
  onClick,
  disabled = false,
  isLoading = false,
}: BaseButtonProps) => {
  return (
    <button
      className={"cursor-pointer border-[2px] rounded-md py-1.5 font-medium duration-200 ease-in-out " +
        (disabled || isLoading
          ? "bg-red-3 text-white cursor-not-allowed "
          : "border-red-2 text-red-2 hover:bg-red-2 hover:text-white ") +
        "rounded-lg " +
        className
      }
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default DangerAltButton;
