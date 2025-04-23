
import { ApiUser, User, UserPrivilege, ModuleRole, ModuleType } from '@/types/user.types';

/**
 * Validates if a role string is a valid UserPrivilege
 */
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

/**
 * Maps module roles from API roles array
 */
export const mapModuleRoles = (apiRoles: string[], isSuperAdmin: boolean): ModuleRole[] => {
  // If user is SuperAdmin, set SuperAdmin role for all modules
  if (isSuperAdmin) {
    return (['hotels', 'users', 'gallery', 'cms'] as ModuleType[]).map(moduleId => ({
      moduleId,
      role: 'SuperAdmin' as UserPrivilege
    }));
  } 
  
  // Process regular role mapping
  return apiRoles
    .map(role => {
      const parts = role.split('-');
      
      // Handle service name mapping
      let moduleId: ModuleType;
      const serviceName = parts[0];
      
      // Map service names to our internal module IDs
      if (serviceName === 'Hotel') {
        moduleId = 'hotels' as ModuleType;
      } else if (serviceName === 'Authntication') { // Using exact spelling from API
        moduleId = 'users' as ModuleType;
      } else if (serviceName === 'Gallery') {
        moduleId = 'gallery' as ModuleType;
      } else if (serviceName === 'CMS') {
        moduleId = 'cms' as ModuleType;
      } else {
        moduleId = serviceName.toLowerCase() as ModuleType;
      }

      // Get the role part (after the hyphen)
      const roleLevel = parts.length > 1 ? parts[1] : 'Officer';
      
      // Convert role level to a valid UserPrivilege type
      const validRole = validateUserPrivilege(roleLevel || 'Officer');
      
      return {
        moduleId,
        role: validRole
      };
    })
    .filter(mr => 
      ['hotels', 'users', 'gallery', 'cms'].includes(mr.moduleId as string)
    ) as ModuleRole[];
};

/**
 * Convert API user to our User type
 */
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
  const moduleRoles = mapModuleRoles(apiUser.roles, isSuperAdmin);
  
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
