// components/PaginationControls.tsx

"use client";

import clsx from "clsx"
import { FC } from "react";

interface PaginationControlsProps {
  page: number;
  limitPage: number;
  onNext: () => void;
  onPrevious: () => void;
  className?: string
}

const PaginationControls: FC<PaginationControlsProps> = ({ page, limitPage, onNext, onPrevious, className }) => {
  return (
    <div className={clsx("flex gap-x-4 items-center mt-2", className)}>
      <div className="flex gap-x-2 items-center justify-center">
        <p className="md:text-sm text-xs bg-primary-3/8 w-6 h-6 rounded-[4px] flex items-center justify-center">{page}</p>
        <p className="md:text-sm text-xs">dari</p>
        <p className="md:text-sm text-xs">{limitPage}</p>
      </div>
      <button onClick={onPrevious} className="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button onClick={onNext} className="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default PaginationControls;
