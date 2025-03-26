
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Shield } from 'lucide-react';
import { UserPrivilege } from '@/types/user.types';

interface UserModuleRoleSelectProps {
  currentRole: UserPrivilege | null;
  privileges: UserPrivilege[];
  onRoleChange: (value: UserPrivilege) => void;
}

const UserModuleRoleSelect: React.FC<UserModuleRoleSelectProps> = ({
  currentRole,
  privileges,
  onRoleChange
}) => {
  if (currentRole === null) {
    return (
      <div className="text-gray-400 text-sm text-center">
        —
      </div>
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
