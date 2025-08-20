import SidebarUser from "./_components/layout/SidebarUser";
// import HeaderUser from "@/app/user/_components/layout/header";
import HeaderUser from "@/components/layout/header";
import React from "react";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/config/auth";

interface layoutuser {
  children: React.ReactNode
}

const LayoutUser = async ({ children }: layoutuser) => {
  const session = await getServerSession(authOption)

  return (
      <div className="flex bg-gray-50 min-h-screen lg:h-fit relative">
        <SidebarUser className="md:flex hidden min-h-screen " />
        <section className="w-full">
          <HeaderUser sessiondata={session?.user} />
          <div className="mx-auto md:mx-0">
            {children}
          </div>
        </section>
      </div>
  )
}

export default LayoutUser;