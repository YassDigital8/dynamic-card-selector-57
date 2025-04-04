
import React from 'react';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { useLocation } from 'react-router-dom';
import SessionTimer from '@/components/auth/SessionTimer';
import { ApiStatusIndicator } from '@/components/ui/api-status-indicator';
import useApiStatus from '@/hooks/useApiStatus';
import LogoutButton from '@/components/auth/LogoutButton';
import useAuthentication from '@/hooks/useAuthentication';

interface AdminHeaderProps {
  title?: string;
  description?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  title, 
  description 
}) => {
  const location = useLocation();
  const { isApiLive } = useApiStatus();
  const { userInfo } = useAuthentication();
  
  // Generate breadcrumb items based on current route
  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const items = [];
    
    if (path === '/') {
      return [];
    }
    
    const segments = path.split('/').filter(Boolean);
    
    segments.forEach((segment, index) => {
      // Build the path up to this segment
      const currentPath = `/${segments.slice(0, index + 1).join('/')}`;
      
      // Only add links for segments before the last one
      const isLastSegment = index === segments.length - 1;
      
      // Format the segment name - capitalize first letter and replace hyphens
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Add this segment to the breadcrumb trail
      items.push({
        label,
        href: isLastSegment ? undefined : currentPath
      });
    });
    
    return items;
  };

  return (
    <div className="w-full px-4 py-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between items-start md:items-center max-w-screen-2xl mx-auto">
        <div>
          {location.pathname !== '/' && (
            <BreadcrumbNav 
              items={[
                { label: 'Home', href: '/' },
                ...getBreadcrumbItems()
              ]}
              className="mb-1"
            />
          )}
          
          {title && (
            <div>
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 self-start md:self-center">
          <SessionTimer />
          <ApiStatusIndicator 
            isLive={isApiLive} 
            role={userInfo?.role}
          />
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

export default AdminHeader;
