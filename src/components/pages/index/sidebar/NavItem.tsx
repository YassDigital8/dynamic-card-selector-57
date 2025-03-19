
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, title, isActive = false }) => {
  const isMobile = useIsMobile();

  return (
    <SidebarMenuItem>
      <Link to={to} className="w-full">
        <SidebarMenuButton 
          isActive={isActive} 
          tooltip={title} 
          size={isMobile ? "sm" : "default"}
        >
          {icon}
          <span className="text-xs md:text-sm">{title}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};

export default NavItem;
