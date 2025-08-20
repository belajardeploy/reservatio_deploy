import { logreservasiresponse } from "@/components/json/admin/logreservasiresponse";
import clsx from "clsx";
import React from "react";
import { getStatusColor } from "@/lib/GetStatusColor";
interface ActualLogTableProps {
  data: logreservasiresponse | null;
}

const ContentLogTable: React.FC<ActualLogTableProps> = ({ data }) => {
  if (data?.table.length === 0) {
    return (
      <div className="text-center py-2 text-sm text-neutral-3">
        Tidak ada data log reservasi yang ditemukan.
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-450px)]">
      {" "}
      {/* Sesuaikan max-h */}
      {data?.table.map((item, index) => {
        const { bg, text } = getStatusColor(item.status);
        return (
          <div
            key={index}
            className="border-b-2 py-2.5 border-b-neutral-4 m-0 hover:bg-neutral-4/10 transition-colors duration-150"
          >
            <div className="px-4">
              <div className="grid grid-cols-7 text-xs font-normal items-center">
                <div className="col-span-1">
                  {item.tanggal ? item.tanggal : "-"}
                </div>
                <div
                  className="col-span-1 truncate pr-2"
                  title={item.pemesan || undefined}
                >
                  {item.pemesan || "-"}
                </div>
                <div className="col-span-1 truncate pr-2">
                  {item.nomor_meja ? item.nomor_meja : "-"}
                </div>
                <div className="col-span-1">
                  {item.waktu ? item.waktu : "-"}
                </div>
                <div
                  className="col-span-1 truncate pr-2"
                  title={item.keperluan || undefined}
                >
                  {item.keperluan || "-"}
                </div>
                <div className="col-span-1 text-center">
                  {item.jumlah_orang ?? "-"}
                </div>
                <div className="col-span-1">
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentLogTable;
