
import { useUserData } from './useUserData';
import { useUserActions } from './useUserActions';

export const useUsers = () => {
  const {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    isLoading,
    setIsLoading,
    fetchUsers,
    applyStatusFilter,
    currentStatusFilter,
    userPrivileges,
    modulePermissions,
    departments,
    pagination
  } = useUserData();

  const {
    handleUpdateRole,
    handleUpdateModuleRole,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser,
    handlePromoteToSuperAdmin
  } = useUserActions(users, setUsers, selectedUser, setSelectedUser, setIsLoading);

  return {
    users,
    selectedUser,
    setSelectedUser,
    isLoading,
    fetchUsers,
    applyStatusFilter,
    currentStatusFilter,
    handleUpdateRole,
    handleUpdateModuleRole,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser,
    handlePromoteToSuperAdmin,
    userPrivileges,
    modulePermissions,
    departments,
    pagination
  };
};

export default useUsers;
