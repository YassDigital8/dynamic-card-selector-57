
import React from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import SidebarHeader from '@/components/layout/components/SidebarHeader';
import SidebarNavigation from '@/components/layout/components/SidebarNavigation';
import SidebarFooter from '@/components/layout/components/SidebarFooter';
import BreadcrumbGenerator from '@/components/layout/components/BreadcrumbGenerator';
import PageContent from '@/components/layout/components/PageContent';
import { motion } from 'framer-motion';
import { useMobile } from '@/hooks/use-mobile';

interface StandardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

const StandardLayout: React.FC<StandardLayoutProps> = ({ 
  children, 
  pageTitle, 
  pageDescription 
}) => {
  const { isMobile } = useMobile();

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar 
        defaultCollapsed={isMobile}
        className="border-r border-border h-screen flex flex-col"
      >
        <SidebarHeader />
        <SidebarNavigation />
        <SidebarFooter />
      </Sidebar>
      
      <motion.div 
        className="flex-1 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-2 md:p-4">
          <BreadcrumbGenerator />
        </div>
        <PageContent pageTitle={pageTitle} pageDescription={pageDescription}>
          {children}
        </PageContent>
      </motion.div>
    </div>
  );
};

export default StandardLayout;
