
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Initial check for mobile state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Run the check immediately
    checkMobile()
    
    // Add event listener for resize events
    window.addEventListener("resize", checkMobile)
    
    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return !!isMobile
}
