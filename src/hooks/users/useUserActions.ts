
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

  const handleUpdateRole = useCallback((userId: string, newRole: UserPrivilege) => {
    setIsLoading(true);
    try {
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading]);

  const handleUpdateModuleRole = useCallback((userId: string, moduleId: ModuleType, newRole: UserPrivilege) => {
    setIsLoading(true);
    try {
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
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading]);

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

  const handlePromoteToSuperAdmin = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      // Make the API call to promote user to SuperAdmin with the required body
      const response = await fetch(`https://92.112.184.210:7182/api/Authentication/AssignServiceRoleToUser/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify("SuperAdmin"), // Send "SuperAdmin" as the request body
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Update the user in our local state
      const updatedUser = updateUserRole(userId, 'SuperAdmin');
      if (updatedUser) {
        setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
        if (selectedUser?.id === userId) {
          setSelectedUser(updatedUser);
        }
        toast({
          title: "User promoted",
          description: "User has been promoted to Super Admin",
        });
      }
    } catch (error) {
      console.error("Error promoting user:", error);
      toast({
        title: "Error",
        description: "Failed to promote user to Super Admin",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading]);

  return {
    handleUpdateRole,
    handleUpdateModuleRole,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser,
    handlePromoteToSuperAdmin
  };
};
