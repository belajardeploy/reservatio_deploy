"use client";

import { useCallback, useEffect, useState } from "react";
import WhiteCard from "@/components/card/WhiteCard";
import dayjs from "dayjs";

type TimerProps = {
  totalSeconds: number;
  initialSeconds?: number;
  onFinish?: () => void;
  className?: string;
  targetDate: string; // Tanggal target, jika tidak diberikan akan menggunakan waktu sekarang + 10 menit
  delayOnFinish?: number; // Delay dalam milidetik sebelum memanggil onFinish
};

export default function CountDownTimerCard({
  totalSeconds,
  initialSeconds,
  onFinish,
  targetDate,
  className = "",
  delayOnFinish = 0, // Default tidak ada delay
}: TimerProps) {
  const calculateTimeLeft = useCallback(() => {
    const now = dayjs();
    const difference = dayjs(targetDate).diff(now, "second");
    return difference > 0 ? difference : 0;
  }, [targetDate]);
  const [secondsLeft, setSecondsLeft] = useState(
    initialSeconds ?? totalSeconds
  );

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (delayOnFinish > 0) {
        // Delay sebelum memanggil onFinish
        setTimeout(() => {
          onFinish?.();
        }, delayOnFinish);
      } else {
        // Panggil langsung jika tidak ada delay
        onFinish?.();
      }
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onFinish, delayOnFinish, calculateTimeLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const format = (n: number) => n.toString().padStart(2, "0");

  return (
    <WhiteCard className={className}>
      <div className="flex flex-col h-full">
        <h3 className="text-center font-semibold text-sm">
          {secondsLeft <= 0
            ? "Waktu habis! Menunggu..."
            : "Menunggu konfirmasi anggota"}
        </h3>
        <div className="flex gap-x-3 md:text-9xl text-8xl text-primary-1 font-semibold mx-auto my-6">
          <p>{minutes > 0 ? format(minutes) : "00"}</p>
          <p>:</p>
          <p>{seconds > 0 ? format(seconds) : "00"}</p>
        </div>
      </div>
    </WhiteCard>
  );
}
