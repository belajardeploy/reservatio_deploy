import WhiteCard from "@/components/card/WhiteCard";
import { ticketcardreservation } from "@/app/user/_components/interface/InterfaceTicketCard";

const TicketReservationCard = ({ result, className }: ticketcardreservation) => {
  return (
    <WhiteCard className={"" + className}>
      <div className="grid grid-cols-2 gap-y-4">
        <div className="xl:col-span-1 col-span-2 text-sm space-y-2 border-b-2 xl:border-b-0 border-b-neutral-4 pb-4 lg:pb-0">
          <h4 className="text-primary-2 font-normal">Email</h4>
          <div className="space-y-1.5">
            <p className="italic text-neutral-4">Pemesan</p>
            <p>{result.booker}</p>
          </div>
          {result.member.length > 0 &&
            <div className="space-y-1.5">
              <p className="italic text-neutral-4">Anggota</p>
              {result.member.map((data, index) => (
                <p className="" key={index}>{data}</p>
              ))}
            </div>
          }

        </div>
        <div className="xl:col-span-1 col-span-2 grid grid-cols-2 gap-y-4 text-sm">
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
        </div>
      </div>
    </WhiteCard>
  )
}

export default TicketReservationCard;