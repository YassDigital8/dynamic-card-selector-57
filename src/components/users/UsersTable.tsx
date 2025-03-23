
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User as UserIcon, 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  Edit, 
  Trash2,
  Hotel,
  Users,
  Image,
  Settings,
  FileText
} from 'lucide-react';
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import { format } from 'date-fns';

interface UsersTableProps {
  users: User[];
  privileges: UserPrivilege[];
  onSelectUser: (user: User) => void;
  onUpdateRole: (userId: string, role: UserPrivilege) => void;
  onToggleStatus: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  isLoading: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  privileges,
  onSelectUser,
  onUpdateRole,
  onToggleStatus,
  onDeleteUser,
  isLoading
}) => {
  // Helper function to get user's role for a specific module
  const getUserModuleRole = (user: User, moduleId: ModuleType): UserPrivilege => {
    if (!user.moduleRoles) {
      return user.role;
    }
    
    const moduleRole = user.moduleRoles.find(mr => mr.moduleId === moduleId);
    return moduleRole ? moduleRole.role : user.role;
  };

  // Function to render role badge with appropriate color
  const renderRoleBadge = (role: UserPrivilege) => {
    let color = "bg-gray-200 text-gray-800";
    
    switch (role) {
      case 'Super Admin':
        color = "bg-red-100 text-red-800";
        break;
      case 'Admin':
        color = "bg-purple-100 text-purple-800";
        break;
      case 'Manager':
        color = "bg-blue-100 text-blue-800";
        break;
      case 'Supervisor':
        color = "bg-green-100 text-green-800";
        break;
      case 'Officer':
        color = "bg-slate-100 text-slate-800";
        break;
    }
    
    return (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${color}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="px-2">
              <div className="flex items-center justify-center">
                <Hotel className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="px-2">
              <div className="flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="px-2">
              <div className="flex items-center justify-center">
                <Image className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="px-2">
              <div className="flex items-center justify-center">
                <Settings className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="px-2">
              <div className="flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={13} className="h-24 text-center">
                Loading users...
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={13} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
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
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value: UserPrivilege) => onUpdateRole(user.id, value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-[140px]">
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
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={user.isActive ? "success" : "destructive"}
                    className="cursor-pointer"
                    onClick={() => onToggleStatus(user.id)}
                  >
                    {user.isActive ? (
                      <><CheckCircle className="mr-1 h-3 w-3" /> Active</>
                    ) : (
                      <><AlertCircle className="mr-1 h-3 w-3" /> Inactive</>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>{user.department || 'N/A'}</TableCell>
                <TableCell>
                  {user.lastLogin ? format(user.lastLogin, 'MMM dd, yyyy') : 'Never'}
                </TableCell>
                
                {/* Module roles */}
                <TableCell className="text-center px-2">
                  {renderRoleBadge(getUserModuleRole(user, 'hotels'))}
                </TableCell>
                <TableCell className="text-center px-2">
                  {renderRoleBadge(getUserModuleRole(user, 'users'))}
                </TableCell>
                <TableCell className="text-center px-2">
                  {renderRoleBadge(getUserModuleRole(user, 'gallery'))}
                </TableCell>
                <TableCell className="text-center px-2">
                  {renderRoleBadge(getUserModuleRole(user, 'settings'))}
                </TableCell>
                <TableCell className="text-center px-2">
                  {renderRoleBadge(getUserModuleRole(user, 'reports'))}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onSelectUser(user)}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => onDeleteUser(user.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
