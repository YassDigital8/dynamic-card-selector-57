
import React from 'react';
import { useLocation } from 'react-router-dom';
import SessionTimer from '@/components/auth/SessionTimer';
import { ApiStatusIndicator } from '@/components/ui/api-status-indicator';
import useApiStatus from '@/hooks/useApiStatus';
import BreadcrumbGenerator from './BreadcrumbGenerator';
import NotificationsPopover from './NotificationsPopover';

interface PageHeaderProps {
  pageTitle?: string;
  pageDescription?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  pageTitle = "Page Navigator", 
  pageDescription = "Manage pages across different POS and languages" 
}) => {
  const { isApiLive } = useApiStatus();
  
  return (
    <div className="flex flex-col space-y-4 md:space-y-6 mb-6">
      <BreadcrumbGenerator />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-3 md:mb-0">
          <h1 className="text-xl md:text-3xl font-bold text-foreground">{pageTitle}</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">{pageDescription}</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <SessionTimer />
          <ApiStatusIndicator isLive={isApiLive} />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
