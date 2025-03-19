
import React from 'react';
import { motion } from 'framer-motion';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import useApiStatus from '@/hooks/useApiStatus';
import SidebarComponent from './sidebar/SidebarComponent';
import PageHeader from './header/PageHeader';
import { useBreadcrumbItems } from './utils/breadcrumbUtils';

interface PageContainerProps {
  children: React.ReactNode;
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

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { isApiLive } = useApiStatus();
  const { getBreadcrumbItems } = useBreadcrumbItems();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <SidebarComponent />
        
        <SidebarInset>
          <div className="p-2 sm:p-4 md:p-8 lg:p-10">
            <motion.div 
              className="max-w-6xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
            >
              <PageHeader 
                isApiLive={isApiLive}
                getBreadcrumbItems={getBreadcrumbItems}
              />
              
              {children}
            </motion.div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PageContainer;
