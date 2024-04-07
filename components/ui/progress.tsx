"use client"
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

// Defining Progress component as a forward ref component
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>, 
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> 
>(
  ({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref} 
      className={cn( 
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props} 
    >
      {/* Indicator component for Progress */}
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all" 
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }} // Adjusting the translation based on the value
      />
    </ProgressPrimitive.Root>
  )
)

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
