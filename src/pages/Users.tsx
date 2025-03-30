
import React from 'react';
import { motion } from 'framer-motion';
import UsersPage from '@/components/users/UsersPage';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { Users as UsersIcon } from 'lucide-react';
import StandardLayout from '@/components/layout/StandardLayout';

const Users: React.FC = () => {
  // Define breadcrumb items for the Users page
  const breadcrumbItems = [
    { 
      label: 'Users', 
      icon: UsersIcon 
    }
  ];

  return (
    <StandardLayout>
      <div className="container-fluid w-full mx-auto px-0 py-6">
        <BreadcrumbNav items={breadcrumbItems} />
        <UsersPage />
      </div>
    </StandardLayout>
  );
};

export default Users;
