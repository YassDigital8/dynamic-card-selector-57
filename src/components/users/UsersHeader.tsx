
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import useAuthentication from '@/hooks/useAuthentication';

interface UsersHeaderProps {
  onRefresh: () => void;
  onAddUser: () => void;
  isLoading: boolean;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ onRefresh, onAddUser, isLoading }) => {
  const { userInfo } = useAuthentication();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          User Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage system users and their module-specific privileges
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-end md:items-center gap-3 mt-4 md:mt-0">
        <div className="text-right text-sm text-muted-foreground mr-2">
          Welcome, <span className="font-medium text-foreground">{userInfo?.firstName || 'User'}</span>
        </div>
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
        </div>
      </div>
    </motion.div>
  );
};

export default UsersHeader;
