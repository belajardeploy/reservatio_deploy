import { CalendarClock } from "lucide-react";
import PrimaryCard from "@/components/card/PrimaryCard";
import CountDownTimerCard from "@/app/user/_components/ui/CountdownTimerCard";
import { reservasiresponse, statuskonfirmasiresponse } from "@/components/json/user/reservasiresponse";
import TicketReservationCard from "@/app/user/_components/card/TicketReservationCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SecondaryButton from "@/components/button/SecondaryButton";
import { useGetCheckStatusMutation } from "@/services/user/ReservationUserServices";
import dayjs from "dayjs";
import SuccessModal from "@/components/modal/SuccessModal";

interface confirmationpageprops {
  // result: reservasiresponse,
  setPage: (val: number) => void
}

export const CountdownConfirmation = ({ setPage }: confirmationpageprops) => {
  const params = useSearchParams()
  const raw = params.get('reservations') ?? '[]'
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null)
  const [statusdata, setStatusData] = useState<statuskonfirmasiresponse>()
  // const { data, refetch } = useGetCheckStatusQuery({ code: code })
  const [getCode] = useGetCheckStatusMutation()
  const [animate, setAnimate] = useState<boolean>(true)


  // parse JSON hanya sekali
  const reservation: reservasiresponse = useMemo(() => {
    try {
      return JSON.parse(decodeURIComponent(raw))
    } catch {
      return []
    }
  }, [raw])

  const target = dayjs(reservation.expires_at); // Waktu target
  const now = dayjs(); // Waktu sekarang
  const timer = target.diff(now, 'second')

  useEffect(() => {
    if (raw === null) {
      router.replace("/");
    }
  }, [raw, router]);

  const CheckConfirmed = useCallback(async () => {
    const data = await getCode({ code: reservation.ticket_code }).unwrap()
    if (!data) return

    const { status, data: content } = data
    console.log(data)
    if (status === 'error') {
      setPage(1)
      router.push('/user/buat_reservasi')
      return;
    }

    // console.log(data)
    setStatusData(content)
    setAnimate(false)

    if (content.not_confirmed.length < 1) {
      ref.current?.showModal()
    }

    if (!now.isAfter(target)) return null

    if (content.not_confirmed.length > 0) {
      setPage(1)
    }
  }, [setPage, getCode, reservation.ticket_code, target, now, router]);

  useEffect(() => {
    CheckConfirmed()
  }, [CheckConfirmed])

  if (!reservation) {
    return null;
  }

  async function onClick() {
    setAnimate(true)
    CheckConfirmed()
  }

  // async function CheckConfirmed() {
  //   const data = await getCode({ code: reservation.ticket_code }).unwrap()
  //   if (!data) return

  //   const { status, data: content } = data
  //   console.log(data)
  //   if (status === 'error') {
  //     setPage(1)
  //     router.push('/user/buat_reservasi')
  //     return;
  //   }

  //   // console.log(data)
  //   setStatusData(content)
  //   setAnimate(false)

  //   if (content.not_confirmed.length < 1) {
  //     ref.current?.showModal()
  //   }

  //   if (!now.isAfter(target)) return null

  //   if (content.not_confirmed.length > 0) {
  //     setPage(1)
  //   }
  // }

  

  return (
    <div className="md:px-4 md:pt-4 md:pb-0 p-3.5 space-y-4">
      <div className="flex gap-4 lg:flex-row flex-col-reverse">
        <TicketReservationCard result={reservation} className="lg:w-2/3 w-full border-2">
          <PrimaryCard className="font-semibold text-sm flex gap-x-2">
            <CalendarClock size={24} strokeWidth={1.67} />
            Menunggu konfirmasi anggota! Pastikan semua anggota yang diundang sudah menyetujui reservasi melalui email mereka.
          </PrimaryCard>
        </TicketReservationCard>
        <CountDownTimerCard totalSeconds={timer} targetDate={reservation.expires_at} onFinish={() => CheckConfirmed()} delayOnFinish={2000} className="lg:max-w-1/3 w-full" />

      </div>
      <SecondaryButton onClick={onClick} className="" disabled={animate}>
        Cek Status
      </SecondaryButton>

      <div className="space-y-2">
        {/* {
          statusdata?.confirmed.map((data, index) => (
            <p className="text-sm text-neutral-3" key={index}><span className="font-bold">{data} </span>telah melakukan konfirmasi</p>
          ))
        } */}

        {animate ?
          <div className="w-full flex items-center">
            <span className="loading loading-spinner loading-sm"></span>
          </div> :
          statusdata?.confirmed.map((data, index) => (
            <p className="text-sm text-neutral-3" key={index}><span className="font-bold">{data} </span>telah melakukan konfirmasi</p>
          ))
        }
      </div>

      <SuccessModal
        title="Reservasi berhasil dibuat!"
        message="Selamat! Detail tiket reservasi dapat dilihat di bagian “Reservasi & Riwayat”."
        ref={ref}
        outsideClosable={false}
        onConfirm={() => router.push('/user/reservasi_&_riwayat')}
      />
    </div>
  )
}