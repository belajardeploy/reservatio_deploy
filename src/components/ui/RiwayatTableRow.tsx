import React from "react";
import clsx from "clsx"
import { riwayatresponse } from "@/components/json/global/riwayatresponse";
// import { getStatusColor } from "@/lib/GetStatusColor";
import { getStatusColor } from "@/lib/GetStatusColor";

interface RiwayatTableRowProps {
  item: riwayatresponse;
}

export default function RiwayatTableRow({ item }: RiwayatTableRowProps) {
  const { bg, text } = getStatusColor(item.status);
  return (
    <>
      <div className="py-3 border-b border-gray-100">{item.date}</div>
      <div className="py-3 border-b border-gray-100 text-center">
        {item.total_person}
      </div>
      <div className="py-3 border-b border-gray-100">{item.table_number}</div>
      <div className="py-3 border-b border-gray-100">{item.time}</div>
      <div className="py-3 border-b border-gray-100">{item.purpose}</div>
      <div className="py-3 border-b border-gray-100">{item.ticket_code}</div>
      <div className="py-3 border-b border-gray-100">
        <p
          className={clsx(
            "py-1 text-center rounded-md text-sm font-semibold w-[121px]",
            bg,
            text
          )}
        >
          {item.status}
        </p>
      </div>
    </>
  );
}