
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User as UserType, UserPrivilege, ModulePermission, ModuleRole } from '@/types/user.types';
import { User, Shield, LockKeyhole, Folder, Settings, Image, FileText, Hotel } from 'lucide-react';

interface ModulePermissionsProps {
  modules: ModulePermission[];
  selectedUser: UserType | null;
  userPrivileges: UserPrivilege[];
  onUpdateModuleRole: (userId: string, moduleId: ModuleType, role: UserPrivilege) => void;
}

const ModulePermissions: React.FC<ModulePermissionsProps> = ({
  modules,
  selectedUser,
  userPrivileges,
  onUpdateModuleRole,
}) => {
  if (!selectedUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Module Permissions</CardTitle>
          <CardDescription>
            Select a user to manage their module permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8 text-muted-foreground">
          No user selected. Click on a user to manage their permissions.
        </CardContent>
      </Card>
    );
  }

  // Function to get the user's role for a specific module
  const getUserModuleRole = (moduleId: ModuleType): UserPrivilege => {
    if (!selectedUser.moduleRoles) {
      return selectedUser.role;
    }
    
    const moduleRole = selectedUser.moduleRoles.find(mr => mr.moduleId === moduleId);
    return moduleRole ? moduleRole.role : selectedUser.role;
  };

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'hotels':
        return <Hotel className="h-5 w-5 text-blue-500" />;
      case 'users':
        return <User className="h-5 w-5 text-purple-500" />;
      case 'gallery':
        return <Image className="h-5 w-5 text-green-500" />;
      case 'settings':
        return <Settings className="h-5 w-5 text-orange-500" />;
      case 'reports':
        return <FileText className="h-5 w-5 text-indigo-500" />;
      default:
        return <Folder className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRoleIcon = (role: UserPrivilege) => {
    switch (role) {
      case 'Super Admin':
        return <LockKeyhole className="h-6 w-6 text-red-500" />;
      case 'Admin':
        return <Shield className="h-6 w-6 text-purple-500" />;
      case 'Manager':
        return <Shield className="h-6 w-6 text-blue-500" />;
      case 'Supervisor':
        return <Shield className="h-6 w-6 text-green-500" />;
      case 'Officer':
        return <User className="h-6 w-6 text-gray-500" />;
      default:
        return <User className="h-6 w-6" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          {getRoleIcon(selectedUser.role)}
          <div>
            <CardTitle>{selectedUser.name}'s Module Permissions</CardTitle>
            <CardDescription>
              Manage user's role for each module
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {modules.map((module) => {
            const currentRole = getUserModuleRole(module.id);
            
            return (
              <div
                key={module.id}
                className="flex items-center space-x-4 rounded-md border p-4"
              >
                <div className="flex-1 space-y-1 flex items-center">
                  {getModuleIcon(module.id)}
                  <div className="ml-3 flex-grow">
                    <Label
                      htmlFor={`module-${module.id}`}
                      className="text-sm font-medium leading-none"
                    >
                      {module.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                  <Select
                    value={currentRole}
                    onValueChange={(value: UserPrivilege) => 
                      onUpdateModuleRole(selectedUser.id, module.id, value)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {userPrivileges.map((role) => (
                        <SelectItem key={role} value={role}>
                          <div className="flex items-center">
                            {getRoleIcon(role)}
                            <span className="ml-2">{role}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulePermissions;
