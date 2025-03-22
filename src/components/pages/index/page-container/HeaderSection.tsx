
import React from 'react';
import SessionTimer from '@/components/auth/SessionTimer';
import { ApiStatusIndicator } from '@/components/ui/api-status-indicator';
import LogoutButton from '@/components/auth/LogoutButton';

interface HeaderSectionProps {
  isApiLive: boolean | null;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ isApiLive }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="mb-3 md:mb-0">
        <h1 className="text-xl md:text-3xl font-bold text-foreground">Page Navigator</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">Manage pages across different POS and languages</p>
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
  );
};

export default HeaderSection;
