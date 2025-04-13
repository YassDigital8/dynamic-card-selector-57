
import { toast } from '@/hooks/use-toast';
import { createAuthHeaders, handleApiError } from '@/services/api/config/apiConfig';

/**
 * Deletes a user
 */
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    // Create headers with authentication token
    const headers = createAuthHeaders();
    
    console.log("Deleting user with ID:", userId);
    
    // Make the API request
    const response = await fetch(`https://reports.chamwings.com:7182/api/Authentication/delete-user/${userId}`, {
      method: 'DELETE',
      headers
    });
    
    if (!response.ok) {
      const errorMessage = await handleApiError(response);
      toast({
        variant: "destructive",
        title: "Error deleting user",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
    
    toast({
      title: "User deleted",
      description: "User has been successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
