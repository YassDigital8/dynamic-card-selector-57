
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User as UserIcon, Shield } from 'lucide-react';
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import UserStatusBadge from './UserStatusBadge';
import UserModuleRoleSelect from './UserModuleRoleSelect';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  
  // Check if the user is a Super Admin
  useEffect(() => {
    if (user.moduleRoles) {
      const allSuperAdmin = user.moduleRoles.every(mr => mr.role === 'Super Admin');
      setIsSuperAdmin(allSuperAdmin && user.moduleRoles.length > 0);
    } else {
      setIsSuperAdmin(false);
    }
  }, [user]);

  // Helper function to get user's role for a specific module
  const getUserModuleRole = (moduleId: ModuleType): UserPrivilege | '-' => {
    if (!user.moduleRoles) {
      return '-';
    }
    
    const moduleRole = user.moduleRoles.find(mr => mr.moduleId === moduleId);
    return moduleRole ? moduleRole.role : '-';
  };

  const handleRoleChange = (moduleId: ModuleType) => async (role: UserPrivilege) => {
    try {
      // If role is Super Admin, we need to set it for all modules
      if (role === 'Super Admin') {
        const response = await fetch(`https://92.112.184.210:7182/api/Authentication/AssignServiceRoleToUser/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: 'SuperAdmin'
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to assign Super Admin role');
        }
        
        // Update all modules to Super Admin locally
        const updatedUser = {
          ...user,
          moduleRoles: ['hotels', 'users', 'gallery', 'cms'].map(module => ({
            moduleId: module as ModuleType,
            role: 'Super Admin' as UserPrivilege
          }))
        };
        
        // Call the onUpdateRole prop to update in parent component
        onUpdateRole(user.id, 'Super Admin');
        
        toast({
          title: "Role updated",
          description: `${user.name} is now a Super Admin for all modules`,
        });
        
        setIsSuperAdmin(true);
      } else {
        // Regular role update for a specific module
        onUpdateRole(user.id, role);
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
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
        {user.lastLogin && user.lastLogin.getFullYear() > 1 
          ? format(user.lastLogin, 'MMM dd, yyyy h:mm a') 
          : 'Never'}
      </TableCell>
      
      {/* Module roles dropdowns - only show the 4 specified modules */}
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('hotels')}
          privileges={privileges}
          onRoleChange={handleRoleChange('hotels')}
          isSuperAdmin={isSuperAdmin}
        />
      </TableCell>
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('users')}
          privileges={privileges}
          onRoleChange={handleRoleChange('users')}
          isSuperAdmin={isSuperAdmin}
        />
      </TableCell>
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('gallery')}
          privileges={privileges}
          onRoleChange={handleRoleChange('gallery')}
          isSuperAdmin={isSuperAdmin}
        />
      </TableCell>
      <TableCell className="text-center px-2">
        <UserModuleRoleSelect
          currentRole={getUserModuleRole('cms')}
          privileges={privileges}
          onRoleChange={handleRoleChange('cms')}
          isSuperAdmin={isSuperAdmin}
        />
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
