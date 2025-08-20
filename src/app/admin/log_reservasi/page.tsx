"use client";
import WhiteCard from "@/components/card/WhiteCard";
import InputSearch from "@/app/admin/_components/input/SearchInput";
import PrimaryButton from "@/components/button/PrimaryButton";
import { CalendarDays, CalendarX, Funnel, GraduationCap, Tag } from "lucide-react";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { chartConfig } from "@/lib/config/ChartConfig";
import { mockReservasiData } from "@/data/mockdata/totalreservasi";
import SectionNav from "@/components/ui/SectionNav";
import { useEffect, useRef, useState } from "react";
import DangerButton from "@/components/button/DangerButton";
import { DateRange } from "react-day-picker";
import { Textarea } from "@/components/ui/textarea";
import SecondaryButton from "@/components/button/SecondaryButton";
import { toast } from "sonner";
import { MdOutlineTableBar } from "react-icons/md";
import DropdownAdm from "@/app/admin/_components/dropdown/DropdownAdm";
import { statusreservations } from "@/data/statusreservations";
import ButtonAdm from "@/app/admin/_components/button/ButtonAdm";
import {
  mockTablesBerbagi,
  mockTablesIndividu,
  mockTablesKelompok,
} from "@/data/table";
import { major } from "@/data/admin/major";
import clsx from "clsx";
import {
  useDeleteLogReservasiMutation,
  useDisableDateReservasiMutation,
  useGetLogReservasiQuery,
} from "@/services/admin/LogReservasiAdmServices";
import useDebounce from "@/lib/Debounced";
import { logreservasiresponse } from "@/components/json/admin/logreservasiresponse";
import { TableHeaderContent } from "@/app/admin/_components/ui/TableHeaderContent";
import TableSkeletonAdm from "@/app/admin/_components/ui/skeleton/TableSkeletonAdm";
import ContentLogTable from "@/app/admin/_components/ui/ContentLogTable";
import ReservationDistributionChart from "@/app/admin/_components/chart/ReservationDistributionChart";
import { filterparams } from "./type/filterparams";
import { interval } from "@/data/admin/interval";
import { format } from "date-fns";
import InputCheckbox from "@/components/input/InputCheckbox";
import NeutralButton from "@/components/button/NeutralButton";

