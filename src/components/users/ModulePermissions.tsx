
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { UserPrivilege, ModulePermission } from '@/types/user.types';
import { User, Shield, LockKeyhole, Folder, Settings, Image, FileText, Hotel } from 'lucide-react';

interface ModulePermissionsProps {
  modules: ModulePermission[];
  selectedRole: UserPrivilege;
}

const ModulePermissions: React.FC<ModulePermissionsProps> = ({
  modules,
  selectedRole,
}) => {
  // Function to determine if a role has access to a module
  const hasAccess = (module: ModulePermission, role: UserPrivilege): boolean => {
    return module.allowedRoles.includes(role);
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
          {getRoleIcon(selectedRole)}
          <div>
            <CardTitle>{selectedRole} Permissions</CardTitle>
            <CardDescription>
              Module access for {selectedRole} role
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className="flex items-center space-x-4 rounded-md border p-4"
            >
              <Checkbox
                id={`module-${module.id}`}
                checked={hasAccess(module, selectedRole)}
                disabled
              />
              <div className="flex-1 space-y-1 flex items-center">
                {getModuleIcon(module.id)}
                <div className="ml-3">
                  <Label
                    htmlFor={`module-${module.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {module.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulePermissions;
