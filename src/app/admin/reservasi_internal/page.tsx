"use client";
import TimeButton from "@/components/button/TimeButton";
import AddSubtButton from "@/components/button/AddSubtButton";
import SecondaryCard from "@/components/card/SecondaryCard";
import WhiteCard from "@/components/card/WhiteCard";
import { DatePicker } from "@/components/ui/DatePicker";
import { time } from "@/data/time";
import { currentTime, formattedtoday } from "@/data/today";
import { getDisabledWeekends } from "@/lib/GetWeekend";
import clsx from "clsx"
import dayjs from "dayjs";
import {
  CalendarDays,
  Clock,
  Contact,
  Pencil,
  Users,
} from "lucide-react";
import {  useRef, useState } from "react";
import { MdOutlineTableBar } from "react-icons/md";
import LabelPrimary from "@/components/label/LabelPrimary";
import InputText from "@/components/input/InputText";
import { Textarea } from "@/components/ui/textarea";
import PrimaryButton from "@/components/button/PrimaryButton";
import TableMapAdm from "@/app/admin/_components/content/TableMap";
import TableButton from "@/components/button/TableButton";
import { mockTables } from "@/data/table";
import { mapresponseadm } from "@/components/json/admin/mapresponseadmin";
import SecondaryButton from "@/components/button/SecondaryButton";
import { toast } from "sonner";
import FileInput from "@/app/admin/_components/input/UploadFile";
import {
  useCreateReservasiInternalAdmMutation,
  useGetReservasiInternalAdmMutation,
} from "@/services/admin/ReservasiInternalAdmServices";
import { CheckConflictResponse } from "@/components/json/admin/reservasiadminresponse";
import ReservationSteps from "../_components/ui/ReservationSteps";

const minday = new Date(
  dayjs(formattedtoday).subtract(1, "day").format("YYYY-MM-DD")
);

