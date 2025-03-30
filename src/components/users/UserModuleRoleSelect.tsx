
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPrivilege } from '@/types/user.types';

interface UserModuleRoleSelectProps {
  currentRole: UserPrivilege;
  privileges: UserPrivilege[];
  onRoleChange: (role: UserPrivilege) => void;
  compact?: boolean;
}

const UserModuleRoleSelect: React.FC<UserModuleRoleSelectProps> = ({
  currentRole,
  privileges,
  onRoleChange,
  compact = false
}) => {
  if (currentRole === 'SuperAdmin') {
    return (
      <div className={`text-xs ${compact ? 'py-0.5 px-1' : 'py-1 px-2'} bg-amber-500 text-white rounded`}>
        {compact ? 'SA' : 'Super Admin'}
      </div>
    );
  }

  return (
    <Select 
      value={currentRole} 
      onValueChange={(value) => onRoleChange(value as UserPrivilege)}
    >
      <SelectTrigger 
        className={compact ? 
          "h-6 w-12 text-[10px] py-0 px-1" : 
          "h-8 w-24 text-xs py-1 px-2"
        }
      >
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        {privileges.map((privilege) => (
          <SelectItem 
            key={privilege} 
            value={privilege}
            className="text-xs"
          >
            {privilege}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserModuleRoleSelect;
