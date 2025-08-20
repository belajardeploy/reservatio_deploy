import React from "react";

interface RiwayatPageSkeletonProps {
  rows?: number;
}

export default function TableResevationSkeleton({
  rows = 5,
}: RiwayatPageSkeletonProps) {
  return (
    <div
      className="w-full hidden lg:grid lg:grid-cols-7 gap-3 text-left rounded-xl p-6 animate-pulse"
    >
      {/* header skeleton */}
      {Array.from({ length: 7 }).map((_, idx) => (
        <div
          key={`h-${idx}`}
          className="h-8 bg-neutral-4 rounded mb-2 lg:mb-0"
        />
      ))}

      {/* body skeleton rows */}
      {Array.from({ length: rows }).map((_, ridx) => (
        <React.Fragment key={`r-${ridx}`}>
          {Array.from({ length: 7 }).map((_, cidx) => (
            <div
              key={`r-${ridx}-c-${cidx}`}
              className="h-6 bg-neutral-4 rounded mb-2 lg:mb-0"
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}