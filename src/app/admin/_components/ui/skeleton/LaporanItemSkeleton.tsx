import React from "react";

export default function LaporanItemSkeleton() {
  return (
    <div className="duration-200 ease-in-out border-b-[1px] border-neutral-4 cursor-pointer animate-pulse">
      <div className="px-4 py-2 flex items-center gap-3">
        <div className="h-5 w-5 rounded-sm bg-neutral-4" />
        <div className="flex items-center max-w-full w-full gap-4">
          <div className="h-4 w-[200px] bg-neutral-4 rounded" />
          <div className="flex items-center gap-2 flex-1">
            <div className="h-4 w-16 bg-neutral-4 rounded" />
            <div className="h-4 flex-1 bg-neutral-4 rounded" />
          </div>
        </div>
        <div className="h-4 w-12 bg-neutral-4 rounded" />
      </div>
    </div>
  );
}