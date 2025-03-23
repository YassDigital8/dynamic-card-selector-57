
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { User, UserPrivilege } from '@/types/user.types';
import UsersTableHeader from './UsersTableHeader';
import UserTableRow from './UserTableRow';

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
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <UsersTableHeader />
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={11} className="h-24 text-center">
                Loading users...
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                privileges={privileges}
                onSelectUser={onSelectUser}
                onUpdateRole={onUpdateRole}
                onToggleStatus={onToggleStatus}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
