"use client"

import * as React from "react"
import { format, isAfter, isBefore, isEqual, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import clsx from "clsx"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { type DateRange  } from "react-day-picker" 
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs"
import "dayjs/locale/id"; // Import bahasa Indonesia
dayjs.locale("id");
dayjs.extend(customParseFormat);
// export interface DateRange {
//   from?: Date
//   to?: Date
// }

export interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  disabledDates?: string[] // Array of dates to disable in format "YYYY-MM-DD"
  minDate?: Date
  maxDate?: Date
  className?: string
  calendarClassName?: string
  inputClassName?: string
  buttonClassName?: string
  numberOfMonths?: number
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Select date range",
  disabled = false,
  disabledDates = [],
  minDate,
  maxDate,
  className,
  calendarClassName,
  inputClassName,
  buttonClassName,
  numberOfMonths = 2,
}: DateRangePickerProps) {
  const [range, setRange] = React.useState<DateRange | undefined>(value)
  const [open, setOpen] = React.useState(false)

  // Parse disabled dates from strings to Date objects
  const parsedDisabledDates = React.useMemo(() => {
    return disabledDates.map((dateStr) => parse(dateStr, "yyyy-MM-dd", new Date()))
  }, [disabledDates])

  // Function to check if a date is disabled
  const isDateDisabled = React.useCallback(
    (date: Date) => {
      // Check if date is in disabled dates
      const isDisabled = parsedDisabledDates.some((disabledDate) => isEqual(disabledDate, date))

      // Check if date is outside min/max range
      const isBeforeMin = minDate ? isBefore(date, minDate) : false
      const isAfterMax = maxDate ? isAfter(date, maxDate) : false

      return isDisabled || isBeforeMin || isAfterMax
    },
    [parsedDisabledDates, minDate, maxDate],
  )

  // Update internal state when value prop changes
  React.useEffect(() => {
    setRange(value)
  }, [value])

  // Handle date range selection
  const handleSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange)
    onChange?.(selectedRange)

    // Close popover when both dates are selected
    if (selectedRange?.from && selectedRange?.to) {
      setOpen(false)
    }
  }

  // Handle manual input for start date
  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (!inputValue) {
      const newRange = { ...range, from: undefined }
      setRange(newRange)
      onChange?.(newRange)
      return
    }

    try {
      const parsedDate = parse(inputValue, "yyyy-MM-dd", new Date())

      if (!isNaN(parsedDate.getTime())) {
        const newRange = { ...range, from: parsedDate }
        setRange(newRange)
        onChange?.(newRange)
      }
    } catch (error) {
      console.error("Invalid date format:", error)
      // Invalid date format, do nothing
    }
  }

  // Handle manual input for end date
  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (!inputValue) {
      const newRange = { ...range, to: undefined } as DateRange
      setRange(newRange)
      onChange?.(newRange)
      return
    }

    try {
      const parsedDate = parse(inputValue, "yyyy-MM-dd", new Date())

      if (!isNaN(parsedDate.getTime())) {
        const newRange = { ...range, to: parsedDate } as DateRange
        setRange(newRange)
        onChange?.(newRange)
      }
    } catch (error) {
      console.error("Invalid date format:", error)
      // Invalid date format, do nothing
    }
  }

  // Format display text for the button
  const getDisplayText = () => {
    if (!range?.from) {
      return placeholder
    }
    
    if (range.from && !range.to) {
      return dayjs(format(range.from, "dd/MM/yyyy"), "DD/MM/YYYY").format("MMMM DD, YYYY")
    }

    if (range.from && range.to) {
      return `${dayjs(format(range.from, "dd/MM/yyyy"), "DD/MM/YYYY").format("MMMM DD, YYYY")} - ${dayjs(format(range.to, "dd/MM/yyyy"), "DD/MM/YYYY").format("MMMM DD, YYYY")}`
    }

    return placeholder
  }

  return (
    <div className={clsx("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={clsx(
              "w-full flex items-center justify-start text-left font-normal cursor-pointer",
              !range?.from && "text-muted-foreground",
              buttonClassName,
            )}
            disabled={disabled}
          >
            <CalendarIcon size={20} strokeWidth={2} className="h-4 w-4" />
            <p className="text-xs mr-auto">{getDisplayText()}</p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleSelect}
            disabled={isDateDisabled}
            initialFocus
            numberOfMonths={numberOfMonths}
            className={clsx("border-2 border-neutral-4 rounded-md", calendarClassName)}
          />
        </PopoverContent>
      </Popover>

      {/* Hidden inputs for accessibility and form integration */}
      <Input
        type="date"
        value={range?.from ? format(range.from, "yyyy-MM-dd") : ""}
        onChange={handleFromInputChange}
        className={clsx("sr-only", inputClassName)}
        disabled={disabled}
        name="date-from"
      />
      <Input
        type="date"
        value={range?.to ? format(range.to, "yyyy-MM-dd") : ""}
        onChange={handleToInputChange}
        className={clsx("sr-only", inputClassName)}
        disabled={disabled}
        name="date-to"
      />
    </div>
  )
}
