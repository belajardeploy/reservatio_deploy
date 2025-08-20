import React from "react";
import clsx from "clsx";
import { BaseButtonProps } from "@/components/interface/InterfaceButton";

export default function ButtonAdm({ className = 'w-full h-full', children, onClick, type='button' }: BaseButtonProps) {
  return (
    <button
      className={clsx(
        "col-span-1 border-2 cursor-pointer",
        "transition duration-200 ease-in-out",
        className
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}