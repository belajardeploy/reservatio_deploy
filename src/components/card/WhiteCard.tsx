import { CardProps } from "@/components/interface/InterfaceCard";

const WhiteCard = ({children, className}: CardProps) => {
  return (
    <div className={"bg-white rounded-xl lg:p-4 p-3 border-2 border-neutral-4 " + className}>
      {children}
    </div>
  )
}

export default WhiteCard;