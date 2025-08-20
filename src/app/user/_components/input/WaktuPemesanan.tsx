'use client'
import { Clock } from "lucide-react";
import SecondaryCard from "@/components/card/SecondaryCard";
import WhiteCard from "@/components/card/WhiteCard";
import TimeButton from "@/components/button/TimeButton";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Import bahasa Indonesia
import { time } from "@/data/time";
import { currentTime, formattedtoday } from "@/data/today";
import { useEffect, useState } from "react";

dayjs.locale("id");

interface waktupemesanan {
  date: Date | undefined,
  setTimeSlot: (x: number) => void,
  id: number,
}

const WaktuPemesanan = ({ date, setTimeSlot, id }: waktupemesanan) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // mencegah ssr rendering, app router default komponen dirender secara ssr
  }
  const formatteddate = dayjs(date).format("YYYY-MM-DD")
  const isToday = formattedtoday == formatteddate
  return (
    <WhiteCard className="flex flex-col gap-y-3">
      <SecondaryCard className="flex gap-x-2 items-center">
        <Clock className="stroke-primary-1" size={16} strokeWidth={2.5} />
        <p className="font-semibold text-primary-1 text-xs">
          Waktu Pemesanan
        </p>
      </SecondaryCard>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {
          time.map((data, key) => {
            const [start] = data.split('-'); // Pisahkan start dan end
            const [starthours, startminute] = start.split(':').map(Number)
            const starttime = starthours * 60 + startminute
            const disable = isToday && currentTime >= starttime
            // console.log(disable)
            return (
              <TimeButton key={key} onClick={() => setTimeSlot(key + 1)} isActive={id == key + 1} disabled={disable}>{data}</TimeButton>
            )
          })
        }
      </div>
    </WhiteCard>
  )
}

export default WaktuPemesanan;