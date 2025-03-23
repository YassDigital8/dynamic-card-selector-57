
import React from 'react';
import { motion } from 'framer-motion';
import UsersPage from '@/components/users/UsersPage';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { Users as UsersIcon } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';

const Users: React.FC = () => {
  // Define breadcrumb items for the Users page
  const breadcrumbItems = [
    { 
      label: 'Users', 
      icon: UsersIcon 
    }
  ];

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 md:p-8"
      >
        <BreadcrumbNav items={breadcrumbItems} />
        <UsersPage />
      </motion.div>
    </AdminLayout>
  );
};

export default Users;
