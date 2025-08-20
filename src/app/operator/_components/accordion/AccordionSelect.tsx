"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import clsx from "clsx"

type SelectAccordionProps = {
  children: React.ReactNode
  value: any
  onChange: (value: any) => void
  placeholder?: string
  className?: string
  headerClassName?: string
  contentClassName?: string
  chevronClassName?: string
  animationDuration?: number
}

type SelectAccordionItemProps = {
  children: React.ReactNode
  value: string
  className?: string
  disabled?: boolean
}

// Type guard to check if an element is a valid SelectAccordionItem
function isSelectAccordionItem(child: React.ReactNode): child is React.ReactElement<SelectAccordionItemProps> {
  return (
    React.isValidElement(child) && typeof child.props === "object" && child.props !== null && "value" in child.props
  )
}

const SelectAccordionContext = React.createContext<{
  value: string
  onChange: (value: string) => void
  setIsOpen: (isOpen: boolean) => void
} | null>(null)

export function SelectAccordion({
  children,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  headerClassName,
  contentClassName,
  chevronClassName,
  animationDuration = 300
}: SelectAccordionProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Find the selected item using the type guard
  const selectedItem = React.Children.toArray(children).find(
    (child) => isSelectAccordionItem(child) && child.props.value === value,
  ) as React.ReactElement<SelectAccordionItemProps> | undefined

  // Safely access the display value
  const displayValue = selectedItem ? selectedItem.props.children : placeholder

  return (
    <SelectAccordionContext.Provider value={{ value, onChange, setIsOpen }}>
      <div className={clsx("border-2 border-neutral-4 rounded-md overflow-auto", className)}>
        <div
          className={clsx("flex items-center justify-between p-3 cursor-pointer", isOpen && "border-b", headerClassName)}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>{displayValue}</div>
          <ChevronDown
            className={clsx("h-4 w-4 transition-transform", isOpen && "transform rotate-180", chevronClassName)}
          />
        </div>
        {isOpen && <div className={clsx("py-2 transition-all max-h-96 space-y-1.5", contentClassName)} style={{ transitionDuration: `${animationDuration}ms` }}>{children}</div>}
      </div>
    </SelectAccordionContext.Provider>
  )
}

export function SelectAccordionItem({ children, value, className, disabled = false }: SelectAccordionItemProps) {
  const context = React.useContext(SelectAccordionContext)

  if (!context) {
    throw new Error("SelectAccordionItem must be used within a SelectAccordion")
  }

  const { value: selectedValue, onChange, setIsOpen } = context
  const isSelected = selectedValue === value

  const handleSelect = () => {
    if (disabled) return
    console.log(selectedValue)
    console.log(value)
    onChange(value)
    setIsOpen(false)
  }

  return (
    <div
      className={clsx(
        "mx-3 px-2 py-2 cursor-pointer rounded-sm hover:bg-neutral-3/30",
        isSelected && "bg-primary-1 text-white",
        disabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
        className,
      )}
      onClick={handleSelect}
      aria-disabled={disabled}
    >
      {children}
    </div>
  )
}
