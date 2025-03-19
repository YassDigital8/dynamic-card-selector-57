
import React from 'react';
import { SidebarFooter as Footer } from '@/components/ui/sidebar';
import { HelpCircle } from 'lucide-react';
import LogoutDropdown from '@/components/auth/LogoutDropdown';

const SidebarFooter = () => {
  return (
    <Footer className="border-t border-sidebar-border p-2 md:p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
          <HelpCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="text-xs md:text-sm">Need help?</span>
        </div>
        <LogoutDropdown />
      </div>
    </Footer>
  );
};

export default SidebarFooter;
