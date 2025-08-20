import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import { laporanresponse } from "@/components/json/admin/LaporanResponse";

export interface LaporanItemProps {
  laporan: laporanresponse[];
  onSelect: (val: string) => void;
  onClick: (val: laporanresponse) => void;
  selectedId: string[];
}

export default function LaporanItem({
  laporan,
  onSelect,
  onClick,
  selectedId,
}: LaporanItemProps) {
  if (laporan?.length < 1) {
    console.log("LaporanItem rendered", laporan.length);
    return (
      <div className="text-center py-2 text-sm text-neutral-3">
        Tidak ada data laporan yang ditemukan.
      </div>
    );
  }
  return (
    laporan.map((item, index) => (
      <div
        className={clsx(
          "duration-200 ease-in-out border-b-[1px] border-neutral-4 hover:bg-neutral-4/50 cursor-pointer",
          selectedId.includes(item.id.toString()) && "bg-primary-3/10",
          item.is_read ? "bg-primary-3/10" : ''
        )}
        onClick={() => onClick(item)}
        key={index}
      >
        <div className="px-4 py-2 flex items-center gap-3">
          <button
            className={clsx(
              "border-2 rounded-sm h-5 w-5 cursor-pointer",
              selectedId.includes(item.id.toString()) && "bg-primary-1"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item.id.toString());
            }}
          >
            {selectedId.includes(item.id.toString()) && <Check className="stroke-white size-4" />}
          </button>
          <div className="flex items-center max-w-full w-full cursor-pointer">
            <h3 className="font-semibold text-xs text-left text-primary-1 w-[200px] truncate">
              {item.username}
            </h3>
            <div className="flex items-center gap-1 text-xs mr-auto">
              <h3 className="font-semibold">{item.category}</h3>
              <p>-</p>
              <p className="font-normal truncate w-[720px] text-left">
                {item.description}
              </p>
            </div>
            <p className="text-xss font-semibold">
              {item.created_at.split(",")[0]}
            </p>
          </div>
        </div>
      </div>
    ))
  );
}
