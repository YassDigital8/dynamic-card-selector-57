
import React, { useEffect } from 'react';
import AddUserDialog from './AddUserDialog';
import UsersHeader from './UsersHeader';
import UsersContent from './UsersContent';
import UsersSearchBar from './UsersSearchBar';
import useUsers from '@/hooks/useUsers';
import useUserDialog from './useUserDialog';
import useSearchFilters from './useSearchFilters';

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

  const {
    searchFilters,
    updateFilter,
    resetFilters,
    filteredUsers,
    departments
  } = useSearchFilters(users);

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

      <UsersSearchBar
        nameFilter={searchFilters.name}
        emailFilter={searchFilters.email}
        departmentFilter={searchFilters.department}
        statusFilter={searchFilters.status}
        departments={departments}
        onUpdateFilter={updateFilter}
        onResetFilters={resetFilters}
      />

      <UsersContent
        users={filteredUsers}
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
