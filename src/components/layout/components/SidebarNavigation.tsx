
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { 
  FileText, 
  Settings, 
  Users, 
  Image,
  Hotel,
  Ticket
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SidebarNavigation: React.FC = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] md:text-xs">Navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/" className="w-full">
              <SidebarMenuButton 
                isActive={location.pathname === '/'} 
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
                isActive={location.pathname === '/pages'}
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
                isActive={location.pathname === '/gallery'}
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
                isActive={location.pathname === '/hotel'}
                size={isMobile ? "sm" : "default"}
              >
                <Hotel className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">Hotel Network</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link to="/events" className="w-full">
              <SidebarMenuButton 
                tooltip="Events & Attractions" 
                isActive={location.pathname === '/events'}
                size={isMobile ? "sm" : "default"}
              >
                <Ticket className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">Events & Attractions</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link to="/users" className="w-full">
              <SidebarMenuButton 
                tooltip="Users" 
                isActive={location.pathname === '/users'}
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
                isActive={location.pathname === '/settings'}
                size={isMobile ? "sm" : "default"}
              >
                <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">Settings</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarNavigation;
