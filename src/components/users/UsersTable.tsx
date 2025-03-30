
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import UsersTableHeader from './UsersTableHeader';
import UserTableRow from './UserTableRow';
import { useIsMobile } from '@/hooks/use-mobile';

interface UsersTableProps {
  users: User[];
  privileges: UserPrivilege[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
  onUpdateRole: (userId: string, role: UserPrivilege) => void;
  onUpdateModuleRole: (userId: string, moduleId: ModuleType, role: UserPrivilege) => void;
  onToggleStatus: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onPromoteToSuperAdmin: (userId: string) => void;
  isLoading: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  privileges,
  selectedUser,
  onSelectUser,
  onUpdateRole,
  onUpdateModuleRole,
  onToggleStatus,
  onDeleteUser,
  onPromoteToSuperAdmin,
  isLoading
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="rounded-md border w-full overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <UsersTableHeader />
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={isMobile ? 5 : 7} className="h-24 text-center">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isMobile ? 5 : 7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  isSelected={selectedUser?.id === user.id}
                  privileges={privileges}
                  onSelectUser={onSelectUser}
                  onUpdateRole={onUpdateRole}
                  onUpdateModuleRole={onUpdateModuleRole}
                  onToggleStatus={onToggleStatus}
                  onPromoteToSuperAdmin={onPromoteToSuperAdmin}
                  onDeleteUser={onDeleteUser}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;
