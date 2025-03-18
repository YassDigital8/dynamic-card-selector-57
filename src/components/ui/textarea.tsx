
import * as React from "react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
    const isMobile = useIsMobile()
    
    // Generate a unique ID for the textarea if it doesn't have one
    const textareaId = props.id || React.useId();
    
    // If there's an error but no aria-describedby, create an error ID
    const errorId = error && !ariaDescribedBy ? `${textareaId}-error` : undefined;
    
    // Use the provided aria-describedby or the error ID
    const describedBy = ariaDescribedBy || errorId;
    
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isMobile && "px-2 text-xs min-h-[60px]",
          error ? "border-destructive focus-visible:ring-destructive" : "border-input",
          className
        )}
        id={textareaId}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
