
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import { toast } from '@/hooks/use-toast';
import { updateUserRole } from '../api/operations';

export const useRoleActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Update user's default role
  const handleUpdateRole = async (userId: string, role: UserPrivilege) => {
    try {
      setIsLoading(true);
      
      // Call API to update role
      await updateUserRole(userId, role);
      
      // Update local state
      const updatedUsers = users.map(u => {
        if (u.id === userId) {
          // Also update the users module role to match
          const updatedModuleRoles = u.moduleRoles?.map(mr => {
            if (mr.moduleId === 'users') {
              return { ...mr, role };
            }
            return mr;
          }) || [];
          
          return { 
            ...u, 
            role,
            moduleRoles: updatedModuleRoles
          };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      // Update selected user if it's the one being updated
      if (selectedUser?.id === userId) {
        const updatedModuleRoles = selectedUser.moduleRoles?.map(mr => {
          if (mr.moduleId === 'users') {
            return { ...mr, role };
          }
          return mr;
        }) || [];
        
        setSelectedUser({
          ...selectedUser,
          role,
          moduleRoles: updatedModuleRoles
        });
      }
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
  
  // Update user's role for a specific module
  const handleUpdateModuleRole = async (userId: string, moduleId: ModuleType, role: UserPrivilege) => {
    try {
      setIsLoading(true);
      
      // For now, update only local state since there's no specific API for module roles
      const updatedUsers = users.map(u => {
        if (u.id === userId) {
          let moduleRoles = [...(u.moduleRoles || [])];
          
          // Find if module role already exists
          const moduleRoleIndex = moduleRoles.findIndex(mr => mr.moduleId === moduleId);
          
          if (moduleRoleIndex >= 0) {
            // Update existing module role
            moduleRoles[moduleRoleIndex] = { ...moduleRoles[moduleRoleIndex], role };
          } else {
            // Add new module role
            moduleRoles.push({ moduleId, role });
          }
          
          // If users module, also update default role
          let updatedRole = u.role;
          if (moduleId === 'users') {
            updatedRole = role;
          }
          
          return { 
            ...u, 
            role: updatedRole,
            moduleRoles 
          };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      // Update selected user if it's the one being updated
      if (selectedUser?.id === userId) {
        let moduleRoles = [...(selectedUser.moduleRoles || [])];
        
        // Find if module role already exists
        const moduleRoleIndex = moduleRoles.findIndex(mr => mr.moduleId === moduleId);
        
        if (moduleRoleIndex >= 0) {
          // Update existing module role
          moduleRoles[moduleRoleIndex] = { ...moduleRoles[moduleRoleIndex], role };
        } else {
          // Add new module role
          moduleRoles.push({ moduleId, role });
        }
        
        // If users module, also update default role
        let updatedRole = selectedUser.role;
        if (moduleId === 'users') {
          updatedRole = role;
        }
        
        setSelectedUser({
          ...selectedUser,
          role: updatedRole,
          moduleRoles
        });
      }
      
      toast({
        title: "Module Role Updated",
        description: `User's ${moduleId} role updated to ${role}`,
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
