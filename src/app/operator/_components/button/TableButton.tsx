import { BaseButtonProps } from "@/components/interface/InterfaceButton"
import clsx from "clsx"

export const TableButton = ({ className, children, onClick }: BaseButtonProps) => {
  return (
    <button
      onClick={onClick}
    >
      <div
        className={clsx("w-full border-2 border-neutral-4 px-3 py-2.5 rounded-lg text-center hover:bg-neutral-4 text-xs hover:text-neutral-1 duration-200 ease-in-out cursor-pointer", className)}>
        {children}
      </div>
    </button>
  )
}