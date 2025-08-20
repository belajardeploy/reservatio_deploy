import SideBarAdmin from "./_components/layout/SideBarAdmin";
import React from "react";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/config/auth";
import HeaderAdmin from "./_components/layout/HeaderAdm";

interface layoutuser {
  children: React.ReactNode
}

const LayoutAdmin = async ({ children }: layoutuser) => {
  const session = await getServerSession(authOption)

  return (
      <div className="flex bg-gray-50 min-h-screen lg:h-fit relative">
        <SideBarAdmin className="md:flex hidden min-h-screen " />
        <section className="w-full">
          <HeaderAdmin sessiondata={session?.user} />
          <div className="mx-auto md:mx-0">
            {children}
          </div>
        </section>
      </div>
  )
}

export default LayoutAdmin;