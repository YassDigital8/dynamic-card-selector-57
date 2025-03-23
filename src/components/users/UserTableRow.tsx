
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
  privileges: UserPrivilege[];
  onSelectUser: (user: User) => void;
  onUpdateRole: (userId: string, role: UserPrivilege) => void;
  onToggleStatus: (userId: string) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  privileges,
  onSelectUser,
  onUpdateRole,
  onToggleStatus
}) => {
  // Helper function to get user's role for a specific module
  const getUserModuleRole = (moduleId: ModuleType): UserPrivilege => {
    if (!user.moduleRoles) {
      return user.role;
    }
    
    const moduleRole = user.moduleRoles.find(mr => mr.moduleId === moduleId);
    return moduleRole ? moduleRole.role : user.role;
  };

  const handleRoleChange = (moduleId: ModuleType) => (role: UserPrivilege) => {
    onUpdateRole(user.id, role);
  };

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
        {user.lastLogin ? format(user.lastLogin, 'MMM dd, yyyy h:mm a') : 'Never'}
      </TableCell>
      
      {/* Module roles dropdowns */}
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('hotels')}
          privileges={privileges}
          onRoleChange={handleRoleChange('hotels')}
        />
      </TableCell>
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('users')}
          privileges={privileges}
          onRoleChange={handleRoleChange('users')}
        />
      </TableCell>
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('gallery')}
          privileges={privileges}
          onRoleChange={handleRoleChange('gallery')}
        />
      </TableCell>
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('settings')}
          privileges={privileges}
          onRoleChange={handleRoleChange('settings')}
        />
      </TableCell>
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('reports')}
          privileges={privileges}
          onRoleChange={handleRoleChange('reports')}
        />
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
