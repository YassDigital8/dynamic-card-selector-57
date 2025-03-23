
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, RefreshCw } from 'lucide-react';

interface UsersHeaderProps {
  onRefresh: () => void;
  onAddUser: () => void;
  isLoading: boolean;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ onRefresh, onAddUser, isLoading }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage system users and their module-specific privileges
        </p>
      </div>
      <div className="flex space-x-2 mt-4 md:mt-0">
        <Button 
          onClick={onRefresh} 
          variant="outline"
          disabled={isLoading}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button 
          onClick={onAddUser}
          disabled={isLoading}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
    </div>
  );
};

export default UsersHeader;
