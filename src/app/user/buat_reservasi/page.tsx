"use client";
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import WhiteCard from "@/components/card/WhiteCard";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  Info,
  MoveRight,
  Pointer,
  SquarePen,
  Users,
} from "lucide-react";
import Legend from "@/app/user/_components/ui/Legend";
import PrimaryCard from "@/components/card/PrimaryCard";
import PrimaryButton from "@/components/button/PrimaryButton";
import WaktuPemesanan from "@/app/user/_components/input/WaktuPemesanan";
import InputNumbAndDate from "@/app/user/_components/input/InputNumbAndDate";
import InputText from "@/components/input/InputText";
import { useSession } from "next-auth/react";
import {
  useAddReservationMutation,
  useGetDisabledDatesQuery,
  useGetMapQuery,
  useLazyGetMapQuery,
} from "@/services/user/ReservationUserServices";
import TableMap from "@/app/user/_components/input/TableMap";
import { time } from "@/data/time";
import TableInput from "@/app/user/_components/input/TableInput";
import { mapdata, mapresponse } from "@/components/json/global/mapresponse";
// import { purposedata } from "@/data/purpose"
import { purposedataindividu, purposedatakelompok } from "@/data/purpose";
import { MdOutlineTableBar } from "react-icons/md";
import SecondaryCard from "@/components/card/SecondaryCard";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Import bahasa Indonesia
import Modal from "@/components/modal/Modal";
import RuleReservation from "@/app/user/_components/content/RuleReservasi";
import { getInitialValidDate } from "@/lib/GetWeekend";
import TableButton from "@/components/button/TableButton";
import { ErrorReservation } from "@/app/user/_components/ui/ErrorReservation";
import { defaultMsg } from "@/app/user/_components/content/ContentDefaultErrorReservation";
import DropdownUser from "../_components/dropdown/DropdownUser";
dayjs.locale("id");

