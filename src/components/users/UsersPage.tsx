
import React, { useEffect, useState } from 'react';
import AddUserDialog from './AddUserDialog';
import UsersHeader from './UsersHeader';
import UsersContent from './UsersContent';
import UsersSearchBar from './UsersSearchBar';
import SelectedUserActions from './SelectedUserActions';
import { useUsers } from '@/hooks/users';
import useUserDialog from './useUserDialog';
import useSearchFilters from './useSearchFilters';
import { motion } from 'framer-motion';
import { User } from '@/types/user.types';
import { Card } from '@/components/ui/card';

const UsersPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    users,
    isLoading,
    fetchUsers,
    handleUpdateRole,
    handleUpdateModuleRole,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser,
    handlePromoteToSuperAdmin,
    userPrivileges,
    pagination
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

  // Clear selected user when users are refreshed
  useEffect(() => {
    setSelectedUser(null);
  }, [users]);

  // Handle user selection
  const handleSelectUser = (user: User) => {
    setSelectedUser(prevSelected => 
      prevSelected?.id === user.id ? null : user
    );
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="space-y-4 w-full max-w-full mx-auto px-2 md:px-4"
      variants={{
        initial: { opacity: 0 },
        animate: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.1 
          } 
        }
      }}
    >
      <UsersHeader 
        selectedUser={selectedUser}
        onClearSelection={() => setSelectedUser(null)}
        onRefresh={() => {
          fetchUsers(pagination.currentPage);
          setSelectedUser(null);
        }}
        onAddUser={openAddDialog}
        isLoading={isLoading}
      />

      <Card className="p-3 md:p-4">
        <UsersSearchBar
          nameFilter={searchFilters.name}
          emailFilter={searchFilters.email}
          departmentFilter={searchFilters.department}
          statusFilter={searchFilters.status}
          departments={departments}
          onUpdateFilter={updateFilter}
          onResetFilters={resetFilters}
        />
      </Card>
      
      {selectedUser && (
        <SelectedUserActions
          selectedUser={selectedUser}
          onDeleteUser={handleDeleteUser}
          onPromoteToSuperAdmin={handlePromoteToSuperAdmin}
        />
      )}

      <UsersContent
        users={filteredUsers}
        userPrivileges={userPrivileges}
        isLoading={isLoading}
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
        onUpdateRole={handleUpdateRole}
        onUpdateModuleRole={handleUpdateModuleRole}
        onToggleStatus={handleToggleStatus}
        onDeleteUser={handleDeleteUser}
        onPromoteToSuperAdmin={handlePromoteToSuperAdmin}
        pagination={pagination}
      />

      <AddUserDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddUser={handleAddUser}
        privileges={userPrivileges}
      />
    </motion.div>
  );
};

export default UsersPage;
