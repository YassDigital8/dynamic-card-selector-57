
import React from 'react';
import { format } from 'date-fns';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User as UserIcon, Award, Trash2 } from 'lucide-react';
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import UserStatusBadge from './UserStatusBadge';
import UserModuleRoleSelect from './UserModuleRoleSelect';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

interface UserTableRowProps {
  user: User;
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

  // Check if the user is already a SuperAdmin
  const isSuperAdmin = user.role === 'SuperAdmin';

  return (
    <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onSelectUser(user)}
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
      
      {/* Actions */}
      <TableCell className="text-center px-2 space-x-2 whitespace-nowrap">
        <div className="flex items-center gap-3 justify-center">
          {/* Promote to Super Admin button */}
          {isSuperAdmin ? (
            <div className="text-xs text-amber-600 inline-flex items-center">
              <Award className="h-3 w-3 mr-1" />
              <span>Super Admin</span>
            </div>
          ) : (
            <Button 
              onClick={() => onPromoteToSuperAdmin(user.id)}
              variant="outline"
              size="sm"
              className="text-xs text-amber-600 hover:text-amber-800 hover:bg-amber-50 h-8"
            >
              <Award className="h-3 w-3 mr-1" />
              <span>Promote</span>
            </Button>
          )}
          
          {/* Delete User button with confirmation dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                <span>Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete User</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {user.name}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => onDeleteUser(user.id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
