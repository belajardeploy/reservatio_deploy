import clsx from "clsx"
import { ChevronRight } from "lucide-react"

interface timeslotprops {
  className?: string,
  is_reserved: boolean,
  timeslot: string,
  onClick?: (val: any) => void,
  itemclassName?:string
}

export const TimeSlotLabel = ({ is_reserved = false, timeslot, className, onClick, itemclassName }: timeslotprops) => {
  return (
    <div className={clsx("flex w-full items-center border-neutral-4 px-5 py-1.5 gap-x-2", className)}>
      <p className={clsx("mr-auto text-xs p-1.5", itemclassName)}>{timeslot}</p>
      <p className={clsx("rounded-sm py-1 text-xs w-[85px] text-center",
        is_reserved ? 'bg-primary-1/10 text-primary-1 ' : 'bg-green-2/15 text-green-2')}>
        {is_reserved ? 'Dipesan' : 'Tersedia'}
      </p>
      <button className="w-fit h-fit cursor-pointer" onClick={(onClick)}>
        <ChevronRight size={18} />
      </button>
    </div>
  )
}