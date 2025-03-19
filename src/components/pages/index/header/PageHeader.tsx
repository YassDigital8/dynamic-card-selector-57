
import React from 'react';
import { useLocation } from 'react-router-dom';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import SessionTimer from '@/components/auth/SessionTimer';
import { ApiStatusIndicator } from '@/components/ui/api-status-indicator';
import LogoutDropdown from '@/components/auth/LogoutDropdown';
import useApiStatus from '@/hooks/useApiStatus';

interface PageHeaderProps {
  breadcrumbItems?: Array<{ label: string; href?: string }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ breadcrumbItems = [] }) => {
  const location = useLocation();
  const { isApiLive } = useApiStatus();

  return (
    <div className="flex flex-col space-y-4 md:space-y-6 mb-6">
      {location.pathname !== '/' && breadcrumbItems.length > 0 && (
        <BreadcrumbNav 
          items={[
            { label: 'Dashboard', href: '/' },
            ...breadcrumbItems
          ]}
        />
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-3 md:mb-0">
          <h1 className="text-xl md:text-3xl font-bold text-foreground">Page Navigator</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">Manage pages across different POS and languages</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <SessionTimer />
          <ApiStatusIndicator isLive={isApiLive} />
          <LogoutDropdown />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
