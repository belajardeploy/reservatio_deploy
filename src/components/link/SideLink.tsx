"use client";

import { LinkProps } from "@/components/interface/InterfaceLink";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideLink = ({ href, className, children, onClick }: LinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      className={
        className +
        " flex gap-x-3 text-lg hover:bg-primary-1 hover:text-white hover:fill-white duration-300 ease-in-out lg:p-3.5 p-2 " +
        (pathname.startsWith(href) ? "bg-primary-1 text-white fill-white" : " ")
      }
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default SideLink;
