
import { User } from '@/types/user.types';
import { toast } from '@/hooks/use-toast';
import { mapApiUserToUser } from '../mappers/userMappers';
import { createAuthHeaders, handleApiError } from '@/services/api/config/apiConfig';

/**
 * Fetches all users from the API
 */
export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    console.log("Attempting to fetch users from API");
    
    // Create headers with authentication token
    const headers = createAuthHeaders();
    console.log("Headers prepared for user API request:", JSON.stringify(headers));

    // Make the API request
    const response = await fetch('https://reports.chamwings.com:7182/api/Authentication/get-all-users', {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const errorMessage = await handleApiError(response);
      console.error(`API error: ${response.status} - ${errorMessage}`);
      toast({
        variant: "destructive",
        title: "Error fetching users",
        description: `${errorMessage}`,
      });
      throw new Error(errorMessage);
    }
    
    console.log("Successfully received user data from API");
    const data = await response.json();
    console.log("Raw API response:", data);
    
    // Check if the response has an items property (based on the network request logs)
    const apiUsers = data.items || data;
    console.log(`Received ${apiUsers.length} users from API`);
    
    // Map API users to our User type
    const mappedUsers = apiUsers
      .filter(user => user.status !== "Deleted") // Filter out deleted users
      .map(mapApiUserToUser);
    
    console.log("Mapped users:", mappedUsers);
    return mappedUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    
    // Show toast notification for the error
    toast({
      variant: "destructive",
      title: "Error fetching users",
      description: error instanceof Error ? error.message : "Unknown error occurred",
    });
    
    throw error;
  }
};
