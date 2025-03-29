
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
        department: userData.department || ""
      };
      
      // Get auth headers using the common utility function
      const headers = createAuthHeaders();
      console.log(`Adding new user with headers:`, headers);
      console.log(`Request data:`, JSON.stringify(requestData));
      
      const response = await fetch('https://92.112.184.210:7182/api/Authentication/AddNewUser', {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });
      
      // Always get the response text regardless of status
      const responseText = await response.text();
      console.log(`API response (${response.status}):`, responseText);
      
      // Try to parse the response as JSON if possible
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log("Parsed response data:", responseData);
      } catch (e) {
        console.log("Response is not valid JSON");
        responseData = { message: responseText };
      }
      
      if (!response.ok) {
        // Display specific error message in toast
        toast({
          title: `API Error (${response.status})`,
          description: responseData.message || responseData.title || responseText.substring(0, 100),
          variant: "destructive",
        });
        
        return null;
      }
      
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
      
      // Show success toast with response data
      toast({
        title: "User added",
        description: `User successfully added with ${responseData?.userCode ? `ID: ${responseData.userCode}` : 'success'}`,
      });
      
      const fullUserData = {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: 'Officer' as const,
        department: userData.department,
        isActive: true,
      };
      
      const newUser = addUser(fullUserData);
      setUsers(prev => [...prev, newUser]);
      
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
