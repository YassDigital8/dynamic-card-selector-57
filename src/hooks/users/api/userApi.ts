
import { toast } from '@/hooks/use-toast';
import { User } from '@/types/user.types';

interface ApiUser {
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  department: string;
  lastLogIn: string;
  roles: string[];
}

// Helper function to validate a role string is a valid UserPrivilege
export const validateUserPrivilege = (role: string) => {
  // Handle SuperAdmin case specially
  if (role === 'SuperAdmin') {
    return 'SuperAdmin';
  }
  
  const validPrivileges = ['Super Admin', 'Admin', 'Manager', 'Supervisor', 'Officer'];
  
  // Check if the role is a valid UserPrivilege
  if (validPrivileges.includes(role)) {
    return role;
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
  let defaultRole = 'Officer';
  
  if (isSuperAdmin) {
    defaultRole = 'SuperAdmin';
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
      role: 'SuperAdmin'
    }));
  } else {
    // Process regular role mapping
    moduleRoles = apiUser.roles
      .map(role => {
        const [moduleId, roleLevel] = role.split('-');
        const mappedModuleId = moduleId.toLowerCase();
        
        // Convert role level to a valid UserPrivilege type
        const validRole = validateUserPrivilege(roleLevel || 'Officer');
        
        return {
          moduleId: mappedModuleId,
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
    isActive: apiUser.isActive,
    department: apiUser.department
  };
};

export const fetchAllUsers = async () => {
  try {
    const response = await fetch('https://92.112.184.210:7182/api/Authentication/get-all-users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const apiUsers: ApiUser[] = await response.json();
    return apiUsers.map(mapApiUserToUser);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
