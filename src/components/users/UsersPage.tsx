
import React, { useEffect } from 'react';
import AddUserDialog from './AddUserDialog';
import UsersHeader from './UsersHeader';
import UsersContent from './UsersContent';
import useUsers from '@/hooks/useUsers';
import useUserDialog from './useUserDialog';

const UsersPage: React.FC = () => {
  const {
    users,
    isLoading,
    fetchUsers,
    handleUpdateRole,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser,
    userPrivileges,
  } = useUsers();

  const { 
    showAddDialog, 
    openAddDialog, 
    setShowAddDialog 
  } = useUserDialog();

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="space-y-6">
      <UsersHeader 
        onRefresh={fetchUsers}
        onAddUser={openAddDialog}
        isLoading={isLoading}
      />

      <UsersContent
        users={users}
        userPrivileges={userPrivileges}
        isLoading={isLoading}
        onSelectUser={() => {}} // Empty function since we no longer need to select users
        onUpdateRole={handleUpdateRole}
        onToggleStatus={handleToggleStatus}
        onDeleteUser={handleDeleteUser}
      />

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