const sections = [
  { label: "Semua", value: "" },
  { label: "Pengguna", value: "pengguna" },
  { label: "Internal", value: "internal" },
];
const LOGRESERVASIPAGE = () => {
  const [search, setSearch] = useState("");
  // const deb
  const debouncedSearch = useDebounce(search, 1000);
  const [reservationtype, setReservationType] = useState<string>("");
  const filtermodal = useRef<HTMLDialogElement>(null);
  const cancelreservationmodal = useRef<HTMLDialogElement>(null);
  const disableddatemodal = useRef<HTMLDialogElement>(null);
  const [date, setDate] = useState<DateRange | undefined>();
  const [status, setStatus] = useState<string>("");
  const [selectedinterval, setInterval] = useState<string>("");
  const [idmeja, setMejaId] = useState<number>(0);
  const [selectedmajor, setMajor] = useState<string>("");
  const [term, setTerm] = useState<boolean>(false);
  const [logreservasidata, setLogReservasiData] =
    useState<logreservasiresponse | null>(null);

  const [animate, setAnimate] = useState<boolean>(false);
  const [activefilters, setActiveFilters] = useState<filterparams>({});

  const [DeleteLogReservasi] = useDeleteLogReservasiMutation();
  const [DisabledDate] = useDisableDateReservasiMutation();

  const {
    data: logreservasiresp,
    isLoading,
    isFetching,
    refetch,
  } = useGetLogReservasiQuery(activefilters);

  useEffect(() => {
    if (!logreservasiresp) return;
    console.log(logreservasiresp);
    if (logreservasiresp.status == "error") {
      toast.error("Kesalahan saat mengambil data reservasi");
      return;
    }

    if (logreservasiresp.status == "success") {
      toast.success("Data reservasi berhasil diambil");
      setLogReservasiData(logreservasiresp.data);
      filtermodal.current?.close();
      setAnimate(false);
    }
  }, [logreservasiresp]);

  async function SubmitCancel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAnimate(true);
    const formData = new FormData(e.currentTarget);
    const reason = formData.get("reason") as string;

    //validate date
    if (!date || !date.from || !date.to) {
      toast.error("Pilih rentang tanggal yang valid");
      setAnimate(false);
      return;
    }

    formData.append("start_date", format(date?.from, "yyyy-MM-dd"));
    formData.append("end_date", format(date?.to, "yyyy-MM-dd"));

    if (reason.trim() === "") {
      toast.error("Alasan pembatalan tidak boleh kosong");
      setAnimate(false);
      return;
    }

    const response = await DeleteLogReservasi(formData).unwrap();
    if (!response) return;
    console.log(response);
    if (response.status === "error") {
      toast.error("Gagal membatalkan reservasi");
      setAnimate(false);
      return;
    }
    refetch();
    setActiveFilters({});
    setDate(undefined);
    setMejaId(0);
    setMajor("");
    setStatus("");
    toast.success("Reservasi berhasil dibatalkan");
    cancelreservationmodal.current?.close();
    setAnimate(false);
  }

  async function SubmitDisabledDate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAnimate(true);
    const formData = new FormData(e.currentTarget);
    //validate date
    if (!date || !date.from || !date.to) {
      toast.error("Pilih rentang tanggal yang valid");
      setAnimate(false);
      return;
    }
    formData.append("start_date", format(date?.from, "yyyy-MM-dd"));
    formData.append("end_date", format(date?.to, "yyyy-MM-dd"));
    const response = await DisabledDate(formData).unwrap();
    if (!response) return;
    toast.dismiss();
    console.log(response);
    if (response.status === "error") {
      toast.error("Gagal menonaktifkan tanggal");
      setAnimate(false);
      return;
    }

    if (response.status === "success") {
      toast.success("Tanggal berhasil dinonaktifkan");
      disableddatemodal.current?.close();
      setDate(undefined);
      setAnimate(false);
    }
  }

  function RemoveFilter() {
    setStatus("");
    setMejaId(0);
    setMajor("");
    setDate(undefined);
    setAnimate(false);
    setActiveFilters({});
    filtermodal.current?.close();
  }

  function OnChange(e: string) {
    setSearch(e);
    setActiveFilters((prev) => ({
      ...prev,
      search: debouncedSearch,
    }));
  }

  function SetType(e: string) {
    setReservationType(e);
    setActiveFilters((prev) => ({
      ...prev,
      reservation_type: e,
    }));
  }

  function SetInterval(e: string) {
    setInterval(e);
    setActiveFilters((prev) => ({
      ...prev,
      date: e,
    }));
  }

  async function SubmitFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAnimate(true);

    const filterParams: filterparams = {
      status: status,
      table_id: idmeja,
      major: selectedmajor,
      date: selectedinterval,
    };
    setActiveFilters((prev) => ({ ...prev, ...filterParams }));
  }

  return (
    <div className="md:pl-4 md:pt-4 md:pr-2 md:pb-0 p-3.5 flex flex-col gap-2 h-fit">
      <div className="w-full flex items-center gap-2">
        <InputSearch
          className="bg-white text-sm"
          placeholder="Cari reservasi"
          value={search} // ← tambahkan ini
          onChange={(e) => OnChange(e.target.value)} // ← dan ini
        />

        {/* <DateRangePicker className="ml-auto" /> */}
        <div className="ml-auto flex items-center gap-2">
          <NeutralButton
          icon={<CalendarX size={16} />}
          onClick={() => disableddatemodal.current?.showModal()}
          >
            Nonaktifkan tanggal
          </NeutralButton>
          <DropdownAdm
            options={interval}
            value={selectedinterval}
            onChange={(e) => SetInterval(e)}
            icon={<CalendarDays size={16} />}
            placeholder="Interval"
          />
        </div>

        <PrimaryButton
          className="flex gap-x-1.5 lg:text-base text-sm font-medium items-center px-3.5"
          onClick={() => filtermodal.current?.showModal()}
        >
          <Funnel
            size={18}
            className="stroke-white lg:block hidden size-[18px]"
          />
          <Funnel size={12} className="stroke-white lg:hidden" />
          Filter
        </PrimaryButton>
      </div>

      <ReservationDistributionChart
        data={logreservasidata?.graph || mockReservasiData}
        chartConfig={chartConfig}
        isLoading={isFetching}
      />

      <WhiteCard className="w-full flex flex-col gap-2">
        <div className="w-full flex items-center gap-2">
          <SectionNav
            current={reservationtype}
            onChange={(e) => SetType(e)}
            items={sections}
          />
          <DangerButton
            className="text-xs p-3 ml-auto"
            onClick={() => cancelreservationmodal.current?.showModal()}
          >
            Batalkan Semua Reservasi
          </DangerButton>
        </div>

        <div className="space-y-0">
          <TableHeaderContent />
          {isFetching || isLoading ? (
            <TableSkeletonAdm />
          ) : (
            <ContentLogTable data={logreservasidata} />
          )}
        </div>
      </WhiteCard>

      <dialog ref={filtermodal} className="modal">
        <div className="modal-box bg-white max-w-fit rounded-xl space-y-4">
          <h1 className="text-sm font-medium">Filter</h1>
          <form action="flex flex-col gap-4" onSubmit={(e) => SubmitFilter(e)}>
            <div className="flex gap-8">
              <div className="space-y-4">
                <div className="flex gap-2 text-xs">
                  <Tag size={16} />
                  <h2 className="">Status</h2>
                </div>

                <DropdownAdm
                  options={statusreservations}
                  value={status}
                  placeholder="Pilih Status"
                  buttonClassName=" cursor-pointer min-w-[150px] border-2 border-neutral-4 rounded-lg flex items-center gap-2 focus:border-primary-3 text-xs focus:shadow-primary-4 p-2 h-full"
                  onChange={(value) => setStatus(value)}
                />
              </div>
              <hr className="border-2 border-neutral-4" />
              <div className="space-y-4">
                <div className="flex gap-2 text-xs">
                  <MdOutlineTableBar
                    className="stroke-primary-1 min-w-4"
                    size={16}
                    color="#000000"
                  />
                  <h2 className="">Meja</h2>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {mockTablesIndividu.map((table) => (
                    <ButtonAdm
                      key={table.id}
                      className={clsx(
                        "w-[65px] h-[65px] text-xs flex items-center justify-center border-neutral-4 rounded-lg cursor-pointer",
                        {
                          "bg-primary-1 text-white": table.id === idmeja,
                        }
                      )}
                      onClick={() => setMejaId(table.id)}
                    >
                      {table.table_number}
                    </ButtonAdm>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {mockTablesKelompok.map((table) => (
                    <ButtonAdm
                      key={table.id}
                      className={clsx(
                        "w-[65px] h-[65px] text-xs flex items-center justify-center border-neutral-4 rounded-lg cursor-pointer hover:bg-neutral-4/25",
                        {
                          "bg-primary-1 text-white": table.id === idmeja,
                        }
                      )}
                      onClick={() => setMejaId(table.id)}
                    >
                      {table.table_number}
                    </ButtonAdm>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {mockTablesBerbagi.map((table) => (
                    <ButtonAdm
                      key={table.id}
                      className={clsx(
                        "w-[65px] h-[65px] text-xs flex items-center justify-center border-neutral-4 rounded-lg cursor-pointer hover:bg-neutral-4/25",
                        {
                          "bg-primary-1 text-white": table.id === idmeja,
                        }
                      )}
                      onClick={() => setMejaId(table.id)}
                    >
                      {table.table_number}
                    </ButtonAdm>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2 text-xs">
                  <GraduationCap size={16} />
                  <h2 className="">Jurusan</h2>
                </div>
                <div className="space-y-2 w-full">
                  {major.map((jurusan, index) => (
                    <ButtonAdm
                      key={index}
                      className={clsx(
                        "w-full py-2 text-xs rounded-lg hover:bg-neutral-4/25",
                        {
                          "bg-primary-1 text-white": selectedmajor === jurusan,
                        }
                      )}
                      onClick={() => setMajor(jurusan)}
                    >
                      {jurusan}
                    </ButtonAdm>
                  ))}
                </div>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-x-2">
              <SecondaryButton
                onClick={() => RemoveFilter()}
                disabled={animate}
                className="ml-auto"
              >
                Hapus Filter
              </SecondaryButton>

              <PrimaryButton isLoading={animate} className="w-[93px]">Terapkan</PrimaryButton>
            </div>
          </form>
        </div>
      </dialog>

      <dialog className="modal" ref={cancelreservationmodal}>
        <div className="modal-box bg-white rounded-xl max-w-[420px] text-center overflow-visible">
          <div className="border-b-2 border-b-neutral-4 pb-2">
            <h1 className="font-semibold text-lg text-black text-center w-10/12 flex justify-center mx-auto ">
              Yakin ingin membatalkan semua reservasi?
            </h1>
          </div>

          <form
            action=""
            className="pt-5 flex flex-col gap-y-5 w-full"
            onSubmit={(e) => SubmitCancel(e)}
          >
            <div className="space-y-2">
              <p className="text-sm text-left">
                Pilih rentang tanggal reservasi yang ingin dibatalkan
              </p>

              <DateRangePicker
                className="w-full z-50"
                value={date}
                onChange={setDate}
                placeholder="Pilih rentang tanggal"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-left">
                Mohon isi alasan pembatalan agar pengguna memahami penyebabnya.
              </p>
              <Textarea
                placeholder="Masukkan alasan pembatalan"
                name="reason"
                className={
                  "w-full h-[120px] bg-white border border-neutral-4 rounded-md p-2 text-xs"
                }
              />
            </div>

            <div className="flex gap-x-2 ml-auto">
              <SecondaryButton
                onClick={() => cancelreservationmodal.current?.close()}
                disabled={animate}
              >
                Tutup
              </SecondaryButton>
              <DangerButton type="submit" isLoading={animate} className="w-[170px]">
                Batalkan Reservasi
              </DangerButton>
            </div>
          </form>
        </div>
      </dialog>

      <dialog className="modal" ref={disableddatemodal}>
        <div className="modal-box bg-white rounded-xl max-w-[420px] text-center overflow-visible">
          <div className="border-b-2 border-b-neutral-4 pb-2">
            <h1 className="font-semibold text-lg text-black text-center w-10/12 flex justify-center mx-auto ">
              Yakin ingin menonaktifkan tanggal?
            </h1>
          </div>

          <form
            action=""
            className="pt-5 flex flex-col gap-y-5 w-full"
            onSubmit={(e) => SubmitDisabledDate(e)}
          >
            <div className="space-y-2">
              <p className="text-sm text-left">
                Pilih rentang tanggal reservasi yang ingin dinonaktifkan
              </p>

              <DateRangePicker
                className="w-full z-50"
                value={date}
                onChange={setDate}
                minDate={new Date()}
                placeholder="Pilih rentang tanggal"
              />
            </div>

            <div className="flex gap-x-2 items-center">
              <InputCheckbox
                isChecked={term}
                onClick={() => setTerm(!term)}
                checkIconSize={12}
                checkIconClassName="stroke-white"
                label="Saya mengetahui bahwa aksi ini tidak dapat dibatalkan"
              />
            </div>
            <div className="flex gap-x-2 ml-auto">
              <SecondaryButton
                onClick={() => disableddatemodal.current?.close()}
                disabled={animate}
              >
                Tutup
              </SecondaryButton>
              <DangerButton
                type="submit"
                isLoading={animate}
                disabled={!term || !date?.from || !date?.to}
              >
                Nonaktifkan
              </DangerButton>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default LOGRESERVASIPAGE;
