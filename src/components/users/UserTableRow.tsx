
import React from 'react';
import { format } from 'date-fns';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User as UserIcon } from 'lucide-react';
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import UserStatusBadge from './UserStatusBadge';
import UserModuleRoleSelect from './UserModuleRoleSelect';

interface UserTableRowProps {
  user: User;
  isSelected: boolean;
  privileges: UserPrivilege[];
  onSelectUser: (user: User) => void;
  onUpdateRole: (userId: string, role: UserPrivilege) => void;
  onUpdateModuleRole: (userId: string, moduleId: ModuleType, role: UserPrivilege) => void;
  onToggleStatus: (userId: string) => void;
  onPromoteToSuperAdmin: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  isSelected,
  privileges,
  onSelectUser,
  onUpdateRole,
  onUpdateModuleRole,
  onToggleStatus,
  onPromoteToSuperAdmin,
  onDeleteUser
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

  return (
    <TableRow 
      className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${isSelected ? 'bg-accent/40' : ''}`}
    >
      <TableCell>
        <Button
          variant={isSelected ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onSelectUser(user)}
          className={isSelected ? "bg-primary text-primary-foreground" : ""}
        >
          <UserIcon className="h-4 w-4" />
        </Button>
      </TableCell>
      <TableCell className="font-medium whitespace-nowrap">{user.name}</TableCell>
      <TableCell className="whitespace-nowrap">{user.email}</TableCell>
      <TableCell>
        <UserStatusBadge 
          isActive={user.isActive} 
          onToggle={() => onToggleStatus(user.id)} 
        />
      </TableCell>
      <TableCell>{user.department || 'N/A'}</TableCell>
      <TableCell className="whitespace-nowrap">
        {user.lastLogin && user.lastLogin.getFullYear() > 1 
          ? format(user.lastLogin, 'MMM dd, yyyy h:mm a') 
          : 'Never'}
      </TableCell>
      
      {/* Module roles dropdowns */}
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
      
      {/* Actions column - now only has the selection indicator */}
      <TableCell className="text-center px-2">
        {user.role === 'SuperAdmin' && (
          <div className="text-xs text-amber-600 inline-flex items-center justify-center">
            <span>Super Admin</span>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
