
import * as React from "react"

const MOBILE_BREAKPOINT = 640 // Changed from 768 to 640 to match Tailwind's sm breakpoint

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Initialize with window width if available (client-side)
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    // Default to false for server-side rendering
    return false
  })

  React.useEffect(() => {
    // Initial check for mobile state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Run the check immediately
    checkMobile()
    
    // Add event listener for resize events with debounce
    let timeoutId: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 100)
    }
    
    window.addEventListener("resize", handleResize)
    
    // Clean up the event listener on component unmount
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Add a console log to help with debugging
  React.useEffect(() => {
    console.log(`Current device mode: ${isMobile ? 'Mobile' : 'Desktop'}`);
  }, [isMobile]);

  return isMobile
}
