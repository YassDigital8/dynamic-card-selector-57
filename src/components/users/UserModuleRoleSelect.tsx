
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
  currentRole: UserPrivilege;
  privileges: UserPrivilege[];
  onRoleChange: (value: UserPrivilege) => void;
}

const UserModuleRoleSelect: React.FC<UserModuleRoleSelectProps> = ({
  currentRole,
  privileges,
  onRoleChange
}) => {
  // Check if the user is a SuperAdmin
  const isSuperAdmin = currentRole === 'SuperAdmin';
  
  // If the user is a SuperAdmin, show a locked label styled to match dropdown dimensions
  if (isSuperAdmin) {
    return (
      <div className="w-[110px] h-10 flex items-center justify-between rounded-md border border-yellow-500 bg-yellow-50 px-3 text-sm font-medium text-yellow-800">
        <div className="flex items-center">
          <Lock className="mr-2 h-4 w-4 text-yellow-500" />
          <span>SA</span>
        </div>
      </div>
    );
  }
  
  // For normal roles, filter out SuperAdmin and Super Admin from the available privileges
  // as they should only be applied via special promotion
  const availablePrivileges = privileges.filter(role => 
    role !== 'SuperAdmin' && role !== 'Super Admin'
  );
  
  return (
    <Select
      value={currentRole}
      onValueChange={(value: UserPrivilege) => onRoleChange(value)}
    >
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        {availablePrivileges.map((role) => (
          <SelectItem key={role} value={role}>
            <div className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>{role}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserModuleRoleSelect;
