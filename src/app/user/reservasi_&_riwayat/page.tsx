'use client'
import { useState } from "react";
import ReservasiAktif from "@/app/user/_components/ui/ReservasiAktif";
import ReservasiRiwayat from "@/app/user/_components/ui/ReservasiRiwayat";

const RESERVASIANDRIWAYAT = () => {
  const [route, setRoute] = useState<number>(0)
  return (
    <section className="p-4 relative">
      <div className="border-2 border-neutral-4 bg-white w-[295px] h-[36px] flex mx-auto lg:mx-0 rounded-lg gap-x-0.5 text-xs">
        <button className={"hover:bg-primary-1 m-0.5 hover:text-white duration-200 ease-in-out rounded-md w-full " + (route == 0 ? 'bg-primary-1 text-white' : 'text-black')} onClick={() => setRoute(0)}>Aktif</button>
        <button className={"hover:bg-primary-1 m-0.5 hover:text-white duration-200 ease-in-out rounded-md w-full " + (route == 1 ? 'bg-primary-1 text-white' : 'text-black')} onClick={() => setRoute(1)}>Riwayat</button>
      </div>

      <div className="mt-4">
        {route == 0 && <ReservasiAktif />}
        {route == 1 && <ReservasiRiwayat />}
      </div>
    </section>
  )
}

export default RESERVASIANDRIWAYAT;