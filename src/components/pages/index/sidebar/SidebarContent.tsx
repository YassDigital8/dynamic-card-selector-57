
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SidebarContent as SidebarContentBase, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { 
  FileText, 
  Settings, 
  Users, 
  Image,
  Hotel
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SidebarContentComponent: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarContentBase>
      <SidebarGroup>
        <SidebarGroupLabel className="text-[10px] md:text-xs">Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
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
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContentBase>
  );
};

export default SidebarContentComponent;
