
import React from 'react';
import { motion } from 'framer-motion';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarInset
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarHeader from '@/components/layout/components/SidebarHeader';
import SidebarNavigation from '@/components/layout/components/SidebarNavigation';
import SidebarFooter from '@/components/layout/components/SidebarFooter';
import PageContent from '@/components/layout/components/PageContent';

interface PageContainerProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  pageTitle, 
  pageDescription 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar>
          <SidebarHeader />
          
          <SidebarContent>
            <SidebarNavigation />
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

export default PageContainer;
