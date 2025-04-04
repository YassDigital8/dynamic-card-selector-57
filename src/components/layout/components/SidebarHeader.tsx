
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarHeader as Header, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/ui/logo';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const SidebarHeader: React.FC = () => {
  return (
    <Header className="border-b border-sidebar-border py-2 px-2 md:py-4 md:px-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Logo showText={true} />
        </Link>
        <div className="flex items-center gap-1 md:gap-2">
          <NotificationCenter />
          <ThemeToggle />
          <SidebarTrigger />
        </div>
      </div>
    </Header>
  );
};

export default SidebarHeader;
