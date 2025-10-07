"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { updateUser } from "@/lib/toggle"


interface ToggleButtonProps {
  id?: string
  name?: string
  state?: string
  onClassName?: string
  offClassName?: string
  publicClassName?: string
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  onChange?: (state: boolean) => void
}

export function ToggleButton({
  id,
  name,
  state,
  onClassName,
  offClassName,
  publicClassName,
  setIsOpen,
  onChange,
}: ToggleButtonProps) {
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false) // 🔥 loading state

  const handleClick = async () => {
    const newState = !active
    setActive(newState)
    setLoading(true) // operation শুরু

    try {
      if (name) {
        if (newState) {
          await updateUser(id, name, "private")
        } else {
          await updateUser(id, name, "public")
        }
      }

      if (onChange) onChange(newState)
    } catch (error) {
      console.error("Error updating user:", error)
    } finally {
      if (setIsOpen) setIsOpen(false)
      setLoading(false) // ✅ operation শেষ হলে loader বন্ধ
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={loading} // operation চললে button disable থাকবে
      className={cn(
        "cursor-pointer",
        active ? onClassName : offClassName,
        publicClassName
      )}
    >
      {loading
        ? "Updating..." // 🔥 DB operation চললে এই লেখা
        : state
      }
    </Button>
  )
}