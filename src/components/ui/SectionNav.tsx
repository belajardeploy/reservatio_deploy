import React from "react";
import clsx from "clsx";

interface SectionNavItem<T extends string | number> {
  label: React.ReactNode;
  value: T;
}

interface SectionNavProps<T extends string | number> {
  items: SectionNavItem<T>[];
  current: T;
  onChange: (value: T) => void;
  className?: string;
}

export default function SectionNav<T extends string | number>({
  items,
  current,
  onChange,
  className
}: SectionNavProps<T>) {
  return (
    <div className={clsx("flex", className)}>
      {items.map(({ label, value }) => (
        <button key={value} className="">
          <div
            className={clsx(
              "border-b-2 w-[95px] cursor-pointer py-2 px-4",
              current === value
                ? "border-b-primary-1"
                : "border-b-transparent"
            )}
            onClick={() => onChange(value)}
          >
            <h2
              className={clsx(
                "text-xs font-medium",
                current === value && "text-primary-1"
              )}
            >
              {label}
            </h2>
          </div>
        </button>
      ))}
    </div>
  );
}