// Komponen Skeleton untuk baris data
const ReservationTodayRowSkeleton = () => (
  <div className="border-b-2 py-1.5 border-b-neutral-4 m-0">
    <div className="px-4">
      <div className="grid grid-cols-5 gap-2 text-[10px] font-normal">
        <div className="col-span-1 flex items-center">
          <div className="h-3 bg-neutral-200 rounded w-16 animate-pulse"></div>
        </div>
        <div className="col-span-1 flex items-center">
          <div className="h-3 bg-neutral-200 rounded w-12 animate-pulse"></div>
        </div>
        <div className="col-span-1 flex items-center">
          <div className="h-3 bg-neutral-200 rounded w-20 animate-pulse"></div>
        </div>
        <div className="col-span-1 flex items-center">
          <div className="h-3 bg-neutral-200 rounded w-6 animate-pulse"></div>
        </div>
        <div className="col-span-1 flex items-center">
          <div className="h-5 bg-neutral-200 rounded w-[117px] animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

export default ReservationTodayRowSkeleton;