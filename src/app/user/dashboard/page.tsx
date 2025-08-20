'use client'
import PrimaryCard from "@/components/card/PrimaryCard";
import WhiteCard from "@/components/card/WhiteCard";
import { Info, SquarePen } from "lucide-react";
import DangerCard from "@/components/card/DangerCard";
import StatusLabel from "@/app/user/_components/label/StatusLabel";
import ReservationCountCard from "@/app/user/_components/card/ReservationCountCard";
import PenaltyCard from "@/app/user/_components/card/PenaltyCard";
import LogCalendarCard from "@/app/user/_components/card/LogCalendarCard";
import { useEffect, useState } from "react";
import { useGetDashboardQuery } from "@/services/user/DashboardUserServices";
import NearestReservasiCard from "@/app/user/_components/card/NearestReservasiCard";
import { calendaresponse, mockstatus, nearestresponse,  statusresponse } from "@/components/json/user/dashboardresponse";
import { useSession } from "next-auth/react";
import { Accordion } from "@/components/ui/accordion";
import { pengumumanUserresponse } from "@/components/json/global/pengumumanresponse";
import { DashboardAnnouncement } from "@/app/user/_components/ui/DashboardAnnouncement";
import { ContentPeraturanReservasi, ContentPenaltyInfo } from "@/app/user/_components/content/ContentDashboardUser";
import Image from "next/image";

