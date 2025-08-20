import React from "react";
import { BaseButtonProps } from "../interface/InterfaceButton";

interface ButtonCustomProps extends BaseButtonProps {
  icon?: React.ReactNode;
}

const NeutralButton: React.FC<ButtonCustomProps> = ({
  onClick,
  className = "",
  icon,
  children,
  type = "button",
  disabled = false,
}) => (
  <button
    type={type}
    className={`cursor-pointer bg-white p-2 py-2.5 border-2 border-neutral-4 rounded-lg focus:border-primary-3 text-xs focus:shadow-primary-4 flex items-center gap-2 ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon && <span>{icon}</span>}
    {children}
  </button>
);

export default NeutralButton;