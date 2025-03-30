
import React from 'react';
import { format } from 'date-fns';
import { TableRow, TableCell } from '@/components/ui/table';
import { User as UserIcon, Crown } from 'lucide-react';
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import UserStatusBadge from './UserStatusBadge';
import UserModuleRoleSelect from './UserModuleRoleSelect';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const isMobile = useIsMobile();
  const isSuperAdmin = user.role === 'SuperAdmin';
  
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

  // Handle row click event without propagating to the module role selects
  const handleRowClick = (e: React.MouseEvent) => {
    // Check if the click event originated from a select, button, or other interactive element
    const target = e.target as HTMLElement;
    const isInteractiveElement = 
      target.tagName === 'BUTTON' || 
      target.tagName === 'SELECT' || 
      target.closest('button') ||
      target.closest('[role="combobox"]') ||
      target.closest('[data-state]'); // Most shadcn/ui components have data-state
    
    if (!isInteractiveElement) {
      onSelectUser(user);
    }
  };

  return (
    <TableRow 
      className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${isSelected ? 'bg-accent/40' : ''} cursor-pointer`}
      onClick={handleRowClick}
    >
      <TableCell>
        <div className="flex justify-center items-center">
          {isSuperAdmin ? (
            <Crown className="h-4 w-4 text-amber-500" />
          ) : (
            <UserIcon className="h-4 w-4" />
          )}
        </div>
      </TableCell>
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span className="truncate max-w-[120px] md:max-w-full">{user.name}</span>
          {isMobile && (
            <span className="text-xs text-muted-foreground truncate max-w-[120px]">{user.email}</span>
          )}
        </div>
      </TableCell>
      
      {!isMobile && <TableCell className="whitespace-nowrap">{user.email}</TableCell>}
      
      <TableCell>
        <UserStatusBadge 
          isActive={user.isActive} 
          onToggle={() => onToggleStatus(user.id)} 
        />
      </TableCell>
      
      {!isMobile && <TableCell>{user.department || 'N/A'}</TableCell>}
      
      {!isMobile && (
        <TableCell className="whitespace-nowrap">
          {user.lastLogin && user.lastLogin.getFullYear() > 1 
            ? format(user.lastLogin, 'MMM dd, yyyy h:mm a') 
            : 'Never'}
        </TableCell>
      )}
      
      {/* Module roles - combined on mobile, separate on desktop */}
      {isMobile ? (
        <TableCell className="text-center" onClick={e => e.stopPropagation()}>
          <div className="flex space-x-1 justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <UserModuleRoleSelect
                      currentRole={getUserModuleRole('hotels')}
                      privileges={privileges}
                      onRoleChange={handleModuleRoleChange('hotels')}
                      compact={true}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hotels Permission</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {user.role === 'SuperAdmin' && (
              <div className="text-xs bg-amber-500 text-white px-1 py-0.5 rounded">
                Admin
              </div>
            )}
          </div>
        </TableCell>
      ) : (
        <>
          <TableCell className="text-center px-2" onClick={e => e.stopPropagation()}>
            <UserModuleRoleSelect
              currentRole={getUserModuleRole('hotels')}
              privileges={privileges}
              onRoleChange={handleModuleRoleChange('hotels')}
            />
          </TableCell>
          <TableCell className="text-center px-2" onClick={e => e.stopPropagation()}>
            <UserModuleRoleSelect
              currentRole={getUserModuleRole('users')}
              privileges={privileges}
              onRoleChange={handleModuleRoleChange('users')}
            />
          </TableCell>
          <TableCell className="text-center px-2" onClick={e => e.stopPropagation()}>
            <UserModuleRoleSelect
              currentRole={getUserModuleRole('gallery')}
              privileges={privileges}
              onRoleChange={handleModuleRoleChange('gallery')}
            />
          </TableCell>
          <TableCell className="text-center px-2" onClick={e => e.stopPropagation()}>
            <UserModuleRoleSelect
              currentRole={getUserModuleRole('cms')}
              privileges={privileges}
              onRoleChange={handleModuleRoleChange('cms')}
            />
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default UserTableRow;
