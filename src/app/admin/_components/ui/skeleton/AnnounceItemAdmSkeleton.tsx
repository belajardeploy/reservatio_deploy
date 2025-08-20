import React from "react";

export default function AnnouncementItemAdmSkeleton() {
  return (
    <div className="lg:flex gap-x-4 w-full animate-pulse">
      {/* date placeholder */}
      <div className="lg:pr-6 flex lg:block">
        <div className="h-4 w-[64px] bg-neutral-4 rounded mb-2 lg:mb-0" />
      </div>
      {/* content placeholder */}
      <div className="flex-1 space-y-2">
        {/* title */}
        <div className="h-4 bg-neutral-4 rounded w-1/3" />
        {/* body */}
        <div className="h-3 bg-neutral-4 rounded w-full" />
        <div className="h-3 bg-neutral-4 rounded w-5/6" />
        {/* footer buttons */}
        <div className="flex gap-2 mt-2">
          <div className="h-8 w-8 bg-neutral-4 rounded" />
          <div className="h-8 w-8 bg-neutral-4 rounded" />
        </div>
      </div>
    </div>
  );
}