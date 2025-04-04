
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarHeader from './components/SidebarHeader';
import SidebarFooter from './components/SidebarFooter';
import SidebarNavigation from './components/SidebarNavigation';
import PageContent from './components/PageContent';

interface StandardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

const StandardLayout: React.FC<StandardLayoutProps> = ({ children, pageTitle, pageDescription }) => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar>
          <SidebarHeader />
          
          <SidebarContent>
            <SidebarNavigation isMobile={isMobile} />
          </SidebarContent>
          
          <SidebarFooter />
        </Sidebar>
        
        <SidebarInset>
          <PageContent pageTitle={pageTitle} pageDescription={pageDescription}>
            {children}
          </PageContent>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default StandardLayout;
