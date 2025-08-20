import SecondaryCard from "@/components/card/SecondaryCard";
import WhiteCard from "@/components/card/WhiteCard";
import TableButton from "@/components/button/TableButton";
import { mapresponse } from "@/components/json/global/mapresponse";
import { MdOutlineTableBar } from "react-icons/md";
import clsx from "clsx";

interface tableinputprops {
  availabletable: mapresponse[];
  setSelectedTable: (val: mapresponse) => void;
  selectedtable: mapresponse;
  className?: string;
  isFetching?: boolean;
}

const TableInput = ({
  availabletable,
  setSelectedTable,
  selectedtable,
  className,
  isFetching = false,
}: tableinputprops) => {
  return (
    <WhiteCard
      className={clsx(
        "  flex-col gap-y-3 h-[205px] overflow-hidden",
        className
      )}
    >
      <SecondaryCard className="flex gap-x-2 items-center">
        <MdOutlineTableBar
          className="stroke-primary-1"
          size={16}
          color="#1e3a8a"
        />
        <p className="font-semibold text-primary-1 text-xs">
          Ketersediaan Meja
        </p>
      </SecondaryCard>

      {availabletable.length > 0 ? (
        isFetching ? (
          <div className="w-full h-[310px] flex justify-center items-center">
            <span className="loading loading-spinner loading-sm textneutral-4"></span>
          </div>
        ) : (
          <div className="overflow-y-auto flex flex-wrap gap-3">
            {availabletable.map((data, index) => {
              if (!data.is_available) return null;
              return (
                <TableButton
                  key={index}
                  isActive={data.id == selectedtable.id}
                  disabled={data.is_available}
                  className="w-[40px] h-fit"
                  onClick={() => setSelectedTable(data)}
                >
                  {data.table_number}
                </TableButton>
              );
            })}
          </div>
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-4">
          <p className="text-center">
            Tidak ada data meja yang Tersedia, silahkan pilih meja lain!
          </p>
        </div>
      )}
    </WhiteCard>
  );
};

export default TableInput;
