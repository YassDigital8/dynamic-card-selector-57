
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
import ModulePermissions from './ModulePermissions';
import useUsers from '@/hooks/useUsers';
import { User } from '@/types/user.types';

const UsersPage: React.FC = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    isLoading,
    fetchUsers,
    handleUpdateRole,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser,
    userPrivileges,
    modulePermissions
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
            Manage system users and their privileges
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
                onSelectUser={setSelectedUser}
                onUpdateRole={handleUpdateRole}
                onToggleStatus={handleToggleStatus}
                onDeleteUser={handleDeleteUser}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedUser ? (
            <ModulePermissions
              modules={modulePermissions}
              selectedRole={selectedUser.role}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Module Permissions</CardTitle>
                <CardDescription>
                  Select a user to view their permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8 text-muted-foreground">
                No user selected. Click on a user to view their permissions.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

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
