"use client";

import type React from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/id"; // Import bahasa Indonesia
import { getStatusColor } from "@/lib/GetStatusColor"; // Pastikan path ini benar
import { detailreservationadm } from "@/components/json/admin/kelolamejaresponse";

dayjs.locale("id");
dayjs.extend(customParseFormat);

export function AccordionDetailReservation({
  item,
  isExpanded,
  onToggle,
  className,
  headerClassName,
  contentClassName,
  iconClassName,
  animationDuration = 300,
}: {
  item: detailreservationadm;
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
        // "border-b-[1px] border-b-neutral-4 pb-3" 
      )}
    >
      <button
        onClick={() => onToggle(item.id.toString())}
        className={clsx(
          "flex w-full text-xs gap-x-3 pr-2 cursor-pointer items-center",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500",
          headerClassName
        )}
        aria-expanded={isExpanded}
      >
        <div className="grid grid-cols-2 text-left w-fit">
          <p className="col-span-1 font-normal w-[111px]">Pemesan: </p>
          <p className="col-span-1 text-primary-1 font-medium">
            {item?.members[0].name}
          </p>
        </div>
        <ChevronDown
          className={clsx(
            "size-7 stroke-black transition-transform duration-200 rounded-full p-1 ml-auto",
            isExpanded && "transform rotate-180",
            iconClassName
          )}
        />
      </button>
      <div
        className={clsx(
          "overflow-hidden transition-all w-fit",
          isExpanded ? "max-h-96" : "max-h-0" // Atur max-h yang sesuai dengan konten Anda
        )}
        style={{ transitionDuration: `${animationDuration}ms` }}
      >
        <div className={clsx("pr-2 py-2 space-y-3 text-xs", contentClassName)}>
          <div className="grid grid-cols-2">
            <p className="col-span-1">Jumlah orang:</p>
            <p className="col-span-1 text-primary-1 font-medium">
              {item.total_people}
            </p>
          </div>

          {item.members.length > 1 && (
            <div className="grid grid-cols-2">
              <p className="col-span-1">Anggota:</p>
              <div className="col-span-1">
                {item.members.map((member, index) => (
                  <p key={index} className=" text-primary-1 font-medium">
                    {member.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2">
            <p className="col-span-1">Keperluan</p>
            <p className="col-span-1 text-primary-1 font-medium">
              {item.purpose}
            </p>
          </div>

          <div className="grid grid-cols-2">
            <p className="col-span-1">Status:</p>
            <p
              className={clsx("w-[111px] py-1 text-center rounded-sm font-semibold", bg, text)}
            >
              {item.status}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
