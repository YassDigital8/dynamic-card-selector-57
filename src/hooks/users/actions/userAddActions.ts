
import { User, UserPrivilege } from '@/types/user.types';
import { toast } from '@/hooks/use-toast';
import { addUser } from '../api/userApi';
import { v4 as uuidv4 } from 'uuid';

export const useUserAddActions = (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleAddUser = async (userData: {
    name: string;
    email: string;
    password: string;
    role: UserPrivilege;
    department?: string;
  }) => {
    try {
      setIsLoading(true);
      
      // Prepare the user data
      const newUserData: Partial<User> = {
        id: uuidv4(), // This will be replaced by the API response
        name: userData.name,
        email: userData.email,
        password: userData.password, // This is included for the API but won't be stored in our state
        role: userData.role,
        department: userData.department || '',
        isActive: true,
        moduleRoles: [{
          moduleId: 'users',
          role: userData.role
        }]
      };
      
      // Add user via API
      const newUser = await addUser(newUserData);
      
      // Update state with the new user
      setUsers(prev => [...prev, newUser]);
      
      toast({
        title: "User Added",
        description: `${newUser.name} has been successfully added`,
      });
      
      return true;
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add user",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAddUser
  };
};
