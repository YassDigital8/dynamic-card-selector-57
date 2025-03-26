import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import { 
  updateUserRole, 
  updateUserModuleRole,
  toggleUserStatus, 
  deleteUser, 
  addUser
} from '@/services/userService';

export const useUserActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  const handleUpdateRole = useCallback(async (userId: string, newRole: UserPrivilege) => {
    setIsLoading(true);
    try {
      // Check if it's a Super Admin role
      if (newRole === 'Super Admin') {
        try {
          const response = await fetch(`https://92.112.184.210:7182/api/Authentication/AssignServiceRoleToUser/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              role: 'SuperAdmin'
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to assign Super Admin role');
          }
          
          // Update local state - set all modules to Super Admin
          const updatedUser = {
            ...users.find(u => u.id === userId),
            moduleRoles: ['hotels', 'users', 'gallery', 'cms'].map(module => ({
              moduleId: module as ModuleType,
              role: 'Super Admin' as UserPrivilege
            }))
          } as User;
          
          setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
          
          if (selectedUser?.id === userId) {
            setSelectedUser(updatedUser);
          }
          
          toast({
            title: "Super Admin role assigned",
            description: `User now has Super Admin privileges across all modules`,
          });
        } catch (error) {
          console.error('Error assigning Super Admin role:', error);
          toast({
            title: "Error",
            description: "Failed to assign Super Admin role",
            variant: "destructive",
          });
        }
      } else {
        // Regular role update
        const updatedUser = updateUserRole(userId, newRole);
        if (updatedUser) {
          setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
          if (selectedUser?.id === userId) {
            setSelectedUser(updatedUser);
          }
          toast({
            title: "Role updated",
            description: `User's default role updated to ${newRole}`,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading, users]);

  const handleUpdateModuleRole = useCallback(async (userId: string, moduleId: ModuleType, newRole: UserPrivilege) => {
    setIsLoading(true);
    try {
      // If setting to Super Admin, use the special API endpoint
      if (newRole === 'Super Admin') {
        return handleUpdateRole(userId, newRole);
      }
      
      const updatedUser = updateUserModuleRole(userId, moduleId, newRole);
      if (updatedUser) {
        setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
        if (selectedUser?.id === userId) {
          setSelectedUser(updatedUser);
        }
        toast({
          title: "Module role updated",
          description: `User's role for ${moduleId} module updated to ${newRole}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update module role",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading, handleUpdateRole]);

  const handleToggleStatus = useCallback((userId: string) => {
    setIsLoading(true);
    try {
      const updatedUser = toggleUserStatus(userId);
      if (updatedUser) {
        setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
        if (selectedUser?.id === userId) {
          setSelectedUser(updatedUser);
        }
        toast({
          title: "Status updated",
          description: `User status set to ${updatedUser.isActive ? 'active' : 'inactive'}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading]);

  const handleDeleteUser = useCallback((userId: string) => {
    setIsLoading(true);
    try {
      const success = deleteUser(userId);
      if (success) {
        setUsers(prev => prev.filter(user => user.id !== userId));
        if (selectedUser?.id === userId) {
          setSelectedUser(null);
        }
        toast({
          title: "User deleted",
          description: "User has been successfully removed",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading]);

  const handleAddUser = useCallback(async (userData: { 
    firstName: string;
    lastName: string;
    email: string;
    department?: string;
  }) => {
    setIsLoading(true);
    
    try {
      const requestData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        department: userData.department || "",
        isActive: true
      };
      
      const response = await fetch('https://92.112.184.210:7182/api/Authentication/AddNewUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const fullUserData = {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: 'Officer' as UserPrivilege, 
        department: userData.department,
        isActive: true,
      };
      
      const newUser = addUser(fullUserData);
      setUsers(prev => [...prev, newUser]);
      
      toast({
        title: "User added",
        description: "New user has been successfully added",
      });
      return newUser;
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Error",
        description: "Failed to add user. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast, setUsers, setIsLoading]);

  return {
    handleUpdateRole,
    handleUpdateModuleRole,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser
  };
};
