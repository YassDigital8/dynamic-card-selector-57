
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import { useRoleActions } from './actions/roleActions';
import { useStatusActions } from './actions/statusActions';
import { useUserAddActions } from './actions/userAddActions';
import { useAdminActions } from './actions/adminActions';

export const useUserActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Role-related actions
  const { handleUpdateRole, handleUpdateModuleRole } = useRoleActions(
    users, setUsers, selectedUser, setSelectedUser, setIsLoading
  );
  
  // Status-related actions
  const { handleToggleStatus, handleDeleteUser } = useStatusActions(
    users, setUsers, selectedUser, setSelectedUser, setIsLoading
  );
  
  // User addition actions
  const { handleAddUser } = useUserAddActions(setUsers, setIsLoading);
  
  // Admin-specific actions
  const { handlePromoteToSuperAdmin } = useAdminActions(
    users, setUsers, selectedUser, setSelectedUser, setIsLoading
  );

  return {
    handleUpdateRole,
    handleUpdateModuleRole,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser,
    handlePromoteToSuperAdmin
  };
};
