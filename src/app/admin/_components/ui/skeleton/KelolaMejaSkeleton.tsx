import WhiteCard from "@/components/card/WhiteCard";
import { time } from "@/data/time";

const KelolaMejaSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full animate-pulse">
      {/* Card 1 Skeleton */}
      <WhiteCard className="h-[220px] flex gap-x-2">
        {/* Thumbnail skeleton */}
        <div className="w-[220px] h-full bg-neutral-4 rounded-lg" />
        <div className="flex-1 flex flex-col gap-2">
          {/* Title */}
          <div className="h-6 bg-neutral-4 rounded w-1/3" />
          {/* Subtitle lines */}
          <div className="h-4 bg-neutral-4 rounded w-1/4" />
          <div className="h-4 bg-neutral-4 rounded w-1/5" />
          <div className="h-4 bg-neutral-4 rounded w-1/6" />
        </div>
      </WhiteCard>

      {/* Card 2 Skeleton */}
      <WhiteCard className="flex flex-col gap-4">
        {/* DatePicker + time buttons */}
        <div className="flex gap-1 w-full">
          <div className="flex-1 h-10 bg-neutral-4 rounded" />
          {time.map((_, idx) => (
            <div key={idx} className="flex-1 h-10 bg-neutral-4 rounded" />
          ))}
        </div>

        {/* Multi-select bar */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-neutral-4 rounded" />
          <div className="h-4 bg-neutral-4 rounded w-1/4" />
          <div className="h-4 bg-neutral-4 rounded w-1/5 ml-auto" />
        </div>

        {/* Reservations list skeleton */}
        <div className="border-2 rounded-md w-full h-[340px] overflow-hidden">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-12 bg-neutral-4 rounded my-2 mx-3" />
          ))}
        </div>
      </WhiteCard>
    </div>
  );
};
export default KelolaMejaSkeleton;
