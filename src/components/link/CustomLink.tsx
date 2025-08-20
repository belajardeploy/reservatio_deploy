"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkProps } from "../interface/InterfaceLink";

function CustomLink({
  children,
  href,
  className,
  whenactive,
  whennotactive,
  getActive,
  statichref = href,
  ...props
}: LinkProps) {
  const pathname = usePathname();

  function onClick() {
    if (getActive) {
      getActive(pathname.startsWith(href));
    }
  }
  return (
    <Link href={href} onClick={onClick} {...props}>
      <div
        className={
          className +
          " " +
          (pathname.startsWith(href) || pathname.startsWith(statichref)
            ? whenactive
            : whennotactive)
        }
      >
        {children}
      </div>
    </Link>
  );
}

export default CustomLink;
