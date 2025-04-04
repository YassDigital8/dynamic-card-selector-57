
import React from 'react';
import { SidebarFooter as Footer } from '@/components/ui/sidebar';
import LogoutButton from '@/components/auth/LogoutButton';
import HelpSection from './HelpSection';

const SidebarFooter: React.FC = () => {
  return (
    <Footer className="border-t border-sidebar-border p-2 md:p-4">
      <div className="flex items-center justify-between">
        <HelpSection />
        <LogoutButton 
          variant="ghost" 
          size="sm" 
          showIcon={false} 
          showText={true} 
          showRole={false}
        />
      </div>
    </Footer>
  );
};

export default SidebarFooter;
