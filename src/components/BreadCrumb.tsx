"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx"

interface BreadcrumbProps {
  className?: string;
  separator?: React.ReactNode;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className,
  separator = "/",
}) => {
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className={clsx("flex items-center", className)}>
      {segments.map((seg, idx) => {
        if (idx === 0) return null;
        const href = "/" + segments.slice(0, idx + 1).join("/");
        const isFirst = idx === 0;
        const isLast = idx === segments.length - 1;
        const isParent = idx === segments.length - 2;

        // class untuk semua crumb
        const baseClass = "text-sm px-1";
        const nonClickClass = "text-neutral-500";                 // gray untuk non-klik
        const activeClass = "text-primary-1 font-semibold";    // style segmen aktif
        const clickClass = "text-blue-1 hover:underline";      // style parent klik

        // pilih element dan class
        const content = capitalize(decodeURIComponent(seg));
        const classnames = clsx(
          baseClass,
          isLast ? activeClass : isParent ? clickClass : nonClickClass
        );

        return (
          <React.Fragment key={href}>
            {isFirst ? (
              <span className={clsx('text-neutral-3')}>{content}</span>
            ) : (
              <Link href={href} className={classnames} aria-current={isLast ? "page" : undefined}>
                {content.replaceAll('_', ' ').replaceAll('-', '')}
              </Link>
            )}
            {!isLast && <span className="px-1 text-neutral-400">{separator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
