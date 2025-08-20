'use client'

import BengkodLogo from "@/components/logo/Logo";
import { Menu, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import BreadCrumb from "@/components/BreadCrumb";
import DangerAltButton from "@/components/button/DangerAltButton";
// import { ContentMainLinks, ContentOtherLinks } from "./link";
import SideLink from "@/components/link/SideLink";
import { mainlinksadmin, otherlinksadmin } from "../content/links";

interface headeradminprops {
  sessiondata: any
}

const HeaderAdmin = ({ sessiondata }: headeradminprops) => {
  
  return (
    <section className="sticky top-0 self-start z-10 bg-white md:py-3 px-4 md:pr-[10%] border-b-[1px] border-b-neutral-4 flex w-full">
      {/* BREADCRUMB JUMP FIRST ROUTE */}
      <div className="my-auto md:block hidden">
        <BreadCrumb separator=">" />
      </div>
      <BengkodLogo className="md:hidden"/>

      {/* If desktop */}
      <div className="dropdown ml-auto md:block hidden">
        <div tabIndex={0} className="flex items-center ml-auto border-0 bg-transparent cursor-pointer">
          {/* <h1 className="ml-auto">Halo, {sessiondata.photo}</h1> */}
          <Image
            src={sessiondata.photo}
            // src={'https://ui-avatars.com/api/?name=John+Doe'}
            width={56}
            height={56}
            className="rounded-full ml-2 h-[56px] w-[56px] object-cover"
            alt="profile photo"
            unoptimized
          />
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg z-1 min-w-[300px] p-4 shadow-md border-neutral-4 border-[1px] -right-8">
          <div className="flex flex-col gap-y-2">
            <div className="px-2 border-b-2 border-b-neutral-4 pb-2">
              <p className="text-primary-1 text-xs font-light">{sessiondata.email_mhs}</p>
              <p className="text-black text-sm font-semibold mt-1">{sessiondata.name}</p>
            </div>

            <div className="flex gap-x-2 items-center">
              <UserRound size={16} strokeWidth={1} className=""/>
              <p className="text-xs">Profile</p>
            </div>
            <DangerAltButton
              onClick={() => signOut()}
            >
              Logout
            </DangerAltButton>
          </div>
        </ul>
      </div>

      <div className="dropdown ml-auto md:hidden my-auto">
        <div tabIndex={0} className="flex items-center ml-auto border-0 bg-transparent">
          
          <Menu className="stroke-primary-1" />
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg z-1 md:min-w-[300px] w-[175px] p-2 shadow-md border-neutral-4 border-[1px] -right-3">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-1">
              {mainlinksadmin.map((data, index) => (
                <SideLink href={data.href} key={index} className="rounded-lg ">
                  <p className="text-xs">{data.label}</p>
                </SideLink>
              ))}

              <hr className="text-neutral-4" />
              {otherlinksadmin.map((data, index) => (
                <SideLink href={data.href} key={index} className="rounded-lg">
                  <p className="text-xs">{data.label}</p>
                </SideLink>
              ))}
            </div>

            
            <DangerAltButton
              onClick={() => signOut()}
              className="text-xs"
            >
              Logout
            </DangerAltButton>
          </div>
        </ul>
      </div>
    </section>
  )
}
export default HeaderAdmin;