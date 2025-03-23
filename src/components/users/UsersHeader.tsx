
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import useAuthentication from '@/hooks/useAuthentication';
import ApiStatusIndicator from '@/components/ui/api-status-indicator';
import LogoutButton from '@/components/auth/LogoutButton';
import { useDemoMode } from '@/hooks/useDemoMode';

interface UsersHeaderProps {
  onRefresh: () => void;
  onAddUser: () => void;
  isLoading: boolean;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ onRefresh, onAddUser, isLoading }) => {
  const { userInfo } = useAuthentication();
  const { demoMode } = useDemoMode();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
    >
      <div className="flex items-center space-x-3">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          User Management
        </h1>
        <ApiStatusIndicator isLive={!demoMode} className="hidden md:flex" />
      </div>
      <p className="text-muted-foreground mt-1 md:hidden">
        Manage system users and their module-specific privileges
      </p>
      
      <div className="flex items-center gap-3 mt-4 md:mt-0">
        {demoMode && (
          <div className="flex items-center gap-1.5 text-xs rounded-full px-2 py-0.5 bg-red-50 text-red-700 font-medium mr-2">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            Demo Mode
          </div>
        )}
        
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Button 
            onClick={onRefresh} 
            variant="outline"
            disabled={isLoading}
            className="shadow-sm transition-all hover:shadow hover:bg-accent"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            onClick={onAddUser}
            disabled={isLoading}
            className="shadow-sm transition-all hover:shadow-md"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
          <LogoutButton 
            variant="ghost" 
            showText={true}
            className="ml-3"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default UsersHeader;
