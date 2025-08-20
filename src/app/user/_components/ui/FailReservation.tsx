import PrimaryButton from "@/components/button/PrimaryButton"
import Image from "next/image";
import Link from "next/link"

const FailReservation = () => {
  return (
    <section className="flex lg:flex-row flex-col-reverse gap-y-6 justify-center items-center h-full my-auto">
      <div className="space-y-5 lg:w-[650px] w-[300px]">
        <h1 className="font-semibold text-primary-1 lg:text-4xl text-2xl">Waktu Habis!</h1>
        <p className="text-neutral-3 lg:text-lg text-xs">
          Reservasi tidak dapat dibuat karena ada anggota yang belum melakukan konfirmasi dalam waktu 5 menit.
        </p>
        <p className="text-neutral-3 lg:text-lg text-xs">
          Silakan lakukan reservasi ulang dengan waktu dan anggota yang sesuai.
        </p>
        <Link href={"/user/buat_reservasi"} className="text-sm">
          <PrimaryButton>
            Buat reservasi baru
          </PrimaryButton>
        </Link>
      </div>

      <Image
        src={'/Image/time_ended.png'}
        width={400}
        className="hidden lg:block"
        height={263}
        alt="Wait.png"
      />

      <Image
        src={'/Image/time_ended.png'}
        width={300}
        className="lg:hidden"
        height={200}
        alt="Wait.png"
      />
    </section>
  )
}

export default FailReservation;