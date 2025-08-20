import React from "react";
import clsx from "clsx";
import { 
  Footprints,
  Users,
  MoveRight,
  CalendarDays,
  Clock,
  Contact,
  Pencil
} from "lucide-react";
import { MdOutlineTableBar } from "react-icons/md";
import PrimaryCard from "@/components/card/PrimaryCard";

interface ReservationStepsProps {
  className?: string;
  title?: string;
  titleClassName?: string;
  stepsClassName?: string;
}

const ReservationSteps: React.FC<ReservationStepsProps> = ({
  className = "",
  title = "Tahapan Reservasi",
  titleClassName = "",
  stepsClassName = ""
}) => {
  return (
    <PrimaryCard className={className}>
      <div className={clsx("flex gap-2", titleClassName)}>
        <Footprints size={24} />
        <h1 className="text-sm font-semibold">{title}</h1>
      </div>

      <div
        className={clsx(
          "flex lg:flex-row flex-col gap-1.5 text-xs lg:mt-1 mt-2",
          stepsClassName
        )}
      >
        {/* Step 1: Tentukan jumlah orang */}
        <div className="flex gap-0.5">
          <Users
            className="stroke-primary-1 w-4"
            size={16}
            strokeWidth={2.5}
          />
          <p>Tentukan jumlah orang</p>
        </div>
        
        <MoveRight
          className="stroke-neutral-3/50 lg:block hidden"
          size={18}
        />
        
        {/* Step 2: Pilih tanggal */}
        <div className="flex gap-0.5">
          <CalendarDays
            className="stroke-primary-1 w-4"
            size={16}
            strokeWidth={2.5}
          />
          <p>Pilih tanggal</p>
        </div>
        
        <MoveRight
          className="stroke-neutral-3/50 lg:block hidden"
          size={18}
        />
        
        {/* Step 3: Pilih waktu */}
        <div className="flex gap-0.5">
          <Clock
            className="stroke-primary-1 w-4"
            size={16}
            strokeWidth={2.5}
          />
          <p>Pilih waktu</p>
        </div>
        
        <MoveRight
          className="stroke-neutral-3/50 lg:block hidden"
          size={18}
        />
        
        {/* Step 4: Pilih meja pada denah */}
        <div className="flex gap-0.5">
          <MdOutlineTableBar
            className="stroke-primary-1 min-w-4"
            size={16}
            color="#1e3a8a"
          />
          <p>Pilih meja pada denah</p>
        </div>

        <MoveRight
          className="stroke-neutral-3/50 lg:block hidden"
          size={18}
        />

        {/* Step 5: Masukkan info PJ */}
        <div className="flex gap-0.5">
          <Contact className="stroke-primary-1 min-w-4" size={16} />
          <p>Masukkan info PJ</p>
        </div>
        
        <MoveRight
          className="stroke-neutral-3/50 lg:block hidden"
          size={18}
        />
        
        {/* Step 6: Tulis keperluan */}
        <div className="flex gap-0.5">
          <Pencil className="stroke-primary-1 min-w-4" size={16} />
          <p>Tulis keperluan</p>
        </div>
      </div>
    </PrimaryCard>
  );
};

export default ReservationSteps;