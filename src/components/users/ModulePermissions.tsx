
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
import { UserPrivilege } from '@/types/user.types';
import { User, Shield, LockKeyhole } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  description: string;
}

interface ModulePermissionsProps {
  modules: Module[];
  selectedRole: UserPrivilege;
}

const ModulePermissions: React.FC<ModulePermissionsProps> = ({
  modules,
  selectedRole,
}) => {
  // Function to determine if a role has access to a module
  const hasAccess = (moduleId: string, role: UserPrivilege): boolean => {
    // Super Admin has access to everything
    if (role === 'Super Admin') return true;
    
    // Admin has access to everything except user management
    if (role === 'Admin') {
      return moduleId !== 'users';
    }
    
    // Manager has access to most modules except users and settings
    if (role === 'Manager') {
      return !['users', 'settings'].includes(moduleId);
    }
    
    // Supervisor has limited access
    if (role === 'Supervisor') {
      return ['hotels', 'gallery', 'reports'].includes(moduleId);
    }
    
    // Officer has minimal access
    if (role === 'Officer') {
      return ['hotels', 'gallery'].includes(moduleId);
    }
    
    return false;
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
                checked={hasAccess(module.id, selectedRole)}
                disabled
              />
              <div className="flex-1 space-y-1">
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulePermissions;