const DASHBOARDPAGE = () => {
  const user = useSession()
  const [calendar, setCalendar] = useState<calendaresponse[]>([])
  const [nearest, setNearest] = useState<nearestresponse>()
  const [penalty, setPenalty] = useState<number | null>(null)
  const [reservation, setReservation] = useState<number | null>(null)
  const [status, setStatus] = useState<statusresponse>(mockstatus)
  const [latestpengumuman, setLatestPengumuman] = useState<pengumumanUserresponse[]>([])
  const [animate, setAnimate] = useState<boolean>(true);

  const { data } = useGetDashboardQuery({}, {refetchOnMountOrArgChange: true})

  useEffect(() => {
    setAnimate(true)
    if (data) {
      console.log(data)
      if (data.status == 'success') {
        setCalendar(data.data.calendar_reservation)
        setNearest(Object.keys(data.data.nearest_reservation).length > 0
          ?
          data.data.nearest_reservation
          :
          null
        )
        setPenalty(data.data.penalty_count)
        setReservation(data.data.reservation_completed)
        setStatus(data.data.status_account)
        setLatestPengumuman(data.data.announcements)
        setAnimate(false)
      } else if (data.status == 'error') (
        setAnimate(false)
      )
    }
  }, [data])

  return (
    <section className="md:pl-4 md:pt-4 md:pr-2 md:pb-0 p-3.5 flex flex-col gap-y-2 w-full max-w-[4096px]">
      {/* HEAD BANNER */}
      <div className="relative w-full z-0">
        <Image
          src="/Image/banner.png"
          width={1250}
          height={10}
          className="hidden md:block w-full h-[140px]"
          alt="banner"
        />

        <Image
          src="/Image/banner.png"
          width={343}
          height={82}
          className="h-[82px] w-full md:hidden"
          alt="banner"
        />

        <div className="absolute top-0 left-0 w-full h-full">
          <div className="mx-[4%] mt-[2%] font-semibold">
            <h1 className="text-white md:text-3xl text-sm">Halo! {user.data?.user.name}</h1>
            <h1 className="text-white mt-1 font-light md:text-base text-xs">Ayo, atur reservasimu dan mulai belajar tanpa gangguan.</h1>
          </div>
        </div>
      </div>

      {/* PERATURAN AND PENALTY */}
      <div className="lg:grid lg:grid-cols-2 flex flex-col gap-3 ">
        <PrimaryCard className="col-span-1 border-2 border-neutral-4">
          <div className="lg:flex gap-x-2.5 font-semibold hidden">
            <SquarePen size={20} />
            <h1 className="text-sm">Peraturan Reservasi</h1>
          </div>

          <div className="mt-2 ml-4 lg:block hidden">
            <ol className="list-decimal text-[11px]/5 ">
              <li>Hanya dapat meminjam meja <span className="font-semibold">1 Kali</span> dalam <span className="font-semibold">1 Hari</span> dan dapat dilakukan <span className="font-semibold">maksimal untuk 5 hari ke depan.</span></li>
              <li><span className="font-semibold">Dilarang</span> membawa <span className="font-semibold"> makanan & minuman berbau menyengat</span>  yang mengganggu orang lain.</li>
              <li>Jumlah orang, waktu, dan tanggal reservasi <span className="font-semibold">tidak dapat diubah</span> setelah reservasi berhasil dilakukan.</li>
            </ol>
          </div>

          <Accordion
            className="lg:hidden"
            items={ContentPeraturanReservasi}
          />
        </PrimaryCard>

        <DangerCard className="border-2 border-neutral-4 col-span-1 text-red-2">
          <div className="lg:flex gap-x-2.5 font-semibold hidden">
            <Info size={24} />
            <h1 className="text-sm">Peringatan Penalti</h1>
          </div>
          <div className="mt-2 ml-4 lg:block hidden">
            <ol className="list-decimal text-[11px]/5 ">
              <li>Jika total penalti mencapai <span className="font-semibold">3 kali</span> anda akan <span className="font-semibold">diblokir</span> dan tidak dapat melakukan reservasi.</li>
              <li>Jika tidak konfirmasi dalam <span className="font-semibold">1 jam</span> maka reservasi akan hangus dan terkena <span className="font-semibold"> penalti</span>.</li>
              <li>Pengguna yang <span className="font-semibold"> tidak menaati aturan </span> akan dikenakan penalti baik dari sistem atau operator selama <span className="font-semibold">1 minggu</span>.</li>
            </ol>
          </div>

          <Accordion
            items={ContentPenaltyInfo}
            className="lg:hidden"
          />
        </DangerCard>
      </div>

      {animate ?
        <div className="w-full h-[310px] flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary-1"></span>
        </div>
        :
        <div className="lg:grid lg:grid-cols-2 flex gap-y-3 md:gap-x-3 h-full">
          {/* LABEL, TOTAL RESERVASI, TOTAL PENALTI DEKSTOP*/}
          <div className="lg:flex gap-x-3 col-span-1 hidden">
            <LogCalendarCard labels={calendar} />
            <div className="w-full flex flex-col gap-y-4">
              {/* LABEL-TOTAL RESERVASI-PENALTI COUNT */}
              <WhiteCard className="">
                <StatusLabel data={status} />

                <div className="grid grid-cols-2 mt-1.5 gap-x-1.5">
                  {/* JUMLAH RESERVASI */}
                  <ReservationCountCard count={reservation} className="col-span-1" />

                  {/* PENALTI COUNT */}
                  <PenaltyCard count={penalty} limit={3} className="col-span-1" />
                </div>
              </WhiteCard>
              {/* RESERVASI TERDEKAT */}
              <NearestReservasiCard data={nearest} />
            </div>
          </div>

          {/* PENGUMUMAN DESKTOP*/}
          <div className="md:col-span-1 lg:block hidden">
            <DashboardAnnouncement datas={latestpengumuman} className="h-[322px]" />
          </div>

          {/* MOBILE RESOLUTION */}
          <div className="flex flex-col lg:hidden mt-1 gap-y-3 w-full">
            <StatusLabel
              data={status}
            />
            <div className="grid grid-cols-2 gap-x-3">
              {/* JUMLAH RESERVASI */}
              <ReservationCountCard count={reservation} />

              {/* PENALTI COUNT */}
              <PenaltyCard count={penalty} limit={3} />
            </div>

            {/* NEAREST RESERVASI */}
            <NearestReservasiCard data={nearest} />
            {/* PENGUMUMAN DASHBOARD */}
            <DashboardAnnouncement datas={latestpengumuman} />
            {/* KALENDER */}
            <LogCalendarCard labels={calendar} />
          </div>
        </div>}
    </section>
  )
}

export default DASHBOARDPAGE;