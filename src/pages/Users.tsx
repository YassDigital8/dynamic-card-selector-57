
import React from 'react';
import { motion } from 'framer-motion';
import UsersPage from '@/components/users/UsersPage';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { Users as UsersIcon } from 'lucide-react';

const Users: React.FC = () => {
  // Define breadcrumb items for the Users page
  const breadcrumbItems = [
    { 
      label: 'Users', 
      icon: UsersIcon 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <BreadcrumbNav items={breadcrumbItems} />
      <UsersPage />
    </motion.div>
  );
};

export default Users;
