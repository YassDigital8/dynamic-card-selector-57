
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Shield, Lock } from 'lucide-react';
import { UserPrivilege } from '@/types/user.types';

interface UserModuleRoleSelectProps {
  currentRole: UserPrivilege | '-';
  privileges: UserPrivilege[];
  onRoleChange: (value: UserPrivilege) => void;
  isSuperAdmin?: boolean;
}

const UserModuleRoleSelect: React.FC<UserModuleRoleSelectProps> = ({
  currentRole,
  privileges,
  onRoleChange,
  isSuperAdmin = false
}) => {
  if (isSuperAdmin) {
    // If user is super admin, show locked select with Super Admin value
    return (
      <div className="flex items-center justify-center">
        <div className="flex items-center text-red-600 font-semibold">
          <Lock className="mr-1 h-3 w-3" />
          <span>Super Admin</span>
        </div>
      </div>
    );
  }

  // For users with no role assigned ('-'), show a disabled select with a dash
  if (currentRole === '-') {
    return (
      <Select disabled>
        <SelectTrigger className="w-[110px]">
          <SelectValue>
            <span className="text-gray-500">-</span>
          </SelectValue>
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select
      value={currentRole}
      onValueChange={(value: UserPrivilege) => onRoleChange(value)}
    >
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        {privileges.map((role) => (
          <SelectItem key={role} value={role}>
            <div className="flex items-center">
              <Shield className={`mr-2 h-4 w-4 ${role === 'Super Admin' ? 'text-red-500' : ''}`} />
              <span>{role}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserModuleRoleSelect;
