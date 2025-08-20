import WhiteCard from "@/components/card/WhiteCard";
import PrimaryButton from "@/components/button/PrimaryButton";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Import bahasa Indonesia
import clsx from "clsx"
import { ticketcardverified } from "@/app/user/_components/interface/InterfaceTicketCard";
dayjs.locale("id");

const TicketVerifiedCard = ({ result, className, onClick }: ticketcardverified) => {
  const starttime = result.time.split(' - ')[0];
  const dateStr = result.date_original + ' ' + starttime; // 2025-05-14 15.00

  // Pastikan pakai format yang sesuai dengan string
  const dateParsed = dayjs(dateStr, "YYYY-MM-DD HH.mm");
  console.log(dateStr)
  const onehourbefore = dayjs(dateParsed).subtract(1, 'hour')
  const isClickable = dayjs().isAfter(onehourbefore)
  const hasStarted = dayjs().isAfter(result.date_original)
  const morethantwo = result.member.length > 2
  // console.log(hasStarted)
  return (
    <WhiteCard className={clsx(className,)}>
      {
        result.is_late && <p className="rounded-md p-2 bg-red-3/35 text-red-2 italic w-fit text-xs mb-2">Penalti diberikan karena melebihi batas waktu konfirmasi.</p>
      }
      {/* <p className="rounded-md p-2 bg-red-3/35 text-red-2 italic w-fit text-xs mb-2">Penalti diberikan karena melebihi batas waktu konfirmasi.</p> */}
      <div className="grid grid-cols-2 h-full gap-2">
        <div className="xl:col-span-1 col-span-2 text-sm flex flex-col gap-y-2 border-b-2 xl:border-b-0 border-b-neutral-4">
          <h4 className="text-primary-2 font-normal">Email</h4>
          <div className="space-y-1.5">
            <p className="italic text-neutral-4">Pemesan</p>
            <p>{result.booker}</p>
          </div>
          {/* {result.member.length > 0 &&
            <div className="space-y-1.5">
              <p className="italic text-neutral-4">Anggota</p>
              {result.member.map((data, index) => (
                <p className="" key={index}>{data}</p>
              ))}
            </div>
          } */}
          {result.member.length > 0 &&
            <div className="space-y-1.5">
              <p className="italic text-neutral-4">Anggota</p>
              {result.member.map((data, index) => {
                if(morethantwo && index > 0) return null
                return (
                  <p className="" key={index}>{data}</p>
                )
              }
              )}
              {morethantwo && <p className="text-[12px] text-neutral-4">+{result.member.length - 1} email</p>}
            </div>
          }
          <p className="text-[12px] text-neutral-4 mt-auto pt-2 ">{hasStarted && 'QR dapat dicetak 1 jam sebelum waktu reservasi'}</p>
        </div>
        <div className="xl:col-span-1 col-span-2 grid grid-cols-2 gap-y-2.5 text-sm">
          <div className="col-span-1 space-y-2">
            <h4 className="text-primary-2 font-normal">Waktu reservasi</h4>
            <p className="">{result.date}</p>
            <p className="">{result.time}</p>
          </div>
          <div className="col-span-1 text-right text-sm space-y-2">
            <h4 className="text-primary-2 font-normal">Kode Tiket</h4>
            <p className="">{result.ticket_code}</p>
          </div>
          <div className="col-span-1 text-sm space-y-2">
            <h4 className="text-primary-2 font-normal">Meja</h4>
            <p className="">{result.table_number}</p>
          </div>

          {onClick && <PrimaryButton onClick={onClick} disabled={!isClickable} className="h-fit w-fit ml-auto mt-auto">Cetak QR</PrimaryButton>}
        </div>
      </div>
    </WhiteCard>
  )
}

export default TicketVerifiedCard;