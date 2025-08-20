import { LegendProps } from "@/components/interface/InterfaceLegend";
import { Circle } from "lucide-react"

const Legend = ({ typecolor='available', content}: LegendProps) => {
  let color = 'fill-neutral-4'

  if(typecolor == 'available'){
    color = 'fill-primary-2'
  }else if(typecolor == 'full'){
    color = 'fill-red-2'
  }
  return (
    <div className="flex gap-x-2 items-center">
      <Circle size={12} className={"stroke-none " + color} />
      {/* <p>Tersedia</p> */}
      <p className="text-[10px]">{content}</p>
    </div>
  )
}

export default Legend;