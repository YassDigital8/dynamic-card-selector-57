
import React from 'react';
import { useLocation } from 'react-router-dom';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import SessionTimer from '@/components/auth/SessionTimer';
import { ApiStatusIndicator } from '@/components/ui/api-status-indicator';
import LogoutButton from '@/components/auth/LogoutButton';

interface PageHeaderProps {
  isApiLive: boolean | null;
  getBreadcrumbItems: () => { label: string; href?: string }[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ isApiLive, getBreadcrumbItems }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  
  return (
    <div className="flex flex-col space-y-4 md:space-y-6 mb-6">
      {location.pathname !== '/' && (
        <BreadcrumbNav 
          items={[
            { label: 'Dashboard', href: '/' },
            ...getBreadcrumbItems()
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
          {isDashboard && (
            <LogoutButton 
              variant="outline" 
              size="sm" 
              className="ml-2" 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
