import React from "react";
import Image from "next/image";
import Link from "next/link";
import WhiteCard from "@/components/card/WhiteCard";
import { Pencil } from "lucide-react";
import dayjs from "dayjs";

interface TableDetail {
  id?: number;
  table_number?: string | number;
  thumbnail?: string;
  total_seats?: string | number;
  type?: string;
  is_available?: boolean;
}

interface TableDetailCardProps {
  detailTable?: TableDetail | null;
  tableId: number | null;
  selectedTime?: number;
  selectedDate?: Date | undefined;
  className?: string;
  showEditButton?: boolean;
}

const HeadDetailKelolaMeja: React.FC<TableDetailCardProps> = ({
  detailTable,
  tableId,
  selectedTime = 1,
  selectedDate,
  className = "",
  showEditButton = true,
}) => {
  return (
    <WhiteCard className={`h-[220px] flex gap-x-2 ${className}`}>
      <Image
        src={detailTable?.thumbnail || "/images/meja.png"}
        alt="meja"
        width={220}
        height={100}
        className="rounded-lg object-cover w-[230px] h-[129px]"
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full">
          <h1 className="text-xl font-semibold mr-auto">
            Meja {detailTable?.table_number}
          </h1>
          {showEditButton && tableId && (
            <Link
              className="cursor-pointer"
              href={`/admin/kelola_meja/edit_meja/${tableId}?time_slot_id=${selectedTime}&date=${dayjs(
                selectedDate
              ).format("YYYY-MM-DD")}`}
            >
              <Pencil className="size-[30px] p-1.5 stroke-white bg-orange-1 rounded-lg" />
            </Link>
          )}
        </div>

        <div className="space-y-3 text-xs my-auto">
          <p>{detailTable?.total_seats}</p>
          <p>{detailTable?.type}</p>
          {detailTable?.is_available ? (
            <p className="text-green-2">Tersedia</p>
          ) : (
            <p className="text-red-2">Tidak Tersedia</p>
          )}
        </div>
      </div>
    </WhiteCard>
  );
};

export default HeadDetailKelolaMeja;