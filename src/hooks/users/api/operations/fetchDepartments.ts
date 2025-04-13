
import { toast } from '@/hooks/use-toast';
import { createAuthHeaders, handleApiError } from '@/services/api/config/apiConfig';

/**
 * Fetches departments list from the API
 */
export const fetchDepartments = async (): Promise<string[]> => {
  try {
    console.log("Attempting to fetch departments from API");
    
    // Create headers with authentication token
    const headers = createAuthHeaders();
    console.log("Headers prepared for departments API request:", JSON.stringify(headers));

    // Make the API request
    const response = await fetch("https://reports.chamwings.com:7182/api/Authentication/Departments", {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const errorMessage = await handleApiError(response);
      console.error(`API error: ${response.status} - ${errorMessage}`);
      toast({
        variant: "destructive",
        title: "Error fetching departments",
        description: `${errorMessage}`,
      });
      throw new Error(errorMessage);
    }
    
    console.log("Successfully received departments data from API");
    const data = await response.json();
    console.log("Raw API response for departments:", data);
    
    // The API should return an array of department names
    if (Array.isArray(data)) {
      return data;
    } else {
      console.warn("Unexpected departments data format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    
    toast({
      variant: "destructive",
      title: "Error fetching departments",
      description: error instanceof Error ? error.message : "Unknown error occurred",
    });
    
    // Return empty array on error
    return [];
  }
};
