
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Run immediately and add listener
    checkMobile()
    
    // Add event listener for resize events with improved debounce
    let timeoutId: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 50) // Reduced from 100ms to 50ms for more responsive feel
    }
    
    window.addEventListener("resize", handleResize)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  })

  React.useEffect(() => {
    // More responsive resize handler with improved debounce
    let timeoutId: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 50) // Reduced from default to 50ms for more responsive feel
    }

    // Initial call
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    ...screenSize,
    isMobile: screenSize.width < MOBILE_BREAKPOINT,
    isTablet: screenSize.width >= MOBILE_BREAKPOINT && screenSize.width < 1024,
    isDesktop: screenSize.width >= 1024,
  }
}
