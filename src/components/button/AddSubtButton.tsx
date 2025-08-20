'use client'
import { BaseButtonProps } from "@/components/interface/InterfaceButton";

const AddSubtButton = ({children, className, onClick}: BaseButtonProps) => {
  return(
    <button onClick={onClick} className={"text-lg text-primary-1 border-neutral-4 my-1 px-4 cursor-pointer " + className}>
      {children}
    </button>
  )
}

export default AddSubtButton;