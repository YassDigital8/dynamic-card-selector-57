
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Hotel, 
  Users, 
  Settings,
  Ticket,
  Briefcase,
  Flag,
  Building,
  Layout
} from 'lucide-react';

interface SidebarNavigationProps {
  isMobile: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ isMobile }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/hotel' && location.pathname.startsWith('/hotel')) {
      return true;
    }
    if (path === '/cms' && location.pathname.startsWith('/cms')) {
      return true;
    }
    return location.pathname === path;
  };
  
  const navItems = [
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
      label: 'HR',
      icon: Briefcase,
      href: '/hr'
    },
    {
      label: 'POS Management',
      icon: Flag,
      href: '/pos'
    },
    {
      label: 'Branches Management',
      icon: Building,
      href: '/branches'
    },
    {
      label: 'CMS Builder',
      icon: Layout,
      href: '/cms'
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
  
  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton asChild>
            <Link 
              to={item.href}
              className={cn(
                "flex items-center gap-2 py-2",
                isActive(item.href) && "font-medium"
              )}
            >
              <item.icon className={cn("h-5 w-5", isMobile && "h-4 w-4")} />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SidebarNavigation;
