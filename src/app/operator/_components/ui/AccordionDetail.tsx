"use client";

import type React from "react";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Import bahasa Indonesia
import { detailreservationoprresponse } from "@/components/json/operator/DashboardOprResponse";
import DangerButton from "@/components/button/DangerButton";
import { Textarea } from "@/components/ui/textarea";
import SecondaryButton from "@/components/button/SecondaryButton";
import { useDeleteReservasiOprMutation, usePenaltyReservationMutation } from "@/services/operator/DashboardOprService";
import SuccessModal from "@/components/modal/SuccessModal";
import FailureModal from "@/components/modal/FailureModal";
import DangerAltButton from "@/components/button/DangerAltButton";
dayjs.locale("id");
// Custom Accordion Components

export function AccordionDetail({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className,
  itemClassName,
  headerClassName,
  contentClassName,
  iconClassName,
  animationDuration = 300,
  onToggle,
}: {
  items: detailreservationoprresponse[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
  animationDuration?: number;
  onToggle?: (id: string, isExpanded: boolean) => void;
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>(
    defaultExpanded || []
  );
  const CancelRef = useRef<HTMLDialogElement>(null);
  const PenaltyRef = useRef<HTMLDialogElement>(null);
  const [idreservation, setIDReservation] = useState<number>(0);
  const successmodal = useRef<HTMLDialogElement>(null);
  const failuremodal = useRef<HTMLDialogElement>(null);
  const [CancelReservation] = useDeleteReservasiOprMutation();
  const [PenaltyReservation] = usePenaltyReservationMutation();
  const [message, setMessage] = useState<string>('Anda telah membatalkan reservasi untuk mahasiswa!')
  const [title, setTitle] = useState<string>('Reservasi')
  const [animate, setAnimate] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string[]>>();
  const toggleItem = (id: string) => {
    if (allowMultiple) {
      const newExpandedItems = expandedItems.includes(id)
        ? expandedItems.filter((item) => item !== id)
        : [...expandedItems, id];
      setExpandedItems(newExpandedItems);
      onToggle?.(id, !expandedItems.includes(id));
    } else {
      const newExpandedItems = expandedItems.includes(id) ? [] : [id];
      setExpandedItems(newExpandedItems);
      onToggle?.(id, !expandedItems.includes(id));
    }
  };

  async function SubmitCancel(e: React.FormEvent<HTMLFormElement>) {
    setAnimate(true)
    e.preventDefault();
    const body = new FormData(e.currentTarget);
    body.append("id", idreservation.toString());

    const result = await CancelReservation(body).unwrap();
    if (!result) return null;

    console.log(result)
    CancelRef.current?.close()
    if (result.status == "error") {
      setTitle('Reservasi')
      setMessage('Gagal melakuan pembatalan reservasi!')
      setError(result.data.errors);
      failuremodal.current?.showModal();
      throw new Error(`Kesalahan saat delete data ${result}`);
    }
    
    CancelRef.current?.close();
    if (result.status == "success") {
      setTitle('Reservasi')
      setMessage('Berhasil membatalkan reservasi!')
      successmodal.current?.showModal();
      // window.location.reload()
    }
    setAnimate(false)
    return null;
  }

  async function SubmitPenalty(e: React.FormEvent<HTMLFormElement>) {
    setAnimate(true)
    e.preventDefault();
    const body = new FormData(e.currentTarget);
    body.append("id", idreservation.toString());

    const result = await PenaltyReservation(body).unwrap();

    PenaltyRef.current?.close()

    if (!result) return null;

    if (result.status == "error") {
      // console.log(result)
      setTitle('Penalty')
      setMessage('Gagal memberikan penalti kepada mahasiswa tersebut!')
      setError(result.data.errors);
      failuremodal.current?.showModal();
      throw new Error(`Kesalahan saat delete data ${result}`);
    }
    CancelRef.current?.close();
    if (result.status == "success") {
      setTitle('Penalty')
      setMessage('Anda telah memberikan penalti kepada mahasiswa tersebut!')
      successmodal.current?.showModal();
      // window.location.reload()
    }
    setAnimate(false)
    return null;
  }

  function showCancelModal(e: number) {
    setIDReservation(e);
    CancelRef.current?.showModal();
  }

  function showPenaltyModal(e: number) {
    setIDReservation(e);
    PenaltyRef.current?.showModal();
  }

  return (
    <div className={clsx("w-full", className)}>
      {items.map((item, index) => {
        // console.log(bg)
        return (
          <div
            key={index}
            className={clsx(
              itemClassName,
              "border-b-[1px] border-b-neutral-4 py-2"
            )}
          >
            <button
              onClick={() => toggleItem(item.reservation_id)}
              className={clsx(
                " flex w-full items-center text-xs pr-2 gap-x-3",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500",
                headerClassName
              )}
              aria-expanded={expandedItems.includes(item.reservation_id)}
            >
              <ChevronDown
                className={clsx(
                  "min-w-7 transition-transform duration-200 stroke-primary-1 bg-primary-3/10 rounded-full",
                  expandedItems.includes(item.reservation_id) &&
                    "transform rotate-180",
                  iconClassName
                )}
              />
              <div className="grid grid-cols-2 w-full">
                <p className="text-left col-span-1">Pemesan </p>
                <p className="col-span-1 text-primary-1 text-left">
                  {item.reserver}
                </p>
              </div>
            </button>
            <div
              className={clsx(
                "overflow-hidden transition-all",
                expandedItems.includes(item.reservation_id)
                  ? "max-h-96"
                  : "max-h-0"
              )}
              style={{ transitionDuration: `${animationDuration}ms` }}
            >
              <div
                className={clsx(
                  "pl-10 pr-2 py-2 space-y-2 text-xs",
                  contentClassName
                )}
              >
                {/* {item.content} */}

                <div className="grid grid-cols-2 w-full">
                  <p className="col-span-1">Jumlah orang</p>
                  <p className="col-span-1 text-primary-1 text-left">
                    {item.total_people}
                  </p>
                </div>

                <div className="grid grid-cols-2">
                  <p className="col-span-1">Keperluan</p>
                  <p className="col-span-1 text-primary-1 text-left">
                    {item.purpose}
                  </p>
                </div>

                <div className="grid grid-cols-2">
                  <p className="col-span-1">Waktu </p>
                  <p className={" col-span-1 text-left text-primary-1"}>
                    {item.time_slot} WIB
                  </p>
                </div>

                <div className="flex justify-end gap-x-2 mt-1.5 ">
                  <DangerAltButton
                    className="px-2"
                    onClick={() =>
                      showPenaltyModal(parseInt(item.reservation_id))
                    }
                  >
                    Penalti
                  </DangerAltButton>
                  <DangerButton
                    className=""
                    onClick={() =>
                      showCancelModal(parseInt(item.reservation_id))
                    }
                    // isLoading={animate}
                  >
                    Hapus
                  </DangerButton>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <dialog className="modal" ref={CancelRef}>
        <div className="modal-box bg-white rounded-xl max-w-[420px] text-center">
          <div className="border-b-2 border-b-neutral-4 pb-2">
            <h1 className="font-semibold text-lg text-black text-center w-10/12 flex justify-center mx-auto ">
              Yakin ingin membatalkan reservasi ini?
            </h1>
          </div>

          <form
            action=""
            className="pt-5 flex flex-col gap-y-5 w-full"
            onSubmit={(e) => SubmitCancel(e)}
          >
            <label htmlFor="reason" className="text-sm">
              Mohon isi alasan pembatalan agar pengguna memahami penyebabnya.
            </label>
            {/* <h3 className="text-sm"></h3> */}
            <div className="">
              <Textarea
                placeholder="Masukkan alasan pembatalan"
                name="reason"
              />
              {error
                ? error.reason && (
                    <p className="text-xs text-red-2 text-left mt-1">
                      {error.reason[0]}
                    </p>
                  )
                : ""}
            </div>

            <div className="flex gap-x-2 ml-auto">
              <SecondaryButton onClick={() => CancelRef.current?.close()} disabled={animate}>
                Tutup
              </SecondaryButton>
              <DangerButton type="submit" isLoading={animate}>Batalkan Reservasi</DangerButton>
            </div>
          </form>
        </div>
      </dialog>

      <dialog className="modal" ref={PenaltyRef}>
        <div className="modal-box bg-white rounded-xl max-w-[420px] text-center">
          <div className="border-b-2 border-b-neutral-4 pb-2">
            <h1 className="font-semibold text-lg text-black text-center w-10/12 flex justify-center mx-auto ">
              Yakin ingin memberikan penalti pada reservasi ini?
            </h1>
          </div>

          <form
            action=""
            className="pt-5 flex flex-col gap-y-5 w-full"
            onSubmit={(e) => SubmitPenalty(e)}
          >
            <label htmlFor="reason" className="text-sm">
              Mohon isi alasan pemberian penalti agar pengguna memahami
              penyebabnya.
            </label>
            {/* <h3 className="text-sm"></h3> */}
            <div className="">
              <Textarea
                placeholder="Masukkan deskripsi pelanggaran pengguna"
                name="reason"
              />
              {error
                ? error.reason && (
                    <p className="text-xs text-red-2 text-left mt-1">
                      {error.reason[0]}
                    </p>
                  )
                : ""}
            </div>

            <div className="flex gap-x-2 ml-auto">
              <SecondaryButton onClick={() => PenaltyRef.current?.close()} disabled={animate}>
                Tutup
              </SecondaryButton>
              <DangerButton type="submit" isLoading={animate}>Berikan Penalti</DangerButton>
            </div>
          </form>
        </div>
      </dialog>

      <SuccessModal
        ref={successmodal}
        title={`${title} berhasil dilakukan`}
        onConfirm={() => window.location.reload()}
        message={message}
      />

      <FailureModal
        ref={failuremodal}
        onConfirm={() => failuremodal.current?.close()}
        title={`Gagal melakukan aksi ${title}`}
        message={message}
        errors={error}
      />
    </div>
  );
}
