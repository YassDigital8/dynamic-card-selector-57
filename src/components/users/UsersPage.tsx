
import React, { useEffect, useState } from 'react';
import AddUserDialog from './AddUserDialog';
import UsersHeader from './UsersHeader';
import UsersSearchBar from './UsersSearchBar';
import SelectedUserActions from './SelectedUserActions';
import { useUsers } from '@/hooks/users';
import useUserDialog from './useUserDialog';
import useSearchFilters from './useSearchFilters';
import { motion } from 'framer-motion';
import { User } from '@/types/user.types';
import { Card } from '@/components/ui/card';
import UsersTable from './UsersTable';
import UserSelectDropdown from './UserSelectDropdown';

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

  // When users are loaded or filtered, reset the selected user if not present
  useEffect(() => {
    if (selectedUser && !filteredUsers.find(u => u.id === selectedUser.id)) {
      setSelectedUser(null);
    }
  }, [filteredUsers, selectedUser]);

  // Handle user selection from dropdown
  const handleDropdownSelect = (user: User | null) => setSelectedUser(user);

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="space-y-4 w-full max-w-full mx-auto px-2 md:px-4 flex flex-col md:flex-row"
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
      {/* Left/main content */}
      <div className="flex-1 min-w-0">
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
        <UserSelectDropdown
          users={filteredUsers}
          selectedUser={selectedUser}
          onSelectUser={handleDropdownSelect}
          isLoading={isLoading}
        />
        {selectedUser && (
          <SelectedUserActions
            selectedUser={selectedUser}
            onDeleteUser={handleDeleteUser}
            onPromoteToSuperAdmin={handlePromoteToSuperAdmin}
          />
        )}
      </div>
      {/* Fixed Users Table on the right */}
      <div
        className="md:w-[420px] w-full md:fixed md:right-0 md:top-[80px] md:h-[calc(100vh-100px)] shadow-lg bg-white z-30 border-l rounded-l-xl"
        style={{ minWidth: 350, maxWidth: 500 }}
      >
        <div className="p-4 border-b font-semibold text-lg">User Details</div>
        <div className="overflow-y-auto h-full">
          <UsersTable
            users={selectedUser ? [selectedUser] : []}
            privileges={userPrivileges}
            selectedUser={selectedUser}
            onSelectUser={handleDropdownSelect}
            onUpdateRole={handleUpdateRole}
            onUpdateModuleRole={handleUpdateModuleRole}
            onToggleStatus={handleToggleStatus}
            onDeleteUser={handleDeleteUser}
            onPromoteToSuperAdmin={handlePromoteToSuperAdmin}
            isLoading={isLoading}
          />
        </div>
      </div>

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
