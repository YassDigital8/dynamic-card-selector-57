
import React from 'react';
import { motion } from 'framer-motion';
import UsersPage from '@/components/users/UsersPage';

const Users: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <UsersPage />
    </motion.div>
  );
};

export default Users;
