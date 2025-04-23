
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
    userPrivileges,
    modulePermissions,
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
    handleUpdateRole,
    handleUpdateModuleRole,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser,
    handlePromoteToSuperAdmin,
    userPrivileges,
    modulePermissions,
    pagination
  };
};

export default useUsers;