const RESERVASIINTERNALPAGE = () => {
  const max = 6;
  const min = 1;
  const [number, setNumb] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeslot, setTimeSlot] = useState<number[]>([]);
  const [selectedtable, setSelectedTables] = useState<mapresponseadm[]>([]);
  const [animate, setAnimate] = useState(false);
  const [borrower, setBorrower] = useState<string>("");
  const [numbphone, setNumbPhone] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [CheckReservation] = useGetReservasiInternalAdmMutation();
  const [CreateReservation] = useCreateReservasiInternalAdmMutation();
  const handleFileSelected = (file: File | null) => {
    setFile(file);
  };

  const alertreservationmodal = useRef<HTMLDialogElement>(null);
  const cancelreservationmodal = useRef<HTMLDialogElement>(null);
  function addNumb() {
    if (number < max) {
      setNumb(number + 1);
    }
  }
  function subNumb() {
    if (number > min) {
      setNumb(number - 1);
    }
  }

  const formatteddate = dayjs(date).format("YYYY-MM-DD");
  const isToday = formattedtoday == formatteddate;

  const handleToggleSelect = (tableClicked: mapresponseadm) => {
    setSelectedTables((prevSelected) => {
      const isAlreadySelected = prevSelected.find(
        (t) => t.id === tableClicked.id
      );
      if (isAlreadySelected) {
        return prevSelected.filter((t) => t.id !== tableClicked.id); // Deselect
      } else {
        return [...prevSelected, tableClicked]; // Jika tidak tersedia, jangan ubah seleksi
      }
    });
  };

  const AddTime = (timeSlot: number) => {
    if (timeslot.includes(timeSlot)) {
      setTimeSlot(timeslot.filter((slot) => slot !== timeSlot));
    } else {
      setTimeSlot([...timeslot, timeSlot]);
    }
  };

  function ValidateInput() {
    if (selectedtable.length === 0) {
      toast.error("Silakan pilih meja terlebih dahulu");
      return false;
    }
    if (timeslot.length === 0) {
      toast.error("Silakan pilih waktu terlebih dahulu");
      return false;
    }
    if (!date) {
      toast.error("Silakan pilih tanggal terlebih dahulu");
      return false;
    }
    if (number < 1) {
      toast.error("Jumlah orang tidak boleh kurang dari 1");
      return false;
    }
    if (!borrower) {
      toast.error("Nama penanggung jawab tidak boleh kosong");
      return false;
    }
    // Validasi nomor Whatsapp dan hanya nomor saja
    const phoneRegex = /^[0-9]+$/;
    if (!numbphone || !phoneRegex.test(numbphone)) {
      toast.error("Nomor Whatsapp tidak valid");
      return false;
    }
    return true;
  }

  async function SubmitCheck() {
    if (!ValidateInput()) {
      return; // Jika validasi gagal, hentikan eksekusi
    }

    setAnimate(true);
    toast.loading("Cek reservasi konflik....");
    console.log(timeslot);
    const check: CheckConflictResponse = await CheckReservation({
      date: dayjs(date).format("YYYY-MM-DD"),
      time_slot_ids: timeslot,
      table_ids: selectedtable.map((table) => table.id),
    })
      .unwrap()
      .then((res) => {
        toast.dismiss();
        setAnimate(false);
        // return res.data;
        return res.data;
      })
      .catch((err) => {
        console.error("Error checking reservation:", err);
        toast.error("Gagal memeriksa konflik reservasi");
        setAnimate(false);
        return null;
      });
    console.log("Check result:", check);

    if (check == null) {
      setAnimate(false);
      return;
    }

    if (check.has_conflicts == true) {
      // Jika ada konflik, tampilkan modal konfirmasi
      alertreservationmodal.current?.showModal();
      setAnimate(false);
      return; // Jika ada konflik, jangan lanjutkan
    }
    toast.dismiss();

    await SubmitReservation();
    
  }

  async function SubmitReservation(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    toast.loading("Membuat reservasi...");

    // 1. Buat FormData
    setAnimate(true);
    const formData = new FormData();
    formData.append("date", dayjs(date).format("YYYY-MM-DD"));
    formData.append("person", String(number));

    // 2. Append array sebagai banyak field dengan nama yang sama
    selectedtable.forEach((t) => formData.append("table_ids[]", String(t.id)));
    timeslot.forEach((s) => formData.append("time_slot_ids[]", String(s)));
    // console.log("TIme slot id", formData.get)
    // 3. Field string biasa
    formData.append("contact_person_name", borrower);
    formData.append("contact_person_whatsapp", numbphone);
    formData.append("purpose", purpose);
    formData.append("reason", reason);

    // 4. File jika ada
    if (file) {
      formData.append("event_proof_file", file, file.name);
    }

    const result = await CreateReservation(formData as any).unwrap();
    toast.dismiss();

    console.log("Result:", result);
    if (result.status === "error") {
      toast.error(result.message);
    } else {
      toast.success("Reservasi berhasil dibuat");
    }
    setAnimate(false);
    cancelreservationmodal.current?.close();
  }

  function handleCancelReservation() {
    // Buka modal konfirmasi pembatalan
    alertreservationmodal.current?.close();
    cancelreservationmodal.current?.showModal();
  }

  return (
    <div className="md:pl-4 md:pt-4 md:pr-2 md:pb-0 p-3.5 flex gap-2 h-fit max-w-[4096px]">
      <WhiteCard className="lg:flex flex-col hidden gap-y-3 max-w-[925px]">
        <ReservationSteps/>

        <div className="border-t-2 border-t-neutral-4 py-1">
          <div className="h-[300px] max-w-full">
            <TableMapAdm
              data={mockTables}
              selectedtables={selectedtable}
              onToggleSelect={handleToggleSelect}
            />
          </div>
        </div>

        <div className="space-y-2 mt-2">
          <SecondaryCard className="flex gap-x-2">
            <MdOutlineTableBar
              className="stroke-primary-1 min-w-4"
              size={16}
              color="#1e3a8a"
            />
            <p className="font-semibold text-primary-1 text-xs">Daftar Meja</p>
          </SecondaryCard>

          <div className="border-2 border-neutral-4 rounded-lg p-4 flex flex-wrap gap-2">
            {/* <TableButton className="text-xs w-[84px]">
              Table 1
            </TableButton> */}
            {mockTables.map((table, key) => {
              return (
                <TableButton
                  key={key}
                  className={clsx(
                    "text-xs w-[84px]",
                    selectedtable.some((t) => t.id === table.id)
                      ? "bg-primary-1 text-white"
                      : "bg-white text-primary-1"
                  )}
                  onClick={() => handleToggleSelect(table)}
                >
                  {table.table_number}
                </TableButton>
              );
            })}
          </div>
        </div>
      </WhiteCard>

      <WhiteCard className="lg:w-[290px] w-[340px] h-[640px] overflow-y-scroll">
        {/* Input Number person */}
        <div className="w-full space-y-2 flex flex-col">
          <div className="space-y-2 border-b-2 border-neutral-4 pb-2">
            <SecondaryCard className="flex gap-x-2">
              <Users className="stroke-primary-1" size={16} strokeWidth={2.5} />
              <p className="font-semibold text-primary-1 text-xs">
                Jumlah Orang
              </p>
            </SecondaryCard>

            <div className="border-2 border-neutral-4 rounded-md flex">
              <AddSubtButton className="border-r-[1px] " onClick={subNumb}>
                -
              </AddSubtButton>
              <p className="mx-auto my-auto text-sm">{number}</p>
              <AddSubtButton className="border-l-[1px] " onClick={addNumb}>
                +
              </AddSubtButton>
            </div>
          </div>

          {/* Input Date */}
          <div className="space-y-2 border-b-2 border-neutral-4 pb-2">
            <hr className="text-neutral-4" />
            <SecondaryCard className="flex gap-x-2 items-center">
              <CalendarDays
                className="stroke-primary-1"
                size={16}
                strokeWidth={2.5}
              />
              <p className="font-semibold text-primary-1 text-xs">
                Tanggal Reservasi
              </p>
            </SecondaryCard>
            {/* <DateRangePicker setDate={setDate} /> */}
            <DatePicker
              onChange={setDate}
              className="border border-neutral-4 rounded-lg"
              minDate={minday}
              value={date}
              placeholder="Pilih tanggal reservasi"
              inputClassName="border-2 border-neutral-4 rounded-lg"
            />
          </div>

          <div className="space-y-2 border-b-2 border-neutral-4 pb-2">
            <SecondaryCard className="flex gap-x-2 items-center">
              <Clock className="stroke-primary-1" size={16} strokeWidth={2.5} />
              <p className="font-semibold text-primary-1 text-xs">
                Waktu Pemesanan
              </p>
            </SecondaryCard>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {time.map((data, key) => {
                const [start] = data.split("-"); // Pisahkan start dan end
                const [starthours, startminute] = start.split(":").map(Number);
                const starttime = starthours * 60 + startminute;
                const disable = isToday && currentTime >= starttime;
                console.log(disable);
                return (
                  <TimeButton
                    key={key}
                    onClick={() => AddTime(key + 1)}
                    isActive={timeslot.includes(key + 1)}
                    disabled={disable}
                  >
                    {data}
                  </TimeButton>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 border-b-2 border-neutral-4 pb-2">
            <SecondaryCard className="flex gap-x-2 items-center">
              <Contact
                className="stroke-primary-1"
                size={16}
                strokeWidth={2.5}
              />
              <p className="font-semibold text-primary-1 text-xs">
                Penanggung Jawab
              </p>
            </SecondaryCard>

            <div className="space-y-1">
              <LabelPrimary>Nama</LabelPrimary>
              <InputText
                placeholder="Nama Penanggung jawab"
                className="text-xs w-full"
                value={borrower}
                onChange={(e) => setBorrower(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <LabelPrimary>Nomer Whatsapp</LabelPrimary>
              <InputText
                placeholder="08xxxxx"
                className="text-xs w-full"
                value={numbphone}
                onChange={(e) => setNumbPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <SecondaryCard className="flex gap-x-2 items-center">
              <Pencil
                className="stroke-primary-1"
                size={16}
                strokeWidth={2.5}
              />
              <p className="font-semibold text-primary-1 text-xs">Keperluan</p>
            </SecondaryCard>
            <textarea
              placeholder="Tuliskan tujuan atau agenda reservasi (contoh: Rapat koordinasi proyek)"
              className="w-full border-2 text-xs border-neutral-4 rounded-lg focus:ring-2 focus:border-primary-2/50 focus:outline-none focus:ring-primary-2/50 duration-200 ease-in-out p-4 py-3 resize-none"
              rows={5}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <FileInput onFileChange={handleFileSelected} />

          <PrimaryButton
            className="w-full"
            onClick={() => SubmitCheck()}
            isLoading={animate}
          >
            Reservasi Sekarang
          </PrimaryButton>
        </div>
      </WhiteCard>
      <dialog className="modal" ref={alertreservationmodal}>
        <div className="modal-box bg-white rounded-xl max-w-[400px] text-center space-y-4 p-0 pt-6">
          <div className="pb-2">
            <h1 className="font-semibold text-lg text-black text-center w-10/12 flex justify-center mx-auto ">
              Jadwal Reservasi Bertabrakan
            </h1>
          </div>

          <p className="text-center text-sm font-normal px-6">
            Terdapat reservasi lain yang dijadwalkan pada waktu yang sama.
            Apakah Anda ingin membatalkan reservasi tersebut dan melanjutkan
            pemesanan ini?
          </p>

          <div className="flex flex-col">
            <button
              className="border-y-2 border-neutral-4 py-3 text-center cursor-pointer text-red-2 hover:bg-neutral-4/50"
              onClick={() => handleCancelReservation()}
            >
              Ya, Batalkan Reservasi yang ada
            </button>
            <button
              className="py-3 text-center text-primary-1 cursor-pointer hover:bg-neutral-4/50"
              onClick={() => alertreservationmodal.current?.close()}
            >
              Batal
            </button>
          </div>
        </div>
      </dialog>
      <dialog className="modal" ref={cancelreservationmodal}>
        <div className="modal-box bg-white rounded-xl max-w-[420px] text-center">
          <div className="border-b-2 border-b-neutral-4 pb-2">
            <h1 className="font-semibold text-lg text-black text-center w-10/12 flex justify-center mx-auto ">
              Konfirmasi Pembatalan Reservasi
            </h1>
          </div>

          <form
            action=""
            className="pt-5 flex flex-col gap-y-5 w-full"
            onSubmit={SubmitReservation}
          >
            <div className="space-y-2">
              <p className="text-sm text-left">
                Mohon isi alasan pembatalan agar pengguna memahami penyebabnya.
              </p>
              <Textarea
                placeholder="Masukkan alasan pembatalan"
                name="purpose"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
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
              <PrimaryButton type="submit" isLoading={animate} className="w-[102px]">
                Konfirmasi
              </PrimaryButton>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default RESERVASIINTERNALPAGE;
