"use client";

// import { Calendar, Headset, House, Megaphone, Tickets, UserRound } from "lucide-react";
// import SideLink from "next/SideLink";
import { signOut } from "next-auth/react";
import BengkodLogo from "@/components/logo/Logo";
import DangerAltButton from "@/components/button/DangerAltButton";
import SideLink from "@/components/link/SideLink";
import clsx from "clsx"
import { ContentMainLinks, ContentOtherLinks } from "../content/ContentLink";

interface sidebarprops {
  className?: string
}

export default function SidebarUser({ className }: sidebarprops) {
  return (
    <aside className={clsx("sticky top-0 self-start flex flex-col min-w-[250px] bg-white border-r border-gray-200 px-4 pb-8", className)}>
      {/* Logo */}
      <div className="my-4 flex justify-center items-center">
        <BengkodLogo />
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col space-y-2 border-b-2 border-b-neutral-4 pb-2">
        {ContentMainLinks.map((link, index) => (
          <SideLink
            key={index}
            href={link.href}
            className="flex items-center gap-x-2 px-4 py-3 text-base rounded-xl "
          >
            {link.icon}
            <span className="text-sm">{link.label}</span>
          </SideLink>
        ))}
      </nav>

      {/* Spacer: dorong logout ke bawah */}

      {/* Profil & Hubungi Kami */}
      <nav className="flex flex-col space-y-2 my-4">
        {ContentOtherLinks.map((link, index) => (
          <SideLink
            key={index}
            href={link.href}
            className="flex items-center gap-x-2 px-4 py-3 text-base rounded-xl "
          >
            {link.icon}
            <span className="text-sm">{link.label}</span>
          </SideLink>
        ))}
      </nav>

      <DangerAltButton
        className="w-full mt-auto"
        onClick={() => signOut()}
      >
        Logout
      </DangerAltButton>
    </aside>
  );
}
