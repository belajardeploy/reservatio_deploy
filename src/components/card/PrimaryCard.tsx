import { CardProps } from "@/components/interface/InterfaceCard";

const PrimaryCard = ({ className, children }: CardProps) => {
  return (
    <div className={"p-3 bg-primary-3/7 rounded-md " + className}>
      {children}
    </div>
  )
}

export default PrimaryCard;