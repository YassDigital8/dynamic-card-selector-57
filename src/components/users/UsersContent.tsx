
import React from 'react';
import { motion } from 'framer-motion';
import UsersTable from './UsersTable';
import { User, UserPrivilege, ModuleType } from '@/types/user.types';

interface UsersContentProps {
  users: User[];
  userPrivileges: UserPrivilege[];
  isLoading: boolean;
  onSelectUser: (user: User) => void;
  onUpdateRole: (userId: string, role: UserPrivilege) => void;
  onUpdateModuleRole: (userId: string, moduleId: ModuleType, role: UserPrivilege) => void;
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
  onUpdateModuleRole,
  onToggleStatus,
  onDeleteUser,
  onPromoteToSuperAdmin
}) => {
  return (
    <motion.div 
      className="w-full overflow-hidden" 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <UsersTable 
        users={users}
        privileges={userPrivileges}
        isLoading={isLoading}
        onSelectUser={onSelectUser}
        onUpdateRole={onUpdateRole}
        onUpdateModuleRole={onUpdateModuleRole}
        onToggleStatus={onToggleStatus}
        onDeleteUser={onDeleteUser}
        onPromoteToSuperAdmin={onPromoteToSuperAdmin}
      />
    </motion.div>
  );
};

export default UsersContent;
