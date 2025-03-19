
import React from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import SidebarHeaderComponent from './SidebarHeader';
import SidebarContentComponent from './SidebarContent';
import SidebarFooterComponent from './SidebarFooter';

const SidebarComponent: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeaderComponent />
      <SidebarContentComponent />
      <SidebarFooterComponent />
    </Sidebar>
  );
};

export default SidebarComponent;
