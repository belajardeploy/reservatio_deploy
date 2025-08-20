"use client";

import { riwayatresponse } from "@/components/json/global/riwayatresponse";
import { useGetHistoryQuery } from "@/services/user/HistoryUserServices";
import React, { useEffect, useState } from "react";
import { AccordionHistoryItem } from "@/app/user/_components/accordion/AccordionHistory";
import clsx from "clsx"
import PaginationControls from "@/components/ui/PaginationControls";
import { PerPageSelect } from "@/components/ui/PerPage";
import { getStatusColor } from "@/lib/GetStatusColor";

const ReservasiRiwayat = () => {
  const [page, setPage] = useState<number>(1);
  const [riwayat, setRiwayat] = useState<riwayatresponse[]>([]);
  const [animation, setAnimation] = useState<boolean>(false);
  const [limitpage, setLimitPage] = useState<number>(1);
  const [id, setID] = useState<string>("");
  const [paginate, setPaginate] = useState<number>(10);
  const { data, isLoading: riwayatloading } = useGetHistoryQuery({
    page: page,
    paginate: paginate,
  });

  useEffect(() => {
    setAnimation(true);
    if (data) {
      console.log(data.data.reservations);
      if (data.status == "success") {
        setRiwayat(data.data.reservations);
        setLimitPage(data.data?.pagination?.last_page || 1);
        setAnimation(false);
      } else if (data.status == "error") {
        setRiwayat([]);
        setAnimation(false);
      }
    }
  }, [data]);

  function NextPage() {
    if (page < limitpage) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function PreviousPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl">
      {animation && riwayatloading ? (
        <div className="w-full h-full flex justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="w-full hidden lg:grid lg:grid-cols-7 text-left rounded-xl p-6">
            {/* header */}
            <div className="py-2 text-black font-semibold text-sm border-b border-gray-200">
              Tanggal
            </div>
            <div className="py-2 text-black font-semibold text-sm border-b border-gray-200">
              Jumlah Orang
            </div>
            <div className="py-2 text-black font-semibold text-sm border-b border-gray-200">
              Nomor Meja
            </div>
            <div className="py-2 text-black font-semibold text-sm border-b border-gray-200">
              Waktu
            </div>
            <div className="py-2 text-black font-semibold text-sm border-b border-gray-200">
              Keperluan
            </div>
            <div className="py-2 text-black font-semibold text-sm border-b border-gray-200">
              Kode tiket
            </div>
            <div className="py-2 text-black font-semibold text-sm border-b border-gray-200">
              Status
            </div>

            {/* body */}
            {riwayat.length > 0 ? (
              riwayat.map((item, idx) => {
                const { bg, text } = getStatusColor(item.status);
                return (
                  <React.Fragment key={idx}>
                    <div className="py-3 border-b border-gray-100">
                      {item.date}
                    </div>
                    <div className="py-3 border-b border-gray-100 text-center">
                      {item.total_person}
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      {item.table_number}
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      {item.time}
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      {item.purpose}
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      {item.ticket_code}
                    </div>
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
                  </React.Fragment>
                );
              })
            ) : (
              <div className="col-span-7 py-10 text-center text-sm text-primary-1">
                Anda belum memiliki riwayat reservasi. Buat reservasi sekarang!
              </div>
            )}
          </div>
          <div className="block lg:hidden ">
            {riwayat.length > 0 ? (
              riwayat.map((item, idx) => (
                <AccordionHistoryItem
                  key={idx}
                  item={item}
                  isExpanded={item.ticket_code === id}
                  onToggle={(ticketCode: string) => {
                    if (id === ticketCode) {
                      setID("");
                    } else {
                      setID(ticketCode);
                    }
                  }}
                  animationDuration={300}
                />
              ))
            ) : (
              <div className="text-center text-primary-1 text-xs">
                <p>
                  Anda belum memiliki riwayat reservasi. Buat reservasi
                  sekarang!
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex items-center mt-4">
        <PerPageSelect value={paginate} onChange={setPaginate} />
        <PaginationControls
          className="ml-auto"
          page={page}
          limitPage={limitpage}
          onNext={NextPage}
          onPrevious={PreviousPage}
        />
      </div>
    </div>
  );
};

export default ReservasiRiwayat;
