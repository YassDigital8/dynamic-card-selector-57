
import React from 'react';
import { motion } from 'framer-motion';
import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarHeader from '@/components/layout/components/SidebarHeader';
import SidebarFooter from '@/components/layout/components/SidebarFooter';
import SidebarNavigation from '@/components/layout/components/SidebarNavigation';

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
          <div className="p-2 sm:p-4 md:p-8 lg:p-10">
            <motion.div 
              className="max-w-6xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
            >
              {children}
            </motion.div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PageContainer;
