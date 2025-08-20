"use client";
import { CalendarDays, Users } from "lucide-react";
import SecondaryCard from "@/components/card/SecondaryCard";
import AddSubtButton from "@/components/button/AddSubtButton";
import WhiteCard from "@/components/card/WhiteCard";
import { DatePicker } from "@/components/ui/DatePicker";
import { formattedtoday } from "@/data/today";
import dayjs from "dayjs";
import { getDisabledWeekends } from "@/lib/GetWeekend";
interface InputNumbAndDateProps {
  setNumb: (x: number) => void;
  setDate: (date: Date | undefined) => void;
  max?: number;
  min?: number;
  number: number;
  date?: Date;
  /** tambahkan prop untuk daftar tanggal libur */
  holidays?: string[]; // format 'YYYY-MM-DD'
}

const maxday = new Date(
  dayjs(formattedtoday).add(4, "day").format("YYYY-MM-DD")
);
const minday = new Date(
  dayjs(formattedtoday).subtract(1, "day").format("YYYY-MM-DD")
);

const InputNumbAndDate = ({
  setNumb,
  max = 6,
  min = 1,
  number,
  setDate,
  date,
  holidays = [], // default kosong
}: InputNumbAndDateProps) => {
  function addNumb() {
    if (number < max) {
      setNumb(number + 1);
    }
  }

  const disabledDates = getDisabledWeekends();
  const allDisabled = Array.from(new Set([...disabledDates, ...holidays]));

  function subNumb() {
    if (number > min) {
      setNumb(number - 1);
    }
  }
  return (
    <WhiteCard className="flex flex-col gap-y-3">
      {/* Input Number person */}
      <SecondaryCard className="flex gap-x-2">
        <Users className="stroke-primary-1" size={16} strokeWidth={2.5} />
        <p className="font-semibold text-primary-1 text-xs">Jumlah Orang</p>
      </SecondaryCard>

      <div className="border-2 border-neutral-4 rounded-md flex">
        <AddSubtButton className="border-r-[1px] " onClick={subNumb}>
          -
        </AddSubtButton>
        <p className="mx-auto my-auto">{number}</p>
        <AddSubtButton className="border-l-[1px] " onClick={addNumb}>
          +
        </AddSubtButton>
      </div>

      {/* Input Date */}
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
        disabledDates={allDisabled}
        minDate={minday}
        maxDate={maxday}
        value={date}
        placeholder="Pilih tanggal reservasi"
        inputClassName="border-2 border-neutral-4 rounded-lg"
      />
      {/* <DatePicker /> */}
    </WhiteCard>
  );
};

export default InputNumbAndDate;
