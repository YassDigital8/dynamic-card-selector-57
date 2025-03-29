
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/user.types';
import { addUser } from '@/services/userService';
import { createAuthHeaders } from '@/services/api/config/apiConfig';

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
      
      // Get auth headers using the common utility function
      const headers = createAuthHeaders();
      console.log(`Adding new user with headers:`, headers);
      
      const response = await fetch('https://92.112.184.210:7182/api/Authentication/AddNewUser', {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error: ${response.status} - ${errorText}`);
        throw new Error(`API error: ${response.status}`);
      }
      
      // Parse the response to check for specific error messages
      const responseData = await response.json();
      
      // Check if the API returned an error message about existing email
      if (responseData.message && responseData.message.includes("Email is already exist")) {
        toast({
          title: "Error",
          description: "A user with this email already exists.",
          variant: "destructive",
        });
        return null;
      }
      
      // If we didn't get a success indicator from the API, treat as an error
      if (responseData.isAuthenticated === false) {
        toast({
          title: "Error",
          description: responseData.message || "Failed to add user.",
          variant: "destructive",
        });
        return null;
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
