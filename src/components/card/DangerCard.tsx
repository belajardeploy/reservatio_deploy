import { CardProps } from "@/components/interface/InterfaceCard";

const DangerCard   = ({ className, children }: CardProps) => {
  return (
    <div className={"bg-red-3/50 rounded-md p-3 " + className}>
      {children}
    </div>
  )
}

export default DangerCard ;