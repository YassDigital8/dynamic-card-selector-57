
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { SidebarProvider as SidebarContextProvider, useSidebar } from "./sidebar-context"

// Re-export components from other files
export {
  Sidebar,
  SidebarTrigger,
  SidebarRail,
  SidebarInset
} from "./sidebar"

export {
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent
} from "./sidebar-structure"

export {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent
} from "./sidebar-group"

export {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction, 
  SidebarMenuBadge
} from "./sidebar-menu"

export {
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "./sidebar-menu-utils"

// Export the useSidebar hook
export { useSidebar }

// Create a wrapped SidebarProvider with TooltipProvider
export const SidebarProvider: typeof SidebarContextProvider = (props) => {
  return (
    <SidebarContextProvider
      {...props}
      className={cn(
        "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
        props.className
      )}
    >
      <TooltipProvider delayDuration={0}>
        {props.children}
      </TooltipProvider>
    </SidebarContextProvider>
  )
}
