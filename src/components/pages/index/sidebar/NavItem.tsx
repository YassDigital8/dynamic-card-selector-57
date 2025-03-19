
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label }) => {
  const isMobile = useIsMobile();
  const isActive = window.location.pathname === to;

  return (
    <SidebarMenuItem>
      <Link to={to} className="w-full">
        <SidebarMenuButton 
          isActive={isActive} 
          tooltip={label} 
          size={isMobile ? "sm" : "default"}
        >
          <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="text-xs md:text-sm">{label}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};

export default NavItem;
