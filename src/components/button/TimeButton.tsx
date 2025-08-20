
import clsx from "clsx"
import { BaseButtonProps } from "@/components/interface/InterfaceButton";

const TimeButton = ({ children, className, onClick, isActive, disabled }: BaseButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "p-1.5 rounded-md border-2",
        {
          "cursor-not-allowed text-neutral-4": disabled,
          "hover:border-primary-1 cursor-pointer": !disabled,
          "bg-primary-1 text-white": isActive,
          "border-white": !isActive,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default TimeButton;
