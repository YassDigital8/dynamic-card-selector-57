
import React from 'react';
import { motion } from 'framer-motion';
import UsersTable from './UsersTable';
import UsersPagination from './UsersPagination';
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import { Card } from '@/components/ui/card';

interface UsersContentProps {
  users: User[];
  userPrivileges: UserPrivilege[];
  isLoading: boolean;
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
  onUpdateRole: (userId: string, role: UserPrivilege) => void;
  onUpdateModuleRole: (userId: string, moduleId: ModuleType, role: UserPrivilege) => void;
  onToggleStatus: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onPromoteToSuperAdmin: (userId: string) => void;
  pagination: {
    currentPage: number;
    totalPages: number;
    changePage: (page: number) => void;
  };
}

const UsersContent: React.FC<UsersContentProps> = ({
  users,
  userPrivileges,
  isLoading,
  selectedUser,
  onSelectUser,
  onUpdateRole,
  onUpdateModuleRole,
  onToggleStatus,
  onDeleteUser,
  onPromoteToSuperAdmin,
  pagination
}) => {
  return (
    <motion.div 
      className="w-full" 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-0 overflow-hidden">
        <UsersTable 
          users={users}
          privileges={userPrivileges}
          isLoading={isLoading}
          selectedUser={selectedUser}
          onSelectUser={onSelectUser}
          onUpdateRole={onUpdateRole}
          onUpdateModuleRole={onUpdateModuleRole}
          onToggleStatus={onToggleStatus}
          onDeleteUser={onDeleteUser}
          onPromoteToSuperAdmin={onPromoteToSuperAdmin}
        />
      </Card>
      
      <UsersPagination 
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={pagination.changePage}
      />
    </motion.div>
  );
};

export default UsersContent;
