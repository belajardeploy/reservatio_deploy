import { TriangleAlert } from "lucide-react";

interface PenaltyCardProps {
  count: number | null;
  limit: number;
  className?: string;
}

const PenaltyCard = ({ count, limit, className }: PenaltyCardProps) => {
  return (
    <div className={`flex items-center gap-x-1.5 bg-yellow-2/10 p-2 border-2 md:border-0 border-neutral-4 rounded-lg ${className}`}>
      <div className="p-1 rounded-lg bg-yellow-2/15">
        <TriangleAlert size={28} className="stroke-yellow-1/50" />
      </div>

      <div>
        <div className="flex gap-x-1 items-center">
          <h1 className="text-yellow-2 font-semibold text-2xl">
            {count}
          </h1>
          <h2 className="text-sm text-neutral-3 lg:hidden xl:block block">/{limit}</h2>
        </div>
        <p className="text-[11px] text-neutral-3 lg:hidden xl:block block">Total Penalti</p>
      </div>
    </div>
  );
};

export default PenaltyCard;
