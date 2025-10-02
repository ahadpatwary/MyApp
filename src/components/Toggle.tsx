"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"  // shadcn এর utility class combiner
import { Button } from "@/components/ui/button"

interface ToggleButtonProps {
  onLabel?: string
  offLabel?: string
  onClassName?: string
  offClassName?: string
  publicClassName?: string
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (state: boolean) => void
}

export function ToggleButton({
  onLabel , // on value
  offLabel , // of value
  onClassName,
  offClassName,
  publicClassName,
  setIsOpen,
  onChange,
}: ToggleButtonProps) {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    const newState = !active
    setActive(newState)
    if(setIsOpen) setIsOpen?.(false)
    if (onChange) onChange(newState) // parent এ state পাঠাতে চাইলে
  }

  return (
    <Button
      variant= "outline"
      onClick={handleClick}
      className={cn("cursor-pointer",
        active ? onClassName : offClassName,
        publicClassName
      )}
    >
      {active ? onLabel : offLabel}
    </Button>
  )
}