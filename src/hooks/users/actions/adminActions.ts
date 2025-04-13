
import { User } from '@/types/user.types';
import { toast } from '@/hooks/use-toast';
import { updateUserRole } from '../api/userApi';

export const useAdminActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handlePromoteToSuperAdmin = async (userId: string) => {
    try {
      setIsLoading(true);
      
      // Update role via API to SuperAdmin
      await updateUserRole(userId, 'SuperAdmin');
      
      // Update local state
      const updatedUsers = users.map(u => {
        if (u.id === userId) {
          // Create SuperAdmin moduleRoles for all modules
          const moduleRoles = ['hotels', 'users', 'gallery', 'cms'].map(moduleId => ({
            moduleId: moduleId as any,
            role: 'SuperAdmin' as any
          }));
          
          return {
            ...u,
            role: 'SuperAdmin',
            moduleRoles
          };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      // Update selected user if it's the one being promoted
      if (selectedUser?.id === userId) {
        const moduleRoles = ['hotels', 'users', 'gallery', 'cms'].map(moduleId => ({
          moduleId: moduleId as any,
          role: 'SuperAdmin' as any
        }));
        
        setSelectedUser({
          ...selectedUser,
          role: 'SuperAdmin',
          moduleRoles
        });
      }
      
      toast({
        title: "User Promoted",
        description: "User has been promoted to Super Admin",
      });
    } catch (error) {
      console.error('Error promoting user to super admin:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to promote user",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handlePromoteToSuperAdmin
  };
};
