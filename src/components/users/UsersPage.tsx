
import React, { useEffect } from 'react';
import AddUserDialog from './AddUserDialog';
import UsersHeader from './UsersHeader';
import UsersContent from './UsersContent';
import UsersSearchBar from './UsersSearchBar';
import { useUsers } from '@/hooks/users';
import useUserDialog from './useUserDialog';
import useSearchFilters from './useSearchFilters';
import { motion } from 'framer-motion';

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
    handlePromoteToSuperAdmin,
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
    <motion.div 
      initial="initial"
      animate="animate"
      className="space-y-6 w-full mx-auto"
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
        onUpdateModuleRole={handleUpdateModuleRole}
        onToggleStatus={handleToggleStatus}
        onDeleteUser={handleDeleteUser}
        onPromoteToSuperAdmin={handlePromoteToSuperAdmin}
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
