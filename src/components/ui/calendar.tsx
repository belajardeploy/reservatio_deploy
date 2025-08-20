"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
// import { id } from "react-day-picker/locale";
import { id } from "date-fns/locale/id";
import clsx from "clsx";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={id}
      className={clsx("p-3 border-none", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-xs font-bold text-primary-1",
        nav: "flex items-center gap-1",
        nav_button: clsx(
          // buttonVariants({ variant: "ghost" }),
          "size-8 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer flex justify-center items-center"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-full w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: clsx(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-full",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-full [&:has(>.day-range-start)]:rounded-l-full first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full"
            : "[&:has([aria-selected])]:rounded-full"
        ),
        day: clsx(
          // buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100 hover:bg-primary-3/10 rounded-full"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary-1 aria-selected:text-white rounded-full",
        day_range_end:
          "day-range-end aria-selected:bg-primary-1 aria-selected:text-white rounded-full",
        day_selected:
          "bg-primary-1 text-white hover:bg-primary-1 hover:text-white focus:bg-primary-1 focus:text-white rounded-full cursor-pointer",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-neutral-4 aria-selected:text-white",
        day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={clsx("size-5", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={clsx("size-5", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
