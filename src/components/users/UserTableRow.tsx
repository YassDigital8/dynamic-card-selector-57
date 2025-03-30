
import React from 'react';
import { format } from 'date-fns';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User as UserIcon, Award } from 'lucide-react';
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import UserStatusBadge from './UserStatusBadge';
import UserModuleRoleSelect from './UserModuleRoleSelect';

interface UserTableRowProps {
  user: User;
  privileges: UserPrivilege[];
  onSelectUser: (user: User) => void;
  onUpdateRole: (userId: string, role: UserPrivilege) => void;
  onUpdateModuleRole: (userId: string, moduleId: ModuleType, role: UserPrivilege) => void;
  onToggleStatus: (userId: string) => void;
  onPromoteToSuperAdmin: (userId: string) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  privileges,
  onSelectUser,
  onUpdateRole,
  onUpdateModuleRole,
  onToggleStatus,
  onPromoteToSuperAdmin
}) => {
  // Helper function to get user's role for a specific module
  const getUserModuleRole = (moduleId: ModuleType): UserPrivilege => {
    // If user is SuperAdmin, return SuperAdmin for all modules
    if (user.role === 'SuperAdmin') {
      return 'SuperAdmin';
    }
    
    if (!user.moduleRoles) {
      return user.role;
    }
    
    const moduleRole = user.moduleRoles.find(mr => mr.moduleId === moduleId);
    return moduleRole ? moduleRole.role : user.role;
  };

  const handleModuleRoleChange = (moduleId: ModuleType) => (role: UserPrivilege) => {
    onUpdateModuleRole(user.id, moduleId, role);
  };

  // Check if the user is already a SuperAdmin
  const isSuperAdmin = user.role === 'SuperAdmin';

  return (
    <TableRow>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onSelectUser(user)}
        >
          <UserIcon className="h-4 w-4" />
        </Button>
      </TableCell>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <UserStatusBadge 
          isActive={user.isActive} 
          onToggle={() => onToggleStatus(user.id)} 
        />
      </TableCell>
      <TableCell>{user.department || 'N/A'}</TableCell>
      <TableCell>
        {user.lastLogin && user.lastLogin.getFullYear() > 1 
          ? format(user.lastLogin, 'MMM dd, yyyy h:mm a') 
          : 'Never'}
      </TableCell>
      
      {/* Module roles dropdowns - only show the 4 specified modules */}
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('hotels')}
          privileges={privileges}
          onRoleChange={handleModuleRoleChange('hotels')}
        />
      </TableCell>
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('users')}
          privileges={privileges}
          onRoleChange={handleModuleRoleChange('users')}
        />
      </TableCell>
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('gallery')}
          privileges={privileges}
          onRoleChange={handleModuleRoleChange('gallery')}
        />
      </TableCell>
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('cms')}
          privileges={privileges}
          onRoleChange={handleModuleRoleChange('cms')}
        />
      </TableCell>
      
      {/* Add a dedicated cell for the Promote to Super Admin button */}
      <TableCell className="text-center px-2">
        {isSuperAdmin ? (
          <div className="text-xs text-amber-600 flex items-center justify-center">
            <Award className="h-3 w-3 mr-1" />
            <span>Super Admin</span>
          </div>
        ) : (
          <button 
            onClick={() => onPromoteToSuperAdmin(user.id)}
            className="text-xs text-amber-600 hover:text-amber-800 flex items-center"
            title="Promote to Super Admin"
          >
            <Award className="h-3 w-3 mr-1" />
            <span>Promote</span>
          </button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
