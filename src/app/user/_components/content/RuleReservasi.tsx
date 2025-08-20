import PrimaryCard from "@/components/card/PrimaryCard";
import clsx from "clsx"
import { CalendarDays, Clock, Footprints, MoveRight, Users } from "lucide-react"
import { MdOutlineTableBar } from "react-icons/md"


const RuleReservation = ({ className }: { className?: string }) => {
  return (
    <PrimaryCard className={clsx(className)}>
      <div className={clsx("flex gap-x-2")}>
        <Footprints size={24} />
        <h1 className="text-sm font-semibold">Tahapan Reservasi</h1>
      </div>

      <div className={clsx("flex lg:flex-row flex-col gap-2 text-xs lg:mt-1 mt-2")}>
        <div className="flex gap-x-2">
          <Users className="stroke-primary-1 w-4" size={16} strokeWidth={2.5}/>
          <p>Tentukan jumlah orang</p>
        </div>
        <MoveRight className="stroke-neutral-3/50 lg:block hidden" size={18} />
        <div className="flex gap-x-2">
          <CalendarDays className="stroke-primary-1 w-4" size={16} strokeWidth={2.5} />
          <p>Pilih tanggal</p>
        </div>
        <MoveRight className="stroke-neutral-3/50 lg:block hidden" size={18} />
        <div className="flex gap-x-2">
          <Clock className="stroke-primary-1 w-4" size={16} strokeWidth={2.5} />
          <p>Pilih waktu peminjaman</p>
        </div>
        <MoveRight className="stroke-neutral-3/50 lg:block hidden" size={18} />
        {/* <Pointer className="stroke-primary-1 w-4" size={16} strokeWidth={2.5} /> */}
        <div className="flex gap-x-2">
          <MdOutlineTableBar className="stroke-primary-1 min-w-4" size={16} color="#1e3a8a" />
          <p>Lihat pada gambar dan pilih meja yang tersedia</p>
        </div>
      </div>
    </PrimaryCard>
  )
}

export default RuleReservation;