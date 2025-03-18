
import * as React from "react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
    const isMobile = useIsMobile()
    
    // Generate a unique ID for the input if it doesn't have one
    const inputId = props.id || React.useId();
    
    // If there's an error but no aria-describedby, create an error ID
    const errorId = error && !ariaDescribedBy ? `${inputId}-error` : undefined;
    
    // Use the provided aria-describedby or the error ID
    const describedBy = ariaDescribedBy || errorId;
    
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isMobile ? "h-9 px-2 py-1" : "h-10",
          error ? "border-destructive focus-visible:ring-destructive" : "border-input",
          className
        )}
        id={inputId}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
