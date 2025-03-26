
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/user.types';
import { addUser } from '@/services/userService';

export const useUserAddActions = (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

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
        role: 'Officer' as const,
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
    handleAddUser
  };
};
