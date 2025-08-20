// src/components/Calendar.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  parseISO,
  format,
  isToday,
} from "date-fns";
import WhiteCard from "@/components/card/WhiteCard";
import {
  calendaresponse,
  datacalendar,
} from "@/components/json/user/dashboardresponse";
import clsx from "clsx"
import {
  CalendarClock,
  CalendarSync,
  ChevronDown,
  UsersRound,
  X,
} from "lucide-react";
import { useGetDetailedCalendarQuery } from "@/services/user/DashboardUserServices";
import SecondaryButton from "@/components/button/SecondaryButton";
import Link from "next/link";
import dayjs from "dayjs";
import { Transition } from "@headlessui/react";
interface CalendarProps {
  labels?: calendaresponse[];
  className?: string;
}

const LogCalendarCard: React.FC<CalendarProps> = ({ labels = [] }) => {
  // State untuk bulan & tahun saat ini
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  ); // 0 = Januari
  const currentYear = new Date().getFullYear()
  const [date, setDate] = useState<string>("");
  const [detailcalendar, setDetailCalendar] = useState<datacalendar[]>([]);
  const { data, isFetching } = useGetDetailedCalendarQuery(
    { date: date },
    { skip: date == "" }
  );
  // const [animate, setAnimate] = useState<boolean>(true);
  const [openDate, setOpenDate] = useState<string | null>(null);

  useEffect(() => {
    // setAnimate(true);
    if (data) {
      console.log(data);
      if (data.status == "success") {
        setDetailCalendar(data.data);
        // setAnimate(false);
      } else if (data.status == "error") {
        console.error("Error while fetching data!");
        // setAnimate(false);
      }
    }
  }, [data]);

  function onClick(e: string) {
    setDate(e);
    // setOpenDate(isOpen ? null : e)
    // setAnimate(true)
    // console.log("try to click!", e)
  }

  // Fungsi untuk membentuk array berisi semua tanggal yang ditampilkan di grid
  const getDatesForCalendar = (month: number, year: number): Date[] => {
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(new Date(year, month));

    // Mencari awal grid (misal: Senin pertama di minggu `start`)
    const startGrid = startOfWeek(start, { weekStartsOn: 1 }); // 1 = Senin
    // Mencari akhir grid (Minggu terakhir di minggu `end`)
    const endGrid = endOfWeek(end, { weekStartsOn: 1 });

    // Iterasi dari startGrid sampai endGrid, increment per hari
    const dateArray: Date[] = [];
    let currentDate = startGrid;

    while (currentDate <= endGrid) {
      dateArray.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }

    return dateArray;
  };

  // Dapatkan array tanggal
  const allDates = getDatesForCalendar(currentMonth, currentYear);

  // Fungsi bantu untuk mencari label dari props
  const getLabelForDate = (data: Date) => {
    return labels.find((label) => isSameDay(parseISO(label.date), data));
  };

  return (
    <WhiteCard className="min-w-[260px] flex flex-col">
      {/* Header */}
      <div className="calendar-header mb-4 flex items-center gap-x-2">
        <CalendarSync />
        <h3 className="text-xs font-medium">Log Reservasi</h3>
        <div className="relative inline-block ml-auto">
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
            className="
                      appearance-none
                      text-xs text-primary-1 font-semibold
                    bg-primary-3/10
                      focus:outline-none focus:ring-2 focus:ring-primary-3
                      rounded-md
                      py-1.5
                      pr-6
                      pl-1
                      cursor-pointer
                      text-center
              "
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {dayjs().month(i).format("MMM")}
              </option>
            ))}
          </select>

          {/* ikon di-layer atas select */}
          <ChevronDown
            size={16}
            className="
                  pointer-events-none
                  absolute
                  top-3.5
                  right-1
                  -translate-y-1/2
                stroke-primary-1
                  "
          />
        </div>
      </div>

      {/* Header hari (Mo, Tu, We, Th, Fr, Sa, Su) */}
      <div className="calendar-row header-row text-xs grid grid-cols-7 text-center font-semibold mb-1">
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
        <div>Su</div>
      </div>

      {/* Grid Tanggal */}
      <div className="calendar-grid grid grid-cols-7 gap-0.5">
        {allDates.map((data, idx) => {
         
          const date = format(data, "yyyy-MM-dd");
          const isOpen = openDate === date;

          // Cek apakah data di luar currentMonth (untuk styling abu-abu)
          const isCurrentMonth = data.getMonth() === currentMonth;
          const today = isToday(data);
          
          // console.log("Adalah hari ini?", today, data);
          // Cek label
          const labelData = getLabelForDate(data);

          const content = <span className="text-xs ">{data.getDate()}</span>;
          const cellClasses = clsx(
            "calendar-cell h-8.5 text-center relative flex flex-col items-center justify-center",
            !isCurrentMonth && "text-neutral-4",
            today && " font-semibold mx-auto mt-1",
            labelData?.type === "past" &&
              !today &&
              "bg-neutral-3/15 rounded-full w-7 h-[28px] text-neutral-3/50",
            labelData?.type === "upcoming" &&
              !today &&
              "bg-primary-2/10 rounded-full w-7 h-[28px] text-primary-1"
          );

          if (
            labelData &&
            (labelData.type === "past" || labelData.type === "upcoming")
          ){
            // {today && console.log("Hari ini:", data);}
            return (
              <div key={idx} className="flex flex-col items-center justify-center relative">
                <div
                  className={clsx(cellClasses, "cursor-pointer")}
                  onClick={() => {
                    onClick(date);
                    setOpenDate(isOpen ? null : date);
                  }}
                >
                  <p className="text-xs">{data.getDate()}</p>
                  {today && (
                    <div className="border-2 border-black mx-auto rounded-full bg-white mt-1"></div>
                  )}
                </div>

                {labelData && (
                  <Transition
                    show={isOpen}
                    as={React.Fragment}
                    enter="transition-opacity duration-200 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div
                      className={clsx(
                        "absolute z-50 bg-white rounded shadow-md border border-neutral-4 p-3",
                        // Positioning: centered above the trigger (date cell)
                        "bottom-full left-1/2 mb-2 transform -translate-x-1/2",
                        // Sizing:
                        // Mobile-first: fit content, with min width, and max width to prevent overflow
                        "w-max max-w-[calc(100vw-2rem)] min-w-[200px]",
                        // sm screens and up (tablet/desktop): use a fixed width
                        "sm:w-[240px] sm:max-w-none"
                      )}
                    >
                      {/* Header popover */}
                      <div className="flex items-center mb-2">
                        <CalendarClock size={16} />
                        <p className="ml-1 text-sm font-medium">
                          {labelData.type === "upcoming"
                            ? "Reservasi Selanjutnya"
                            : "Reservasi Sebelumnya"}
                        </p>
                        <X
                          size={16}
                          className="ml-auto cursor-pointer stroke-neutral-3"
                          onClick={() => setOpenDate(null)}
                        />
                      </div>

                      {/* Body popover */}
                      {isFetching ? (
                        <div className="flex justify-center py-5">
                          <span className="loading loading-spinner loading-sm text-primary-1" />
                        </div>
                      ) : detailcalendar.length > 0 ? (
                        detailcalendar.map((item, i) => (
                          <div
                            key={i}
                            className={clsx(
                              i < detailcalendar.length - 1 &&
                                "border-b pb-2 mb-2",
                              "text-xs text-neutral-3 space-y-2"
                            )}
                          >
                            <p>{item.detail.time_slot_id}</p>
                            <p>{item.detail.purpose}</p>
                            <div className="flex items-center gap-1">
                              <UsersRound
                                size={16}
                                className="stroke-neutral-3"
                              />
                              <p>{item.detail.total_people}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-xs text-neutral-4">
                          Tidak ada detail.
                        </p>
                      )}

                      {/* Footer */}
                      {labelData.type === "upcoming" && (
                        <Link href="/user/reservasi_&_riwayat">
                          <SecondaryButton className="w-full mt-2 py-1">
                            Lihat detail
                          </SecondaryButton>
                        </Link>
                      )}
                    </div>
                  </Transition>
                )}
              </div>
            );
          }

          return (
            <div className={cellClasses} key={idx}>
              {content}
              {today && <div className="border-2 border-black mx-auto rounded-full bg-white mt-1"></div>}
            </div>
          );
        })}
      </div>
    </WhiteCard>
  );
};

export default LogCalendarCard;
