import React from "react";
import { BaseButtonProps } from "@/components/interface/InterfaceButton";

const SecondaryButton = ({
  children,
  className,
  onClick,
  disabled = false,
  isLoading = false,
  type="button",
}: BaseButtonProps) => {
  return (
    <button
    type={type}
      className={ "p-1.5 min-w-[40px] font-medium  border-2 flex items-center justify-center "+
        (disabled || isLoading
          ? "border-primary-1/10 text-neutral-4 cursor-not-allowed "
          : "border-primary-1 hover:bg-primary-1 hover:text-white ease-in duration-200 text-primary-1 cursor-pointer  ") +
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
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default SecondaryButton;
