
import React from 'react';
import { motion } from 'framer-motion';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import useApiStatus from '@/hooks/useApiStatus';
import { useLocation } from 'react-router-dom';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import LogoutButton from '@/components/auth/LogoutButton';
import SessionTimer from '@/components/auth/SessionTimer';
import { ApiStatusIndicator } from '@/components/ui/api-status-indicator';
import SidebarLayout from './SidebarLayout';
import HeaderSection from './HeaderSection';

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
  const location = useLocation();
  
  // Generate breadcrumb items based on current route
  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const items = [];
    
    if (path === '/') {
      return [{ label: 'Dashboard' }];
    }
    
    const segments = path.split('/').filter(Boolean);
    
    segments.forEach((segment, index) => {
      // Build the path up to this segment
      const currentPath = `/${segments.slice(0, index + 1).join('/')}`;
      
      // Only add links for segments before the last one
      const isLastSegment = index === segments.length - 1;
      
      // Format the segment name - capitalize first letter
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Add this segment to the breadcrumb trail
      items.push({
        label,
        href: isLastSegment ? undefined : currentPath
      });
    });
    
    return items;
  };
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <SidebarLayout />
        
        <div className="p-2 sm:p-4 md:p-8 lg:p-10">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <div className="flex flex-col space-y-4 md:space-y-6 mb-6">
              {location.pathname !== '/' && (
                <BreadcrumbNav 
                  items={[
                    { label: 'Dashboard', href: '/' },
                    ...getBreadcrumbItems()
                  ]}
                />
              )}
              
              <HeaderSection isApiLive={isApiLive} />
            </div>
            
            {children}
          </motion.div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PageContainer;
