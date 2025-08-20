import React from "react";
import WhiteCard from "@/components/card/WhiteCard";
import { ChevronRight, Megaphone } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { getStatusColor } from "@/lib/GetStatusColor";
import { reservationstodayresp } from "@/components/json/admin/dashboardresponse";
import ReservationTodayRowSkeleton from "./skeleton/ReservationTodayRowSkeleton";

interface TodayReservationsProps {
  reservations?: reservationstodayresp[];
  viewAllLink?: string;
  title?: string;
  className?: string;
  isLoading?: boolean;
}

const TodayReservations: React.FC<TodayReservationsProps> = ({
  reservations = [],
  viewAllLink = "/admin/kelola_reservasi",
  title = "Reservasi Hari ini",
  className = "",
  isLoading = false,
}) => {
  return (
    <WhiteCard className={clsx('flex flex-col gap-3 h-full', className)}>
      <div className="flex space-x-1.5 items-center">
        <Megaphone />
        <h1 className="font-medium text-sm">{title}</h1>
        <Link
          href={viewAllLink}
          className="ml-auto text-primary-1 text-[10px] flex gap-x-1 items-center hover:underline cursor-pointer"
        >
          Lihat semua
          <ChevronRight className="stroke-primary-1" size={14} />
        </Link>
      </div>

      <div className="border-b-2 py-2 pt-1 border-b-neutral-4 m-0">
        <div className="px-4">
          <div className="grid grid-cols-5 text-[10px] font-medium">
            <div className="col-span-1 font-medium">Pemesan</div>
            <div className="col-span-1 font-medium">Nomor Meja</div>
            <div className="col-span-1 font-medium">Keperluan</div>
            <div className="col-span-1 font-medium">Jumlah Orang</div>
            <div className="col-span-1 font-medium">Status</div>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <>
        <ReservationTodayRowSkeleton/>
        <ReservationTodayRowSkeleton/>
        <ReservationTodayRowSkeleton/>
        <ReservationTodayRowSkeleton/>
        </>
      ) : reservations && reservations.length > 0 ? (
        reservations.map((data, index) => {
          const { bg, text } = getStatusColor(data.status);
          return (
            <div
              className="border-b-2 py-1.5 border-b-neutral-4 m-0"
              key={index}
            >
              <div className="px-4">
                <div className="grid grid-cols-5 text-[10px] font-normal">
                  <div className="col-span-1 flex items-center font-normal">
                    {data.reserver}
                  </div>
                  <div className="col-span-1 flex items-center font-normal">
                    {data.table_number}
                  </div>
                  <div className="col-span-1 flex items-center font-normal">
                    {data.purpose}
                  </div>
                  <div className="col-span-1 flex items-center font-normal">
                    {data.total_people}
                  </div>
                  <div className="col-span-1 flex items-center font-normal">
                    <p
                      className={clsx(
                        "py-1 text-center rounded-md text-xs font-semibold w-[117px]",
                        bg,
                        text
                      )}
                    >
                      {data.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-neutral-3 italic">
            Tidak ada reservasi hari ini!
          </p>
        </div>
      )}
    </WhiteCard>
  );
};

export default TodayReservations;