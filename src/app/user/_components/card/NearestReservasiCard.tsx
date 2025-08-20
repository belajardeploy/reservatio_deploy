import WhiteCard from "@/components/card/WhiteCard"
import DeskSvg from "@/components/svg/DeskSvg"
import { ChevronRight, Clock, Tickets, Users } from "lucide-react"
import Link from "next/link"
import dayjs from "dayjs";
import "dayjs/locale/id"; // Import bahasa Indonesia
import { nearestresponse } from "@/components/json/user/dashboardresponse";
import { isToday } from "date-fns";
import clsx from "clsx";
dayjs.locale("id");
interface nearestreservasiprops {
  data: nearestresponse | undefined,
  classname?: string
}

const NearestReservasiCard = ({ data, classname }: nearestreservasiprops) => {
  // const isempty = data.person ? true : false
  return (
    <WhiteCard className={clsx("h-[135px] flex flex-col", classname)}>
      <div className="flex gap-x-2 items-center">
        <Tickets size={20} />
        <p className="font-medium text-xs">Reservasi</p>
      </div>

      {data ? <div className={" flex flex-col gap-y-2 text-sm mt-2"}>
        <div className="flex gap-x-2.5 items-center">
          <p className="text-[10px] text-neutral-3 italic">{
            isToday(data.date) ? 'Hari ini' : 'Akan datang'
            }</p>
          

          <div className="flex gap-x-1 ml-auto items-center">
            <Users size={12} className="stroke-neutral-3" />
            <p className="text-[10px]">{data.person}</p>
          </div>

          <div className="flex gap-x-1 items-center">
            <DeskSvg
              className="stroke-neutral-3"
              size={12}
            />
            <p className="text-[10px]">{data.table_number}</p>
          </div>
        </div>
        <h2 className="font-semibold text-xs text-primary-1">{dayjs(data.date).format('dddd, DD MMMM YYYY')}</h2>

        <div className="flex gap-x-1 items-center">
          <Clock className="stroke-neutral-3"
            size={12} />
          <p className="text-[10px]">{data.time_slot} WIB</p>

          <Link className="text-primary-1 text-[10px] flex gap-x-1.5 items-center ml-auto hover:underline" href={"/user/reservasi_&_riwayat"}>
            <p>Lihat Detail</p>
            <ChevronRight className="stroke-primary-1" size={12} />
          </Link>
        </div>
      </div>
        :
        <div className="text-center mx-auto my-auto">
          <p className="text-neutral-4 italic text-sm">Tidak reservasi hari ini!</p>
        </div>}
    </WhiteCard>
  )
}

export default NearestReservasiCard