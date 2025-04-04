
import React from 'react';
import { useLocation } from 'react-router-dom';
import SessionTimer from '@/components/auth/SessionTimer';
import { ApiStatusIndicator } from '@/components/ui/api-status-indicator';
import LogoutButton from '@/components/auth/LogoutButton';
import useApiStatus from '@/hooks/useApiStatus';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';

interface PageHeaderProps {
  pageTitle?: string;
  pageDescription?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageTitle, pageDescription }) => {
  const location = useLocation();
  const { isApiLive } = useApiStatus();
  
  // Generate breadcrumb items based on current route
  const getBreadcrumbItems = () => {
    const path = location.pathname;
    
    // Special case for hotel page
    if (path === '/hotel') {
      return [];
    }
    
    if (path === '/') {
      return [];
    }
    
    const segments = path.split('/').filter(Boolean);
    
    return segments.map((segment, index) => {
      // Build the path up to this segment
      const currentPath = `/${segments.slice(0, index + 1).join('/')}`;
      
      // Only add links for segments before the last one
      const isLastSegment = index === segments.length - 1;
      
      // Format the segment name - capitalize first letter
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Add this segment to the breadcrumb trail
      return {
        label,
        href: isLastSegment ? undefined : currentPath
      };
    });
  };
  
  return (
    <div className="flex flex-col space-y-4 md:space-y-6 mb-6">
      <BreadcrumbNav 
        items={[
          { label: 'Home', href: '/' },
          ...getBreadcrumbItems()
        ]}
      />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-3 md:mb-0">
          <h1 className="text-xl md:text-3xl font-bold text-foreground">{pageTitle || "Admin Dashboard"}</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">{pageDescription || "Manage your application settings"}</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <SessionTimer />
          <ApiStatusIndicator isLive={isApiLive} />
          <LogoutButton 
            variant="outline" 
            size="sm" 
            className="ml-2" 
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
