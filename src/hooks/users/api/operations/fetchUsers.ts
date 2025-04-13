
import { User } from '@/types/user.types';
import { toast } from '@/hooks/use-toast';
import { mapApiUserToUser } from '../mappers/userMappers';
import { createAuthHeaders, handleApiError } from '@/services/api/config/apiConfig';
import { StatusFilters, buildStatusFilterQueryString } from '../../data/userStatusData';

/**
 * Fetches users from the API with pagination and filters
 */
export const fetchAllUsers = async (
  page: number = 1, 
  pageSize: number = 15,
  statusFilters: StatusFilters = {}
): Promise<{users: User[], totalCount: number}> => {
  try {
    console.log(`Attempting to fetch users from API - page ${page}, pageSize ${pageSize}`);
    
    // Create headers with authentication token
    const headers = createAuthHeaders();
    console.log("Headers prepared for user API request:", JSON.stringify(headers));

    // Build status filter query string
    const filterQuery = buildStatusFilterQueryString(statusFilters);
    
    // Make the API request with pagination parameters and filters
    const url = `https://reports.chamwings.com:7182/api/Authentication/get-all-users?page=${page}&pageSize=${pageSize}${filterQuery}`;
    console.log("API Request URL:", url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const errorMessage = await handleApiError(response);
      console.error(`API error: ${response.status} - ${errorMessage}`);
      toast({
        variant: "destructive",
        title: "Error fetching users",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
    
    console.log("Successfully received user data from API");
    const data = await response.json();
    console.log("Raw API response:", data);
    
    // Extract the pagination details
    const apiUsers = data.items || data;
    const totalCount = data.totalCount || apiUsers.length;
    
    console.log(`Received ${apiUsers.length} users from API (total: ${totalCount})`);
    
    // Map API users to our User type - don't filter deleted users here since that's now handled by API filters
    const mappedUsers = apiUsers.map(mapApiUserToUser);
    
    console.log("Mapped users:", mappedUsers);
    return { users: mappedUsers, totalCount };
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
