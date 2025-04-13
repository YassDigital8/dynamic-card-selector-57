
import { toast } from '@/hooks/use-toast';
import { User, UserPrivilege, UserCreationData } from '@/types/user.types';
import { API_BASE_URL, getAuthToken, createAuthHeaders, handleApiError } from '@/services/api/config/apiConfig';

interface ApiUser {
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  department: string;
  lastLogIn: string;
  roles: string[];
  status: string;
  reason: string;
  numberOfLogIn: number;
}

// Helper function to validate a role string is a valid UserPrivilege
export const validateUserPrivilege = (role: string): UserPrivilege => {
  // Handle SuperAdmin case specially
  if (role === 'SuperAdmin') {
    return 'SuperAdmin' as UserPrivilege;
  }
  
  const validPrivileges: UserPrivilege[] = ['Super Admin', 'Admin', 'Manager', 'Supervisor', 'Officer'];
  
  // Check if the role is a valid UserPrivilege
  if (validPrivileges.includes(role as UserPrivilege)) {
    return role as UserPrivilege;
  }
  
  // Default to 'Officer' if not valid
  return 'Officer';
};

// Function to convert API user to our User type
export const mapApiUserToUser = (apiUser: ApiUser): User => {
  const name = `${apiUser.firstName} ${apiUser.lastName || ''}`.trim();
  
  // Check if the user is a SuperAdmin
  const isSuperAdmin = apiUser.roles.includes('SuperAdmin');
  
  // Default role - handle SuperAdmin or take the first role or default to Officer
  let defaultRole: UserPrivilege = 'Officer';
  
  if (isSuperAdmin) {
    defaultRole = 'SuperAdmin' as UserPrivilege;
  } else if (apiUser.roles.length > 0) {
    const rolePrefix = apiUser.roles[0].split('-')[0];
    defaultRole = validateUserPrivilege(rolePrefix);
  }
  
  // Map module roles from the API roles array
  let moduleRoles = [];
  
  // If user is SuperAdmin, set SuperAdmin role for all modules
  if (isSuperAdmin) {
    moduleRoles = ['hotels', 'users', 'gallery', 'cms'].map(moduleId => ({
      moduleId,
      role: 'SuperAdmin' as UserPrivilege
    }));
  } else {
    // Process regular role mapping
    moduleRoles = apiUser.roles
      .map(role => {
        const parts = role.split('-');
        
        // Handle service name mapping
        let moduleId: string;
        const serviceName = parts[0];
        
        // Map service names to our internal module IDs
        if (serviceName === 'Hotel') {
          moduleId = 'hotels';
        } else if (serviceName === 'Authntication') { // Using exact spelling from API
          moduleId = 'users';
        } else if (serviceName === 'Gallery') {
          moduleId = 'gallery';
        } else if (serviceName === 'CMS') {
          moduleId = 'cms';
        } else {
          moduleId = serviceName.toLowerCase();
        }

        // Get the role part (after the hyphen)
        const roleLevel = parts.length > 1 ? parts[1] : 'Officer';
        
        // Convert role level to a valid UserPrivilege type
        const validRole = validateUserPrivilege(roleLevel || 'Officer');
        
        return {
          moduleId: moduleId,
          role: validRole
        };
      })
      .filter(mr => 
        ['hotels', 'users', 'gallery', 'cms'].includes(mr.moduleId)
      );
  }
  
  return {
    id: apiUser.code,
    name,
    email: apiUser.email,
    role: defaultRole,
    moduleRoles,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: apiUser.lastLogIn ? new Date(apiUser.lastLogIn) : undefined,
    isActive: apiUser.status === "Active",
    department: apiUser.department
  };
};

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
    const apiUsers: ApiUser[] = data.items || data;
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

// Function to add a new user
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

// Function to update a user's role
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

// Function to toggle user active status
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

// Function to delete a user
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
