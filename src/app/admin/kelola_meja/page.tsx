"use client";
import WhiteCard from "@/components/card/WhiteCard";
import { DatePicker } from "@/components/ui/DatePicker";
import { time } from "@/data/time";
import { formattedtoday, now } from "@/data/today";
import dayjs from "dayjs";
import { Check } from "lucide-react";
import { AccordionDetailReservation } from "@/app/admin/_components/input/AccordionDetailReservasi";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Textarea } from "@headlessui/react";
import SecondaryButton from "@/components/button/SecondaryButton";
import DangerButton from "@/components/button/DangerButton";
import { DetailTableResponse } from "@/components/json/admin/kelolamejaresponse";
import {
  useDeleteReservasiAdmMutation,
  useGetDetailTableAdmQuery,
} from "@/services/admin/KelolaMejaAdmServices";
import KelolaMejaSkeleton from "@/app/admin/_components/ui/skeleton/KelolaMejaSkeleton";
import ButtonAdm from "@/app/admin/_components/button/ButtonAdm";
import { mockTables } from "@/data/table";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import CheckBoxSelect from "@/app/admin/_components/button/CheckboxSelect";
import HeadDetailKelolaMeja from "@/app/admin/_components/ui/HeadDetailKelolaMeja";

const KELOLAMEJAPAGE = () => {
  const [selectedMeja, setSelectedMeja] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(now);
  const [selectedTime, setSelectedTime] = useState<number>(1);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const cancelDialogRef = useRef<HTMLDialogElement>(null);
  const [animate, setAnimate] = useState(false);
  const [detailTable, setDetailTable] = useState<DetailTableResponse | null>(
    null
  );

  const [CancelReservation] = useDeleteReservasiAdmMutation();

  const {
    data: detailtableresponse,
    isFetching: isFetchingDetail,
    refetch,
  } = useGetDetailTableAdmQuery(
    {
      id: selectedMeja,
      date: dayjs(selectedDate).format("YYYY-MM-DD"),
      time_slot_id: selectedTime,
    },
    {
      skip: selectedMeja === null || selectedDate === undefined,
    }
  );

  useEffect(() => {
    if (!detailtableresponse) return;
    // console.log("detailtableresponse", detailtableresponse);s

    if (detailtableresponse.status == "error") {
      toast.error(`error: ${detailtableresponse.message}`);
      notFound();
    }

    if (detailtableresponse.status == "success") {
      toast.success("berhasil mengambil data meja");
      setDetailTable(detailtableresponse.data);
    }
  }, [detailtableresponse]);

  const handleToggleItem = (id: string) => {
    // Untuk mengizinkan hanya satu item terbuka pada satu waktu:
    setExpandedItems((prevExpanded) => (prevExpanded.includes(id) ? [] : [id]));

    // Untuk mengizinkan beberapa item terbuka:
    // setExpandedItems((prevExpanded) =>
    //   prevExpanded.includes(id)
    //     ? prevExpanded.filter((item) => item !== id)
    //     : [...prevExpanded, id]
    // );
  };

  useEffect(() => {
    resetSelection();
  }, [selectedDate, selectedTime]);

  const resetSelection = () => {
    setIsMultiSelect(false);
    setSelectedIds([]);
    setExpandedItems([]);
  };

  const toggleOption = (label: string) => {
    setSelectedIds((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleToggleMultiSelect = () => {
    if (isMultiSelect && selectedIds.length > 0) {
      cancelDialogRef.current?.showModal();
    } else if (isMultiSelect) {
      setIsMultiSelect(false);
    } else {
      setIsMultiSelect(true);
    }
  };

  const selectAll = () => {
    if (detailTable === null) return;
    if (selectedIds.length == detailTable.reservations.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        detailTable?.reservations.map((item) => item.id.toString())
      );
    }
  };

  async function SubmitCancel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAnimate(true);
    const formData = new FormData(e.currentTarget);
    selectedIds.forEach((id) => {
      formData.append("reservation_ids[]", id);
    });
    toast.loading("Memproses pembatalan reservasi...");
    const result = await CancelReservation(formData).unwrap();
    if (!result) return;

    toast.dismiss();
    if (result.status == "error") {
      toast.error(`Error: ${result.message}`);
      setAnimate(false);
      return;
    }

    toast.success("Pembatalan reservasi berhasil");
    refetch();
    cancelDialogRef.current?.close();
    resetSelection();
    setAnimate(false);
  }

  return (
    <div className="md:pl-4 md:pt-4 md:pr-2 md:pb-0 p-3.5 flex gap-4 w-full max-w-[4096px] h-[648px]">
      <WhiteCard className="grid grid-cols-3 min-w-1/2 gap-2">
        {mockTables.map((meja, index) => (
          <ButtonAdm
            className={clsx(
              selectedMeja === meja.id
                ? "bg-primary-1 text-white"
                : "bg-white hover:bg-primary-1 hover:text-white",
              "w-full h-full rounded-lg"
            )}
            key={index}
            onClick={() => {
              setSelectedMeja(meja.id);
              resetSelection();
            }}
          >
            {meja.table_number}
          </ButtonAdm>
        ))}
      </WhiteCard>
      <hr className="text-neutral-4 border-[1px] border-neutral-4 h-full" />
      {selectedMeja != null ? (
        isFetchingDetail ? (
          <KelolaMejaSkeleton />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <HeadDetailKelolaMeja
              detailTable={detailTable}
              tableId={selectedMeja}
              selectedTime={selectedTime}
              selectedDate={selectedDate}
            />
            <WhiteCard className="max-h-full h-full flex flex-col gap-4">
              <div className="flex gap-1 w-full">
                <DatePicker
                  className="mr-1 flex-1"
                  minDate={dayjs(formattedtoday).subtract(1, "day").toDate()}
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
                {time.map((data, index) => (
                  <ButtonAdm
                    className={clsx(
                      selectedTime === index + 1
                        ? "bg-primary-1 text-white"
                        : "bg-white hover:bg-primary-1 hover:text-white text-primary-1",
                      "w-full h-full rounded-full text-xs border-primary-1"
                    )}
                    key={index}
                    onClick={() => setSelectedTime(index + 1)}
                  >
                    {data}
                  </ButtonAdm>
                ))}
              </div>

              <div className="flex w-full items-center gap-2">
                {isMultiSelect && (
                  <CheckBoxSelect
                    active={
                      selectedIds.length === detailTable?.reservations.length &&
                      detailTable?.reservations.length > 0
                    }
                    onClick={selectAll}
                    icon={<Check size={16} className="stroke-white" />}
                  />
                )}
                <p className="text-xs text-neutral-3 mr-auto">
                  {selectedIds.length} dari {detailTable?.reservations.length}{" "}
                  reservasi
                </p>
                <button
                  onClick={handleToggleMultiSelect}
                  className={clsx(
                    "cursor-pointer text-xs hover:underline",
                    selectedIds.length > 0 ? "text-red-2" : "text-primary-1"
                  )}
                >
                  {isMultiSelect
                    ? selectedIds.length > 0
                      ? "Hapus"
                      : "Batal"
                    : "Pilih"}
                </button>
              </div>

              <div className="border-2 rounded-md w-full h-[340px] overflow-y-auto">
                {detailTable?.reservations.length ? (
                  detailTable?.reservations.map((item, index) => (
                    <div
                      key={index}
                      className={clsx(
                        "flex items-start border-b-2 border-neutral-4",
                        selectedIds.includes(item.id.toString())
                          ? "bg-primary-3/15"
                          : "bg-white"
                      )}
                    >
                      {isMultiSelect && (
                        <CheckBoxSelect
                          active={selectedIds.includes(item.id.toString())}
                          onClick={() => {
                            if (isMultiSelect) {
                              toggleOption(item.id.toString());
                            }
                          }}
                          icon={<Check size={16} className="stroke-white" />}
                          className="my-auto ml-3"
                        />
                      )}
                      <AccordionDetailReservation
                        key={index}
                        item={item}
                        isExpanded={expandedItems.includes(item.id.toString())}
                        onToggle={handleToggleItem}
                        className=" p-3 w-full"
                        iconClassName="text-primary-1"
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-xs">Tidak ada reservasi saat ini</p>
                  </div>
                )}
              </div>
            </WhiteCard>
          </div>
        )
      ) : (
        ""
      )}

      <dialog className="modal" ref={cancelDialogRef}>
        <div className="modal-box bg-white rounded-xl max-w-[420px] text-center">
          <div className="border-b-2 border-b-neutral-4 pb-2">
            <h1 className="font-semibold text-black text-center w-10/12 flex justify-center mx-auto ">
              Yakin ingin membatalkan reservasi ini?
            </h1>
          </div>

          <form
            action=""
            className="pt-5 flex flex-col gap-y-5 w-full"
            onSubmit={(e) => SubmitCancel(e)}
          >
            <label htmlFor="reason" className="text-xs">
              Mohon isi alasan pembatalan agar pengguna memahami penyebabnya.
            </label>
            {/* <h3 className="text-sm"></h3> */}
            <div className="">
              <Textarea
                placeholder="Masukkan alasan pembatalan"
                name="reason"
                className="w-full h-24 border-2 border-neutral-4 rounded-lg p-2 text-xs"
              />
            </div>

            <div className="flex gap-x-2 ml-auto">
              <SecondaryButton
                onClick={() => cancelDialogRef.current?.close()}
                disabled={animate}
              >
                Tutup
              </SecondaryButton>
              <DangerButton
                type="submit"
                isLoading={animate}
                className="w-[170px]"
              >
                Batalkan Reservasi
              </DangerButton>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default KELOLAMEJAPAGE;
