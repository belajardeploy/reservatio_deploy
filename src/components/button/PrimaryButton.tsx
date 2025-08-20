import React from "react";
import { BaseButtonProps } from "@/components/interface/InterfaceButton";

const PrimaryButton = ({
  children,
  className,
  onClick,
  disabled = false,
  isLoading = false,
}: BaseButtonProps) => {
  return (
    <button
      className={"p-2 min-w-[40px] font-medium " +
        (disabled || isLoading
          ? "bg-primary-3/50 text-white cursor-not-allowed "
          : "bg-primary-1 hover:bg-primary-2 ease-in duration-200 text-gray-100 cursor-pointer  ") +
        "rounded-lg " +
        className
      }
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <span className="loading loading-spinner loading-sm"></span>
          {/* <span className="invisible absolute">{children}</span> */}
          <p className="invisible absolute">{children}</p>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
