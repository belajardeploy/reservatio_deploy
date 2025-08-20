import React from "react";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/config/auth";
import HeaderOperator from "@/app/operator/_components/layout/HeaderOperator";
interface layoutuser {
  children: React.ReactNode
}

const LayoutOperator = async ({ children }: layoutuser) => {
  const session = await getServerSession(authOption)

  return (
    <>
      <HeaderOperator sessiondata={session?.user} />
      {children}
    </>
  )
}

export default LayoutOperator;