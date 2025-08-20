import { BookOpenCheck } from "lucide-react";

interface ReservationCountCardProps {
  count: number |null;
  className?: string;
}

const ReservationCountCard = ({ count, className }: ReservationCountCardProps) => {
  return (
    <div className={"flex items-center gap-x-1.5 bg-primary-3/10 p-2 rounded-lg border-2 md:border-0 border-neutral-4 " + className}>
      <div className="p-1 rounded-lg bg-primary-3/15 ">
        <BookOpenCheck size={28} className="stroke-primary-3" />
      </div>

      <div>
        <h1 className="text-primary-1 font-semibold text-2xl">
          {count}
        </h1>
        <p className="text-[11px] text-neutral-3 lg:hidden xl:block block">Total Reservasi</p>
      </div>
    </div>
  );
};

export default ReservationCountCard;
