
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
import { motion } from 'framer-motion';

interface UsersContentProps {
  users: User[];
  userPrivileges: UserPrivilege[];
  isLoading: boolean;
  onSelectUser: (user: User) => void;
  onUpdateRole: (userId: string, role: UserPrivilege) => void;
  onToggleStatus: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onPromoteToSuperAdmin: (userId: string) => void;
}

const UsersContent: React.FC<UsersContentProps> = ({
  users,
  userPrivileges,
  isLoading,
  onSelectUser,
  onUpdateRole,
  onToggleStatus,
  onDeleteUser,
  onPromoteToSuperAdmin
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold tracking-tight">Users</CardTitle>
          <CardDescription className="text-muted-foreground">
            {users.length === 0 
              ? "No users found" 
              : users.length === 1 
                ? "1 user found" 
                : `${users.length} users found`}
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
            onPromoteToSuperAdmin={onPromoteToSuperAdmin}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UsersContent;
