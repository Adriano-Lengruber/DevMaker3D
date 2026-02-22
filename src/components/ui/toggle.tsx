'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  size?: 'default' | 'sm' | 'lg'
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed, onPressedChange, size = 'default', ...props }, ref) => {
    const [isPressed, setIsPressed] = React.useState(pressed || false)

    React.useEffect(() => {
      setIsPressed(pressed || false)
    }, [pressed])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newPressed = !isPressed
      setIsPressed(newPressed)
      onPressedChange?.(newPressed)
      props.onClick?.(e)
    }

    const sizeClasses = {
      default: 'h-10 px-3',
      sm: 'h-9 px-2.5',
      lg: 'h-11 px-5'
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isPressed}
        data-state={isPressed ? 'on' : 'off'}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
          'hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
          'disabled:pointer-events-none disabled:opacity-50',
          isPressed ? 'bg-gray-800 text-orange-500' : 'bg-transparent',
          sizeClasses[size],
          className
        )}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
Toggle.displayName = "Toggle"

export { Toggle }