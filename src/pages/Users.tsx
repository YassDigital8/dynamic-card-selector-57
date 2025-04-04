
import React from 'react';
import { motion } from 'framer-motion';
import UsersPage from '@/components/users/UsersPage';
import StandardLayout from '@/components/layout/StandardLayout';

const Users: React.FC = () => {
  return (
    <StandardLayout
      pageTitle="Users"
      pageDescription="Manage user accounts and permissions"
    >
      <div className="container-fluid w-full mx-auto px-0 py-6">
        <UsersPage />
      </div>
    </StandardLayout>
  );
};

export default Users;
