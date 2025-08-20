"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import clsx from "clsx"

// Custom Accordion Components
export function Accordion({
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
    id: string
    title: React.ReactNode
    content: React.ReactNode
    disabled?: boolean
  }[]
  allowMultiple?: boolean
  defaultExpanded?: string[]
  className?: string
  itemClassName?: string
  headerClassName?: string
  contentClassName?: string
  iconClassName?: string
  animationDuration?: number
  onToggle?: (id: string, isExpanded: boolean) => void
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded || [])

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      const newExpandedItems = expandedItems.includes(id)
        ? expandedItems.filter((item) => item !== id)
        : [...expandedItems, id]
      setExpandedItems(newExpandedItems)
      onToggle?.(id, !expandedItems.includes(id))
    } else {
      const newExpandedItems = expandedItems.includes(id) ? [] : [id]
      setExpandedItems(newExpandedItems)
      onToggle?.(id, !expandedItems.includes(id))
    }
  }

  return (
    <div className={clsx("w-full space-y-2", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={clsx(
            item.disabled && "opacity-60 cursor-not-allowed",
            itemClassName,
          )}
        >
          <button
            onClick={() => !item.disabled && toggleItem(item.id)}
            className={clsx(
              "flex w-full items-center justify-between text-left font-medium",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500",
              headerClassName,
            )}
            disabled={item.disabled}
            aria-expanded={expandedItems.includes(item.id)}
          >
            {item.title}
            <ChevronDown
              className={clsx(
                "h-5 w-5 transition-transform duration-200",
                expandedItems.includes(item.id) && "transform rotate-180",
                iconClassName,
              )}
            />
          </button>
          <div
            className={clsx("overflow-hidden transition-all", expandedItems.includes(item.id) ? "max-h-96" : "max-h-0")}
            style={{ transitionDuration: `${animationDuration}ms` }}
          >
            <div className={clsx("px-2 pt-2", contentClassName)}>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

