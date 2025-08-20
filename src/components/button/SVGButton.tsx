import clsx from "clsx";
import { BaseButtonProps } from "../interface/InterfaceButton"


const SvgButton = ({ className, onClick, children }: BaseButtonProps) => {
  return (
    <button className={clsx("cursor-pointer", className)} onClick={onClick}>
      {children}
    </button>
  )
}

export default SvgButton;