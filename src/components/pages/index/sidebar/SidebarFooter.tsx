
import React from 'react';
import { SidebarFooter as SidebarFooterBase } from '@/components/ui/sidebar';
import { HelpCircle } from 'lucide-react';

const SidebarFooterComponent: React.FC = () => {
  return (
    <SidebarFooterBase className="border-t border-sidebar-border p-2 md:p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
          <HelpCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="text-xs md:text-sm">Need help?</span>
        </div>
        {/* LogoutButton was removed from here */}
      </div>
    </SidebarFooterBase>
  );
};

export default SidebarFooterComponent;
