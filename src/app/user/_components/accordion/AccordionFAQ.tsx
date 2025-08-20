"use client";

import type React from "react";

import { useState } from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";

// Custom AccordionFaq Components
export function AccordionFaq({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className,
  itemClassName,
  headerClassName,
  contentClassName,
  iconClassName,
  animationDuration = 300,
  onToggle,
}: {
  items: {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
  animationDuration?: number;
  onToggle?: (id: string, isExpanded: boolean) => void;
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>(
    defaultExpanded || []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      const newExpandedItems = expandedItems.includes(id)
        ? expandedItems.filter((item) => item !== id)
        : [...expandedItems, id];
      setExpandedItems(newExpandedItems);
      onToggle?.(id, !expandedItems.includes(id));
    } else {
      const newExpandedItems = expandedItems.includes(id) ? [] : [id];
      setExpandedItems(newExpandedItems);
      onToggle?.(id, !expandedItems.includes(id));
    }
  };

  return (
    <div className={clsx("w-full space-y-2", className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={clsx(
            item.disabled && "opacity-60 cursor-not-allowed",
            itemClassName,
            index < items.length - 1 && "border-b-2 border-b-neutral-4 pb-2"
          )}
        >
          <div
            className={clsx(
              "transition-all duration-200 ease-in-out rounded-lg lg:p-4 p-2",
              expandedItems.includes(item.id) && "bg-primary-3/10 "
            )}
          >
            <button
              onClick={() => !item.disabled && toggleItem(item.id)}
              className={clsx(
                "flex w-full items-center justify-between text-left font-medium lg:text-base text-xs gap-1",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 ",
                "cursor-pointer",
                headerClassName
              )}
              disabled={item.disabled}
              aria-expanded={expandedItems.includes(item.id)}
            >
              {item.title}
              <Plus
                className={clsx(
                  "transition-all duration-200 rounded-full p-1 lg:size-8 size-7",
                  expandedItems.includes(item.id) && "transform rotate-45 bg-primary-1 stroke-white",
                  iconClassName
                )}
                // size={32}
              />

              {/* <Plus className=""/> */}
            </button>
            <div
              className={clsx(
                "overflow-hidden transition-all",
                expandedItems.includes(item.id) ? "max-h-96" : "max-h-0"
              )}
              style={{ transitionDuration: `${animationDuration}ms` }}
            >
              <div className={clsx("lg:mt-2.5 mt-1.5 text-justify", contentClassName)}>{item.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
