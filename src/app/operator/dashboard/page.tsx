'use client'
import WhiteCard from "@/components/card/WhiteCard"
import { CalendarClock, ChevronRight, ListChecks, MessageCircleWarning, Plus, X } from "lucide-react"
// import StatusCardOpr from "@/app/operator/_components/card/CardOperator"
import { StatusCardOpr } from "@/app/operator/_components/card/CardOperator"
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx"
import { TimeSlotLabel } from "@/app/operator/_components/label/TimeSlotLabel"
import { availabilityresponse, detailreservationoprresponse } from "@/components/json/operator/DashboardOprResponse"
import SvgButton from "@/components/button/SVGButton"
import { AccordionDetail } from "@/app/operator/_components/ui/AccordionDetail"
import ScanQr from "@/app/operator/_components/ui/ScanQR"
import FormReservasi from "@/app/operator/_components/ui/FormReservasi"
import { TableButton } from "@/app/operator/_components/button/TableButton"
import { useGetAvailableTableOprQuery, useGetDashboardOprQuery, useGetDetailTableOprQuery } from "@/services/operator/DashboardOprService"
import { dashboardoprresponse } from "@/components/json/operator/DashboardOprResponse"
import { displaytime } from "@/data/today"
import Image from "next/image";
import FormLaporan from "@/app/operator/_components/ui/FormLaporan";
import { MdOutlineTableBar } from "react-icons/md";
import { Image as ImageLucide } from "lucide-react";
const DASHBOARDPAGE = () => {
  const [openform, setOpenForm] = useState(false);
  const [openlaporan, setOpenLaporan] = useState(false);
  const [opendetail, setOpenDetail] = useState<boolean>(false);
  const [tableid, setTableId] = useState<number>(1);
  const [timeslot, setTimeSlotId] = useState<number>(0)
  const [availabilitydata, setAvailabilityData] = useState<availabilityresponse>()
  const [dashboarddata, setDashboardData] = useState<dashboardoprresponse>()
  const [detailtable, setDetailTable] = useState<detailreservationoprresponse[]>([])
  const { data: availabilityresponse } = useGetAvailableTableOprQuery({ table_id: tableid }, { skip: tableid < 1 })
  const { data: detailresponse } = useGetDetailTableOprQuery({ table_id: tableid, time_slot_id: timeslot }, { skip: timeslot < 1 || tableid < 0 })
  const [animateAvailability, setAnimate] = useState<boolean>(true)
  const { data: dashboardresp, isFetching } = useGetDashboardOprQuery({})
  const [animateDetailTable, setAnimateDetailTable] = useState<boolean>(true)

  function getDetail(e: number) {
    setOpenDetail(true)
    setOpenForm(false)
    setTimeSlotId(e)
  }

  function OpenReservasi() {
    setOpenForm(o => !o)
    setOpenDetail(false)
  }

  function OpenLaporan(){
    setOpenLaporan(o => !o)
    setOpenDetail(false)
  }

  useEffect(() => {
    // setTimeSlotId(1)
    setAnimate(true)
  }, [tableid])

  useEffect(() => {
    setAnimate(true)
    if (availabilityresponse) {
      if (availabilityresponse.status == 'success') {
        console.log(availabilityresponse)
        setAvailabilityData(availabilityresponse.data)
        setAnimate(false)
      } else if (availabilityresponse.status == 'error') {
        setAnimate(false)
      }
    }
  }, [availabilityresponse])

  useEffect(() => {
    setAnimateDetailTable(true)
    if (detailresponse) {
      console.log(detailresponse)
      if (detailresponse.status == 'success') {
        setDetailTable(detailresponse.data)
        setAnimateDetailTable(false)
        // console.log('yatta')
      } else if (detailresponse.status == 'error') {
        setAnimateDetailTable(false)
        // console.log('yabbe')
      }
    }
  }, [detailresponse])

  useEffect(() => {
    if (dashboardresp) {
      console.log(dashboardresp)
      if (dashboardresp.status == 'error') {
        throw new Error("Kesalahan saat fetching data dashboard")
      } else if (dashboardresp.status == 'success') {
        setDashboardData(dashboardresp.data)
      }
    }

  }, [dashboardresp])

  return (
    <section className="md:pl-2 md:pr-0 md:pt-2 md:pb-1 pl-3.5 py-3.5 border-l-2 border-l-neutral-4 px-4 mt-3.5 md:mt-2 w-full">
      <div className="flex relative gap-x-2.5 justify-end  overflow-x-hidden">
        {/* SCAN QR */}
        <ScanQr className="min-w-[384px] border-r-2 border-r-neutral-4 pr-2" />
        {/* CONTENT CARD, TABLE DETAIL RESERVATION*/}
        {isFetching ?
          <div className="w-full h-[616px] flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
          : <div className={clsx("space-y-3 transition-transform pr-2 duration-300", openform || openlaporan ? 'w-2/3' : 'w-full')}>
            {/* CARD INFORMATION */}
            <div className="flex gap-x-2.5">
              <StatusCardOpr
                color="primary"
                title="Total Reservasi Hari Ini"
                value={dashboarddata?.total_reservation_today || 0}
                description="Semua reservasi"
              />

              <StatusCardOpr
                color="green"
                title="Total Check-in Hari Iniiii"
                icon={<ListChecks size={22} className="stroke-[#1BA794]" />}
                value={dashboarddata?.total_checkin_today || 0}
                description={`Dari total ${dashboarddata?.total_reservation_today} reservasi`}
              />

              <StatusCardOpr
                color="yellow"
                title="Total Meja Tersedia"
                value={dashboarddata?.total_available_table_today || 0}
                icon={<MdOutlineTableBar className="min-w-4 " size={22} color="#ebb305" />}
                description={`Update per ${displaytime} WIB`}
              />
            </div>
            <WhiteCard className="space-y-6">
              <div className="space-y-2">

                <div className="flex gap-x-2 p-1">
                  <MdOutlineTableBar className="min-w-4 " size={22} color="#1e3a8a" />
                  <h3 className="font-medium text-primary-1 text-sm">Semua meja</h3>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {
                    dashboarddata && dashboarddata.tables.map((data, idx) => (
                      <TableButton key={idx}
                        className={clsx("col-span-1", tableid == data.id && 'bg-primary-1 text-white')}
                        onClick={() => setTableId(data.id)}
                      >
                        {data.table_number}
                      </TableButton>
                    ))
                  }
                </div>
              </div>

              {animateAvailability ?
                <div className="w-full h-[210px] flex justify-center items-center">
                  <span className="loading loading-dots loading-lg"></span>
                </div>
                : <div className="flex gap-x-7">
                  <div className="min-w-[280px]">
                    <div className="flex gap-x-1 items-center">
                      <CalendarClock size={22} className="stroke-primary-1"/>
                      <h3 className="text-primary-1 font-medium text-sm">Status Ketersediaan</h3>
                    </div>
                    <div className="space-y-1.5 mt-4">
                      {availabilitydata?.availability.map((data, index) => (
                        <TimeSlotLabel
                          onClick={() => getDetail(index + 1)}
                          key={index}
                          is_reserved={!data.is_available}
                          className={clsx(timeslot - 1 == index ? "bg-primary-2/10 rounded-md" : 'border-b-2')}
                          itemclassName={clsx(timeslot - 1 == index ? "" : '')}
                          timeslot={data.time_slot}
                        />
                      ))}
                    </div>
                  </div>
                  <AnimatePresence>
                    {opendetail &&
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        className="min-w-[340px] border-2 border-neutral-4 p-3 rounded-lg space-y-2.5"
                      >
                        <div className="flex items-center border-b-2 border-neutral-4 pb-2">
                          <p className="mx-auto text-sm font-semibold">Detail Reservasi</p>
                          <SvgButton onClick={() => { setOpenDetail(o => !o); setTimeSlotId(0) }}>
                            <X size={16} className="stroke-neutral-3" />
                          </SvgButton>
                        </div>
                        <div className="overflow-y-auto h-[150px]">
                          {animateDetailTable ? (
                            <div className="w-full flex justify-center items-center">
                              <span className="loading loading-spinner loading-sm" />
                            </div>
                          ) : detailtable.length > 0 ? (
                            <AccordionDetail items={detailtable} />
                          ) : (
                            <p className="text-center italic text-sm">Tidak ada reservasi saat ini</p>
                          )}
                        </div>
                      </motion.div>
                    }
                  </AnimatePresence>
                  <div className="w-full transition duration-200">
                    <div className="flex gap-x-1 items-center">
                      <ImageLucide size={22} className="stroke-primary-1" />
                      <h3 className="text-primary-1 font-medium text-sm">Foto meja</h3>
                    </div>

                    <div className="flex gap-x-3 mt-4">
                      <div className="min-w-[240px] border-2 border-neutral-4 rounded-md">
                        <Image
                          src={availabilitydata?.thumbnail || "/Image/Default_table.jpg"}
                          width={240}
                          height={180}
                          alt={"Foto meja " + availabilitydata?.table_type}
                        />
                      </div>
                      <div className="w-full space-y-2.5">
                        <p className="bg-yellow-2/15 text-yellow-2 text-sm py-2 rounded-md text-center">{availabilitydata?.table_type}</p>
                        <p className="text-sm">{availabilitydata?.total_seats} Kursi</p>
                      </div>
                    </div>
                  </div>

                </div>}
            </WhiteCard>
          </div>}

        {/* CONTENT FORM CREATE */}
        {/* {
          !openform &&
        } */}
        <div className="absolute bottom-0 right-0 flex flex-col gap-y-2">
          <button className={clsx("-translate-y-1/2 shadow-sm rounded-4xl",
            "duration-300 ease-in-out ",
            openlaporan ? ' ' : 'hover:translate-x-1/3 translate-x-10/12'
          )}
            onClick={OpenLaporan}>
            <div className={clsx("bg-red-2 p-3 pl-4 cursor-pointer rounded-[28px] text-xl flex items-center gap-x-2 group",
              openlaporan ? 'w-[430px]' : 'w-[400px]'
            )}>
              {!openlaporan ?
                <>
                  <MessageCircleWarning size={44} className="stroke-white" />
                  <span className=" text-white font-medium opacity-0 group-hover:opacity-100 transition ml-4 duration-200 ease-in-out">
                    Buat Laporan
                  </span>
                </>
                :
                <ChevronRight size={44} className="stroke-white" />
              }
            </div>
          </button>
          <button className={clsx("-translate-y-1/2 shadow-sm rounded-4xl",
            "duration-300 ease-in-out ",
            openform ? ' ' : 'hover:translate-x-1/3 translate-x-10/12'
          )}
            onClick={OpenReservasi}>
            <div className={clsx("bg-primary-1 p-3 pl-4 cursor-pointer rounded-[28px] text-xl flex items-center gap-x-2 group",
              openform ? 'w-[430px]' : 'w-[400px]'
            )}>
              {!openform ?
                <>
                  <Plus size={44} className="stroke-white" />
                  <span className=" text-white font-medium opacity-0 group-hover:opacity-100 transition ml-4 duration-200 ease-in-out">
                    Buat Reservasi
                  </span>
                </>
                :
                <ChevronRight size={44} className="stroke-white" />
              }
            </div>
          </button>
        </div>

        {/* SLIDE FORM */}
        <AnimatePresence>
          {openform && (
            <div className="relative z-10 h-full">
              <motion.div
                key="panel"
                initial={{ width: 0, x: 600 }}
                animate={{ width: "100%", x: 0 }}
                exit={{ width: 0, x: 600 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-white h-[617px] overflow-y-auto min-w-[350px] rounded-lg border-2"
              >
                <FormReservasi />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {openlaporan && (
            <div className="relative z-10 h-full">
              <motion.div
                key="panel"
                initial={{ width: 0, x: 600 }}
                animate={{ width: "100%", x: 0 }}
                exit={{ width: 0, x: 600 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-white h-[617px] overflow-y-auto min-w-[350px] rounded-lg border-2"
              >
                {/* <FormReservasi /> */}
                <FormLaporan/>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default DASHBOARDPAGE;