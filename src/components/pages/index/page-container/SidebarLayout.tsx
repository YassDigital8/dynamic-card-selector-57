
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  FileText, 
  Settings, 
  Users, 
  HelpCircle,
  Image,
  Hotel
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/ui/logo';
import { useIsMobile } from '@/hooks/use-mobile';
import LogoutButton from '@/components/auth/LogoutButton';

const SidebarLayout: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border py-2 px-2 md:py-4 md:px-3">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Logo showText={true} />
            </Link>
            <div className="flex items-center gap-1 md:gap-2">
              <ThemeToggle />
              <SidebarTrigger />
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] md:text-xs">Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <NavigationItems isMobile={isMobile} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="border-t border-sidebar-border p-2 md:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
              <HelpCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Need help?</span>
            </div>
            <LogoutButton variant="ghost" size="sm" showIcon={false} />
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset />
    </>
  );
};

// Extract navigation items into a separate component
const NavigationItems: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <>
      <SidebarMenuItem>
        <Link to="/" className="w-full">
          <SidebarMenuButton 
            isActive={window.location.pathname === '/'} 
            tooltip="Dashboard" 
            size={isMobile ? "sm" : "default"}
          >
            <FileText className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Dashboard</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <Link to="/pages" className="w-full">
          <SidebarMenuButton 
            tooltip="Pages" 
            isActive={window.location.pathname === '/pages'}
            size={isMobile ? "sm" : "default"}
          >
            <FileText className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Pages</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <Link to="/gallery" className="w-full">
          <SidebarMenuButton 
            tooltip="Gallery" 
            isActive={window.location.pathname === '/gallery'}
            size={isMobile ? "sm" : "default"}
          >
            <Image className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Gallery</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <Link to="/hotel" className="w-full">
          <SidebarMenuButton 
            tooltip="Hotel Network" 
            isActive={window.location.pathname === '/hotel'}
            size={isMobile ? "sm" : "default"}
          >
            <Hotel className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Hotel Network</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <Link to="/users" className="w-full">
          <SidebarMenuButton 
            tooltip="Users" 
            isActive={window.location.pathname === '/users'}
            size={isMobile ? "sm" : "default"}
          >
            <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Users</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <Link to="/settings" className="w-full">
          <SidebarMenuButton 
            tooltip="Settings" 
            isActive={window.location.pathname === '/settings'}
            size={isMobile ? "sm" : "default"}
          >
            <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Settings</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </>
  );
};

export default SidebarLayout;
