'use client'
import BengkodLogo from "@/components/logo/Logo"
import HeaderGlobal from "@/components/ui/HeaderGlobal"
import { signOut } from "next-auth/react"
import Image from "next/image"

interface headeroperatorprops {
  sessiondata: any
}

const HeaderOperator = ({sessiondata}: headeroperatorprops) => {
  return (
    <HeaderGlobal className="flex w-full">
      <BengkodLogo className="mr-auto" />

      <div className="dropdown ml-auto md:block hidden">
        <div tabIndex={0} className="flex items-center ml-auto border-0 bg-transparent">
          {/* <h1 className="ml-auto">Halo, {sessiondata.name}</h1> */}
          <Image
            src={sessiondata.src || "/Image/default-profile.png"}
            width={56}
            height={56}
            className="rounded-full ml-2"
            alt="profile photo"
          />
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg z-1 min-w-[300px] p-4 shadow-md border-neutral-4 border-[1px] right-5">
          <div className="flex flex-col gap-y-4">
            <div className="px-2">
              <p className="text-primary-1 text-xs font-light">{sessiondata.email_mhs}</p>
              <p className="text-black text-sm font-semibold mt-1">{sessiondata.name}</p>
            </div>

            <button
              onClick={() => signOut()}
              className="cursor-pointer border-[2px] rounded-md border-red-2 text-red-2 py-1.5 text-xs font-light hover:bg-red-2 hover:text-white duration-200 ease-in-out">
              Logout
            </button>
          </div>
        </ul>
      </div>
    </HeaderGlobal>
  )
}

export default HeaderOperator;