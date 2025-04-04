
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
import { LayoutDashboard, FileText, Image, Hotel, Users, Settings, HelpCircle, Ticket } from 'lucide-react';

export const navItems = [
  { 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    href: '/' 
  },
  { 
    label: 'Pages', 
    icon: FileText, 
    href: '/pages' 
  },
  { 
    label: 'Gallery', 
    icon: Image, 
    href: '/gallery' 
  },
  { 
    label: 'Hotel Network', 
    icon: Hotel, 
    href: '/hotel'
  },
  {
    label: 'Events & Attractions',
    icon: Ticket,
    href: '/events'
  },
  { 
    label: 'Users', 
    icon: Users, 
    href: '/users' 
  },
  { 
    label: 'Settings', 
    icon: Settings, 
    href: '/settings' 
  },
];

interface SidebarNavigationProps {
  isMobile: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ isMobile }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/hotel' && location.pathname.startsWith('/hotel/')) {
      return true;
    }
    return location.pathname === path;
  };
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] md:text-xs">Navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link to={item.href} className="w-full">
                <SidebarMenuButton 
                  isActive={isActive(item.href)} 
                  tooltip={item.label} 
                  size={isMobile ? "sm" : "default"}
                >
                  <item.icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="text-xs md:text-sm">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarNavigation;
