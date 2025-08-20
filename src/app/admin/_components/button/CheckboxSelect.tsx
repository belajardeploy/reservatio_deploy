import React from "react";
import clsx from "clsx";

interface SelectAllButtonProps {
  active: boolean; // kriteria aktif/nonaktif
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string; // tambahan className custom
  icon?: React.ReactNode; // icon custom, default Minus
  activeClassName?: string; // tambahan class jika aktif
  inactiveClassName?: string; // tambahan class jika nonaktif
}

export default function CheckBoxSelect({
  active,
  onClick,
  className = "",
  icon,
  activeClassName = "",
  inactiveClassName = "",
}: SelectAllButtonProps) {
  return (
    <button
      className={clsx(
        "border-2 border-neutral-4 rounded-sm w-fit flex items-center gap-2 cursor-pointer",
        active
          ? clsx("bg-primary-1 text-white", activeClassName)
          : clsx("bg-transparent", inactiveClassName),
        className
      )}
      onClick={onClick}
    >
      {icon ?? <span className="stroke-white">{/* default icon here */}</span>}
    </button>
  );
}