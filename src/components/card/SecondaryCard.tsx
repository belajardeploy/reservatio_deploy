import { CardProps } from "@/components/interface/InterfaceCard";

const SecondaryCard = ({ className, children }: CardProps) => {
  return (
    <div className={"p-1.5 bg-primary-5/25 rounded-md " + className}>
      {children}
    </div>
  )
}

export default SecondaryCard;