const RESERVATIONPAGE = () => {
  const today = new Date();
  const { data: session } = useSession();
  const router = useRouter();
  const [person, setPerson] = useState<number>(1);
  const [timeslot, setTimeSlot] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>(
    getInitialValidDate(today)
  );
  const [email_mhs, setEmail] = useState<string[]>([""]);
  const [purpose, setPurpose] = useState<string>("");
  const [selectedtable, setSelectedTable] = useState<mapresponse>(mapdata);
  const [availabletable, setAvailableTable] = useState<mapresponse[]>([]);
  const [errorvalidation, setErrorValidation] = useState<string>("");
  const [opendropdown, setOpenDropdown] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  const success = useRef<HTMLDialogElement>(null);
  const errormodal = useRef<HTMLDialogElement>(null);
  const dropdownref = useRef<HTMLDivElement>(null);
  const [isdisabled, setIsDisabled] = useState<boolean>(false);
  const { data: disabledresp } = useGetDisabledDatesQuery({});
  const [GetAvailableTables] = useLazyGetMapQuery();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  // const [holidaydates, setHolidayDates] = useState<string[]>([]);

  // const { data: map, isFetching } = useGetMapQuery(
  //   {
  //     date: dayjs(date).format("YYYY-MM-DD"),
  //     total_seats: person,
  //     time_slot_id: timeslot,
  //     table_id: 1,
  //   },
  //   {
  //     skip: timeslot == 0,
  //     refetchOnMountOrArgChange: true
  //   }
  // );

  // const availabletable: mapresponse[] = useMemo(() => {
  //   if (map?.status === "success") {
  //     return map.data;
  //   }
  //   return [];
  // }, [map]);

  const holidaydates: string[] = useMemo(() => {
    if (disabledresp?.status === "success") {
      return disabledresp.data;
    }
    return [];
  }, [disabledresp]);

  const [addReservation] = useAddReservationMutation();

  const [errorMsg, setErrorMsg] = useState<JSX.Element>(defaultMsg);
  const [errortitle, setErrorTitle] = useState<string>(
    "Kesalahan saat reservasi"
  );
  const [iconClass, setIconClass] = useState<
    "stroke-primary-1" | "stroke-red-2"
  >("stroke-primary-1");
  function showModal() {
    ref.current?.showModal();
    dropdownref.current?.blur();
  }

  function handleInputChange(index: number, content: string) {
    const loadEmail = [...email_mhs];

    loadEmail[index] = content;
    setEmail(loadEmail);
  }

  function extraInput(e: number) {
    const render = [];
    for (let index = 0; index < e; index++) {
      render.push(
        <InputText
          value={email_mhs[index]}
          className="px-2 w-full"
          key={index}
          disabled={index == 0 ? true : false}
          placeholder="example@mhs.ac.id"
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      );
    }

    return render;
  }

  async function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsDisabled(true);

    const typereservation = email_mhs.length > 1 ? "Kelompok" : "Individu";
    const body = {
      date: dayjs(date).format("YYYY-MM-DD"),
      purpose,
      email_mhs,
      time_slot_id: timeslot,
      type: typereservation,
      table_id: selectedtable.id,
    };

    try {
      const result = await addReservation(body).unwrap();
      console.log(result);
      ref.current?.close();
      if (result.status == "success") {
        const payload = encodeURIComponent(JSON.stringify(result.data));
        if (person > 1) {
          router.push(
            `/user/buat_reservasi/konfirmasi?reservations=${payload}`
          );
        } else {
          success.current?.showModal();
        }
      } else if (result.status == "error") {
        setIconClass("stroke-red-2");
        ErrorReservation(
          result.data.status,
          result.data,
          setErrorTitle,
          setErrorMsg,
          setIconClass,
          setErrorValidation
        );

        errormodal.current?.showModal();
      }
    } catch (err) {
      console.error("Gagal membuat reservasi:", err);
      // Tambahkan fallback error modal kalau perlu
    } finally {
      setIsDisabled(false);
    }
  }

  function onChange(e: any) {
    setPurpose(e);
    setOpenDropdown(false);
    dropdownref.current?.blur();
  }

  useEffect(() => {
    // console.log("Sesuatu berubah!");
    setTimeSlot(0);
    // setPurpose("");
    setAvailableTable([]);
    setSelectedTable(mapdata);

    const newemail = Array.from({ length: person }, (_, i) => {
      if (i === 0 && session?.user.email_mhs) {
        return session.user.email_mhs;
      }

      if (i < email_mhs.length) {
        return email_mhs[i];
      }

      return "";
    });
    setEmail(newemail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, person, session]);

  useEffect(() => {

    if (timeslot === 0) {
      // setAvailableTable([]);
      setSelectedTable(mapdata);
      return;
    }

   FetchAvailableMap();

  }, [timeslot]);

  async function FetchAvailableMap(){
    setIsFetching(true);
     const params = {
      date: dayjs(date).format("YYYY-MM-DD"),
      total_seats: person,
      time_slot_id: timeslot,
      table_id: 1,
    };

    const map = await GetAvailableTables(params).unwrap();
    if (map.status === "success") {
      setAvailableTable(map.data);
    }else if(map.status === "error") {
      console.log("Error fetching map:", map.message);
      setAvailableTable([]);
    }
    setIsFetching(false);
  }

  // useEffect(() => {
  //   if (map) {
  //     if (map.status == "success") {
  //       setAvailableTable(map.data);
  //     }
  //   }

  //   setSelectedTable(mapdata);
  // }, [map]);
  return (
    <div className="md:px-4 md:pt-4 md:pb-0 p-3.5 pb-[15%] flex gap-x-4 w-full justify-center lg:justify-start">
      <WhiteCard className="lg:flex flex-col hidden gap-y-3 max-w-[925px]">
        <RuleReservation />

        {/* Map meja */}
        <div className="border-y-2 border-y-neutral-4">
          <div className="overflow-x-scroll">
            <div className="w-[1500px] h-[300px]">
              <TableMap
                data={availabletable}
                setTableId={setSelectedTable}
                selectedtable={selectedtable}
              />
            </div>
          </div>
          <div className="flex gap-x-3 items-center text-xs py-3">
            <Legend typecolor="available" content="Tersedia" />
            <Legend typecolor="full" content="Tidak Tersedia" />
            <Legend
              typecolor=""
              content="Tidak dapat dipilih, jumlah orang tidak memenuhi syarat"
            />
          </div>
        </div>

        {/* Meja reservasi   */}
        <div className="flex gap-x-3">
          <div className="border-2 border-neutral-4 rounded-md w-[205px] h-[130px]">
            {selectedtable.thumbnail && selectedtable.thumbnail !== "null" ? (
              <Image
                src={selectedtable.thumbnail}
                className="h-[130px] rounded-md object-cover"
                height={140}
                width={205}
                alt="table photo"
              />
            ) : (
              <div className="w-full h-[130px] flex justify-center items-center rounded-md">
                <p className="text-neutral-4 text-[11px] text-center px-2">
                  Foto meja akan tampil di sini
                </p>
              </div>
            )}
          </div>

          <PrimaryCard className="">
            <div className="flex gap-x-2 items-center">
              <SquarePen size={18} />
              <h1 className="text-sm font-semibold">Peraturan Reservasi</h1>
            </div>

            <div className="mt-2 text-xs/5 ml-4">
              <ol className="list-decimal">
                <li>Pengguna hanya dapat meminjam meja 1 kali dalam sehari</li>
                <li>
                  Jika tidak hadir dalam 1 jam dari waktu reservasi, maka
                  reservasi akan hangus dan anda terkena penalti
                </li>
                <li>
                  Dilarang membawa makanan berbau menyengat yang dapat menganggu
                  pengunjung lainnya
                </li>
                <li>
                  Pengguna yang tidak menaati aturan akan dikenakan penalti
                  selama 1 minggu
                </li>
              </ol>
            </div>
          </PrimaryCard>
        </div>
      </WhiteCard>

      <div className="flex flex-col gap-y-2 lg:w-[290px] w-[340px] text-xs">
        <RuleReservation className="lg:hidden" />

        <InputNumbAndDate
          setNumb={setPerson}
          setDate={setDate}
          number={person}
          holidays={holidaydates}
          date={date}
        />

        <WaktuPemesanan setTimeSlot={setTimeSlot} id={timeslot} date={date} />

        <WhiteCard className="lg:hidden">
          <SecondaryCard className="flex gap-x-2">
            <Pointer className="stroke-primary-1" size={16} strokeWidth={2.5} />

            <p className="font-semibold text-primary-1 text-xs">
              Ketersediaan meja
            </p>
          </SecondaryCard>

          {/* MOBILE */}
          <div className="overflow-x-scroll mt-2">
            <div className="w-[1500px]">
              <TableMap
                data={availabletable}
                setTableId={setSelectedTable}
                selectedtable={selectedtable}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-3 text-xs py-3">
            <Legend typecolor="available" content="Tersedia" />
            <Legend typecolor="full" content="Tidak Tersedia" />
            <Legend
              typecolor=""
              content="Tidak dapat dipilih, jumlah pengguna tidak memenuhi syarat"
            />
          </div>
          <div className="flex gap-4">
            <div className="border-2 border-neutral-4 rounded-md w-[175px] h-[128px]">
              {selectedtable.thumbnail && selectedtable.thumbnail !== "null" ? (
                <Image
                  src={selectedtable.thumbnail}
                  className="h-[130px] rounded-md object-cover"
                  height={140}
                  width={205}
                  alt="table photo"
                />
              ) : (
                <div className="w-full h-[130px] flex justify-center items-center rounded-md">
                  <p className="text-neutral-4 text-[11px] text-center px-2">
                    Foto meja akan tampil di sini
                  </p>
                </div>
              )}
            </div>
            {selectedtable.id > 0 && (
              <TableButton
                disabled={true}
                className="h-fit mx-auto"
                isActive={true}
              >
                Meja-{selectedtable.table_number}
              </TableButton>
            )}
          </div>
        </WhiteCard>

        <TableInput
          selectedtable={selectedtable}
          setSelectedTable={setSelectedTable}
          availabletable={availabletable}
          className="hidden lg:flex"
          isFetching={isFetching}
        />

        <PrimaryButton
          onClick={showModal}
          disabled={selectedtable.id > 0 ? false : true}
        >
          Reservasi Sekarang
        </PrimaryButton>
      </div>

      <dialog className="modal" ref={ref}>
        <div className="modal-box bg-white rounded-xl w-11/12 overflow-y-visible flex flex-col">
          <div className="p-3 max-h-[660px]">
            <div className="border-b-2 border-b-neutral-4 pb-2">
              <h1 className="font-bold text-lg text-black text-center ">
                Detail pemesanan
              </h1>
            </div>

            <div className="py-6 flex flex-col gap-y-2.5">
              <div className="w-full">
                <div className="w-full px-1.5 py-2.5 flex gap-x-2 rounded-lg">
                  <CalendarDays size={18} className="stroke-neutral-3/50" />
                  <p className="text-sm">
                    {dayjs(date).format("dddd, DD MMMM YYYY")}
                  </p>
                </div>

                <div className="flex gap-x-3 md:flex-row flex-col md:items-center items-start">
                  <div className="flex gap-x-2 items-center w-[280px] p-1">
                    <div className="flex gap-x-2 rounded-lg md:w-7/12 w-fit items-center">
                      <Clock size={18} className="stroke-neutral-3/50" />
                      <p className="text-sm">
                        {timeslot > 0 && time[timeslot - 1].split("-")[0]} WIB
                      </p>
                    </div>

                    <MoveRight
                      className="stroke-neutral-3/50 hidden md:block"
                      size={35}
                    />
                    <MoveRight
                      className="stroke-neutral-3/50 md:hidden"
                      size={20}
                    />
                    <div className="rounded-lg md:w-3/4 w-fit">
                      <p className="text-sm">
                        {timeslot > 0 && time[timeslot - 1].split("-")[1]} WIB
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-x-2 mt-2 p-1">
                    <div className="flex gap-x-1 ml-auto">
                      <Users
                        className="stroke-neutral-3/50"
                        size={18}
                        strokeWidth={2.5}
                      />
                      <p className="text-sm">{person}</p>
                    </div>

                    <div className="flex gap-x-1">
                      <MdOutlineTableBar
                        className="stroke-neutral-3/50"
                        size={18}
                        color="#6b6e76"
                      />
                      <p className="text-sm">{selectedtable?.table_number}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-y-1 text-sm">
                <p className="text-primary-3 text-xs">Email</p>
                {extraInput(person)}
              </div>
              <div className="w-full flex flex-col gap-y-1 text-sm">
                <p className="text-primary-3 text-xs">Keperluan</p>

                <div className="relative w-full" ref={dropdownref}>
                  {/* Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setOpenDropdown((prev) => !prev)}
                    className="w-full border-2 border-neutral-4 rounded-lg flex items-center focus:border-primary-3 text-xs shadow-sm focus:shadow-primary-4 p-2.5"
                  >
                    <p className="text-sm mr-auto">
                      {purpose !== "" ? purpose : "Pilih keperluan"}
                    </p>
                    <ChevronDown
                      size={28}
                      strokeWidth={1.5}
                      className={clsx(
                        "transition-transform duration-200",
                        opendropdown && "rotate-180"
                      )}
                    />
                  </button>

                  {/* DropdownInput Content */}
                  {opendropdown && (
                    <DropdownUser
                      open={opendropdown}
                      options={
                        person > 1 ? purposedatakelompok : purposedataindividu
                      }
                      value={purpose}
                      onChange={onChange}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-x-2.5">
              <button
                disabled={isdisabled}
                className="border-neutral-4 hover:border-primary-2 cursor-pointer duration-300 ease-in-out border-2 rounded-lg text-primary-1 md:p-2 p-1 ml-auto"
                onClick={() => ref.current?.close()}
              >
                Batal
              </button>
              <PrimaryButton
                onClick={onSubmit}
                isLoading={isdisabled}
                className="w-[93px]"
              >
                Reservasi
              </PrimaryButton>
            </div>
          </div>
        </div>
      </dialog>

      <Modal
        ref={success}
        title="Reservasi Berhasil"
        message="Selamat! Detail tiket reservasi dapat dilihat di bagian “Reservasi & Riwayat”."
        onConfirm={() => router.push("/user/reservasi_&_riwayat")}
      />

      <Modal
        ref={errormodal}
        title={errortitle}
        message={errorMsg}
        errors={errorvalidation}
        onConfirm={() => errormodal.current?.close()}
        icon={<Info size={36} className={iconClass} />}
      />
    </div>
  );
};

export default RESERVATIONPAGE;
