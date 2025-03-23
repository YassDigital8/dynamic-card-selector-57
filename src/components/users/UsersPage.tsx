
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, RefreshCw } from 'lucide-react';
import UsersTable from './UsersTable';
import AddUserDialog from './AddUserDialog';
import useUsers from '@/hooks/useUsers';

const UsersPage: React.FC = () => {
  const {
    users,
    isLoading,
    fetchUsers,
    handleUpdateRole,
    handleUpdateModuleRole,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser,
    userPrivileges,
  } = useUsers();

  const [showAddDialog, setShowAddDialog] = useState(false);

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage system users and their module-specific privileges
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button 
            onClick={() => fetchUsers()} 
            variant="outline"
            disabled={isLoading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button 
            onClick={() => setShowAddDialog(true)}
            disabled={isLoading}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            View and manage all system users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable
            users={users}
            privileges={userPrivileges}
            onSelectUser={() => {}} // Empty function since we no longer need to select users
            onUpdateRole={handleUpdateRole}
            onToggleStatus={handleToggleStatus}
            onDeleteUser={handleDeleteUser}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      <AddUserDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddUser={handleAddUser}
        privileges={userPrivileges}
      />
    </div>
  );
};

export default UsersPage;
