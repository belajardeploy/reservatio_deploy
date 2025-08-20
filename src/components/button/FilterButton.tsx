'use client'
import { BaseButtonProps } from "@/components/interface/InterfaceButton";
import clsx from "clsx"
interface custombutton extends BaseButtonProps{
  paragraphClick: (e : React.MouseEvent<HTMLParagraphElement>) => void
} 

const FilterButton = ({ children, className, paragraphClick }: custombutton) => {
  return (
    <p onClick={paragraphClick}
      className={clsx("hover:bg-neutral-4 w-full text-left px-2 py-1 duration-100 ease-in-out cursor-pointer text-sm rounded-sm",
        className)}>
      {children}
    </p>
  )
}

export default FilterButton;