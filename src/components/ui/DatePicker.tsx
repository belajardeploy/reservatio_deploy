"use client";

import * as React from "react";
import { format, isAfter, isBefore, isEqual, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date|undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  disabledDates?: string[]; // Array of dates to disable in format "YYYY-MM-DD"
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  calendarClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  disabledDates = [],
  minDate,
  maxDate,
  className,
  calendarClassName,
  inputClassName,
  buttonClassName,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [open, setOpen] = React.useState(false);

  // Parse disabled dates from strings to Date objects
  const parsedDisabledDates = React.useMemo(() => {
    return disabledDates.map((dateStr) =>
      parse(dateStr, "yyyy-MM-dd", new Date())
    );
  }, [disabledDates]);

  // Function to check if a date is disabled
  const isDateDisabled = React.useCallback(
    (date: Date) => {
      // Check if date is in disabled dates
      const isDisabled = parsedDisabledDates.some((disabledDate) =>
        isEqual(disabledDate, date)
      );

      // Check if date is outside min/max range
      const isBeforeMin = minDate ? isBefore(date, minDate) : false;
      const isAfterMax = maxDate ? isAfter(date, maxDate) : false;

      return isDisabled || isBeforeMin || isAfterMax;
    },
    [parsedDisabledDates, minDate, maxDate]
  );

  // Update internal state when value prop changes
  React.useEffect(() => {
    setDate(value);
  }, [value]);

  // Handle date selection
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
    setOpen(false);
  };

  // Handle manual input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (!inputValue) {
      setDate(undefined);
      onChange?.(undefined);
      return;
    }

    try {
      // Try to parse the input value as a date
      const parsedDate = parse(inputValue, "yyyy-MM-dd", new Date());

      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
        onChange?.(parsedDate);
      }
    } catch (error) {
      console.error("Invalid date format:", error);
      // Invalid date format, do nothing
    }
  };

  return (
    <div className={clsx("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={clsx(
              "w-full justify-start text-left font-normal cursor-pointer",
              !date && "text-muted-foreground",
              buttonClassName
            )}
            disabled={disabled}
          >
            <p className="text-xs mr-auto">
              {date ? format(date, "dd/MM/yyyy") : placeholder}
            </p>
            <CalendarIcon size={20} strokeWidth={2} className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={isDateDisabled}
            initialFocus
            className={clsx("border-2 border-neutral-4 rounded-md p-0", calendarClassName)}
          />
        </PopoverContent>
      </Popover>
      <Input
        type="date"
        value={date ? format(date, "yyyy-MM-dd") : ""}
        onChange={handleInputChange}
        className={clsx("sr-only", inputClassName)}
        disabled={disabled}
      />
    </div>
  );
}
