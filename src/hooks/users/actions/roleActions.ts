
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import { toast } from '@/hooks/use-toast';
import { updateUserRole } from '../api/userApi';

export const useRoleActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleUpdateRole = async (userId: string, role: UserPrivilege) => {
    try {
      setIsLoading(true);
      
      // Update role via API
      await updateUserRole(userId, role);
      
      // Update local state
      setUsers(users.map(u => 
        u.id === userId 
          ? { ...u, role } 
          : u
      ));
      
      // Update selected user if it's the one being edited
      if (selectedUser?.id === userId) {
        setSelectedUser({
          ...selectedUser,
          role
        });
      }
      
      toast({
        title: "Role Updated",
        description: `User's role has been updated to ${role}`,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user role",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateModuleRole = async (userId: string, moduleId: ModuleType, role: UserPrivilege) => {
    try {
      setIsLoading(true);
      
      // Find the user
      const user = users.find(u => u.id === userId);
      if (!user) {
        throw new Error("User not found");
      }
      
      // Prepare new moduleRoles array
      const updatedModuleRoles = user.moduleRoles ? [...user.moduleRoles] : [];
      
      // Check if the moduleId already exists
      const existingModuleRoleIndex = updatedModuleRoles.findIndex(mr => mr.moduleId === moduleId);
      if (existingModuleRoleIndex >= 0) {
        // Update existing module role
        updatedModuleRoles[existingModuleRoleIndex] = { moduleId, role };
      } else {
        // Add new module role
        updatedModuleRoles.push({ moduleId, role });
      }
      
      // Currently, the API doesn't support module-specific role updates directly
      // We'll update this when the API supports it
      
      // Update local state
      const updatedUsers = users.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            moduleRoles: updatedModuleRoles
          };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      // Update selected user if it's the one being edited
      if (selectedUser?.id === userId) {
        setSelectedUser({
          ...selectedUser,
          moduleRoles: updatedModuleRoles
        });
      }
      
      toast({
        title: "Module Role Updated",
        description: `User's role for ${moduleId} module has been updated to ${role}`,
      });
    } catch (error) {
      console.error('Error updating module role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update module role",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpdateRole,
    handleUpdateModuleRole
  };
};
