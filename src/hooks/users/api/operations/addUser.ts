
import { User, UserCreationData } from '@/types/user.types';
import { toast } from '@/hooks/use-toast';
import { createAuthHeaders, handleApiError } from '@/services/api/config/apiConfig';

/**
 * Adds a new user via the API
 */
export const addUser = async (userData: UserCreationData): Promise<User> => {
  try {
    // Create headers with authentication token
    const headers = createAuthHeaders();
    
    // Prepare the request body
    const requestBody = {
      firstName: userData.name?.split(' ')[0] || '',
      lastName: userData.name?.split(' ').slice(1).join(' ') || '',
      email: userData.email,
      password: userData.password || 'DefaultPassword123!', // Using password from UserCreationData
      isActive: userData.isActive === undefined ? true : userData.isActive,
      department: userData.department || '',
      roles: userData.moduleRoles?.map(mr => `${mr.moduleId.charAt(0).toUpperCase() + mr.moduleId.slice(1)}-${mr.role}`) || []
    };
    
    console.log("Adding new user with data:", requestBody);
    
    // Make the API request
    const response = await fetch('https://reports.chamwings.com:7182/api/Authentication/register', {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorMessage = await handleApiError(response);
      toast({
        variant: "destructive",
        title: "Error adding user",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
    
    // Parse response
    const responseData = await response.json();
    
    // Convert API response to our User type
    const newUser: User = {
      id: responseData.code || userData.id || '',
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'Officer',
      moduleRoles: userData.moduleRoles || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: userData.isActive || true,
      department: userData.department || ''
    };
    
    toast({
      title: "User added",
      description: `${newUser.name} was successfully added`,
    });
    
    return newUser;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};
