
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import UsersTable from './UsersTable';
import { User, UserPrivilege } from '@/types/user.types';

interface UsersContentProps {
  users: User[];
  userPrivileges: UserPrivilege[];
  isLoading: boolean;
  onSelectUser: (user: User) => void;
  onUpdateRole: (userId: string, role: UserPrivilege) => void;
  onToggleStatus: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

const UsersContent: React.FC<UsersContentProps> = ({
  users,
  userPrivileges,
  isLoading,
  onSelectUser,
  onUpdateRole,
  onToggleStatus,
  onDeleteUser
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          View and manage all system users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTable
          users={users}
          privileges={userPrivileges}
          onSelectUser={onSelectUser}
          onUpdateRole={onUpdateRole}
          onToggleStatus={onToggleStatus}
          onDeleteUser={onDeleteUser}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default UsersContent;
