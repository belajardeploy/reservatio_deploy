import { BaseButtonProps } from "@/components/interface/InterfaceButton";
import clsx from "clsx"

const TableButton = ({children, className, onClick, isActive = false}: BaseButtonProps) => {
  return(
    <button onClick={onClick} 
    className={clsx("cursor-pointer rounded-md p-2 border-2 hover:border-primary-1 duration-300 ease-in-out"
     ,className
     ,(isActive ? ' bg-primary-1 text-white ' : ' border-neutral-4 ')
     )}>
      {children}
    </button>
  )
}

export default TableButton;