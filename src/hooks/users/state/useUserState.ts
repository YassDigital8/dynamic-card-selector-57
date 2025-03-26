
import { useState } from 'react';
import { User } from '@/types/user.types';

export const useUserState = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    isLoading,
    setIsLoading
  };
};
