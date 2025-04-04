
import React from 'react';
import { useLocation } from 'react-router-dom';
import SessionTimer from '@/components/auth/SessionTimer';
import { ApiStatusIndicator } from '@/components/ui/api-status-indicator';
import LogoutButton from '@/components/auth/LogoutButton';
import useApiStatus from '@/hooks/useApiStatus';

interface PageHeaderProps {
  pageTitle?: string;
  pageDescription?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageTitle, pageDescription }) => {
  const location = useLocation();
  const { isApiLive } = useApiStatus();
  
  return (
    <div className="flex flex-col space-y-4 md:space-y-6 mb-6">
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
