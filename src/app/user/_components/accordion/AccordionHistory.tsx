"use client";

import type React from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { riwayatresponse } from "@/components/json/global/riwayatresponse"; // Pastikan path ini benar
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/id"; // Import bahasa Indonesia
import { getStatusColor } from "@/lib/GetStatusColor"; // Pastikan path ini benar

dayjs.locale("id");
dayjs.extend(customParseFormat);

export function AccordionHistoryItem({
  item,
  isExpanded,
  onToggle,
  className,
  headerClassName,
  contentClassName,
  iconClassName,
  animationDuration = 300,
}: {
  item: riwayatresponse;
  isExpanded: boolean;
  onToggle: (id: string) => void; // ID yang digunakan adalah ticket_code
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
  animationDuration?: number;
}) {
  const { bg, text } = getStatusColor(item.status);

  return (
    <div
      className={clsx(
        className,
        "border-b-[1px] border-b-neutral-4 py-2.5" // Styling item dasar
      )}
    >
      <button
        onClick={() => onToggle(item.ticket_code)}
        className={clsx(
          "flex w-full text-xs gap-x-3 pr-2",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500",
          headerClassName
        )}
        aria-expanded={isExpanded}
      >
        <ChevronDown
          className={clsx(
            "h-5 w-5 transition-transform duration-200 stroke-primary-1 bg-primary-3/10 rounded-full p-1",
            isExpanded && "transform rotate-180",
            iconClassName
          )}
        />
        <div className="grid grid-cols-2 text-left w-full">
          <p className="col-span-1">Tanggal: </p>
          <p className="col-span-1 text-primary-1">
            {dayjs(item.date, "DD MMM YYYY").format("dddd, DD MMMM YYYY")}
          </p>
        </div>
      </button>
      <div
        className={clsx(
          "overflow-hidden transition-all",
          isExpanded ? "max-h-96" : "max-h-0" // Atur max-h yang sesuai dengan konten Anda
        )}
        style={{ transitionDuration: `${animationDuration}ms` }}
      >
        <div
          className={clsx(
            "pl-8 pr-2 py-2 space-y-3 text-xs",
            contentClassName
          )}
        >
          <div className="grid grid-cols-2 w-full">
            <p className="col-span-1">Jumlah orang:</p>
            <p className="col-span-1 text-primary-1">{item.total_person}</p>
          </div>

          <div className="grid grid-cols-2">
            <p className="col-span-1">ID Reservasi:</p>
            <p className="col-span-1 text-primary-1">{item.ticket_code}</p>
          </div>

          <div className="grid grid-cols-2">
            <p className="col-span-1">Status:</p>
            <p className={clsx("p-1 px-2 rounded-sm w-fit", bg, text)}>
              {item.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}