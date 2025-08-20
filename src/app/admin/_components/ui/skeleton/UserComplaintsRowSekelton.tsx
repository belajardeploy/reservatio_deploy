import clsx from "clsx";

const ComplaintRowSkeleton = ({ isLast = false }: { isLast?: boolean }) => (
  <div
    className={clsx(
      "p-1 text-xs flex flex-col gap-y-2 row-span-1 animate-pulse",
      !isLast && "border-b-2 border-b-neutral-3/25"
    )}
  >
    {/* Category */}
    <div className="flex items-center">
      <div className="h-3.5 bg-neutral-200 rounded w-28"></div>
    </div>
    
    {/* Description */}
    <div className="mt-2 space-y-1.5">
      <div className="h-2 bg-neutral-200 rounded w-full"></div>
      <div className="h-2 bg-neutral-200 rounded w-5/6"></div>
      <div className="h-2 bg-neutral-200 rounded w-4/6"></div>
    </div>
    
    {/* Footer */}
    <div className="flex gap-x-4 mt-auto">
      <div className="h-2.5 bg-neutral-200 rounded w-24"></div>
      <div className="h-2.5 bg-neutral-200 rounded w-16 ml-auto"></div>
    </div>
  </div>
);

export default ComplaintRowSkeleton;