
import { UserPrivilege } from '@/types/user.types';
import { toast } from '@/hooks/use-toast';
import { createAuthHeaders, handleApiError } from '@/services/api/config/apiConfig';

/**
 * Updates a user's role
 */
export const updateUserRole = async (userId: string, role: UserPrivilege): Promise<void> => {
  try {
    // Create headers with authentication token
    const headers = createAuthHeaders();
    
    // Prepare the request body
    const requestBody = {
      userCode: userId,
      role: role
    };
    
    console.log("Updating user role:", requestBody);
    
    // Make the API request
    const response = await fetch('https://reports.chamwings.com:7182/api/Authentication/update-user-role', {
      method: 'PUT',
      headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorMessage = await handleApiError(response);
      toast({
        variant: "destructive",
        title: "Error updating user role",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
    
    toast({
      title: "Role updated",
      description: `User role successfully updated to ${role}`,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

/**
 * Toggles a user's active status
 */
export const toggleUserStatus = async (userId: string, isActive: boolean): Promise<void> => {
  try {
    // Create headers with authentication token
    const headers = createAuthHeaders();
    
    // Prepare the request body
    const requestBody = {
      userCode: userId,
      isActive: isActive
    };
    
    console.log("Toggling user status:", requestBody);
    
    // Make the API request
    const response = await fetch('https://reports.chamwings.com:7182/api/Authentication/toggle-user-status', {
      method: 'PUT',
      headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorMessage = await handleApiError(response);
      toast({
        variant: "destructive",
        title: "Error toggling user status",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
    
    toast({
      title: "Status updated",
      description: `User is now ${isActive ? 'active' : 'inactive'}`,
    });
  } catch (error) {
    console.error("Error toggling user status:", error);
    throw error;
  }
};
