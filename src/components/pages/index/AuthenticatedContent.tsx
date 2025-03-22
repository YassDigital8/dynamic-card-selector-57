import React from 'react';
import { motion } from 'framer-motion';
import SessionTimer from '@/components/auth/SessionTimer';

interface AuthenticatedContentProps {
  userInfo: {
    firstName: string;
    email: string;
    role?: string;
  } | null;
}

const AuthenticatedContent = ({
  userInfo
}: AuthenticatedContentProps) => {
  if (!userInfo) return null;
  
  return (
    <motion.div 
      variants={{
        hidden: {
          opacity: 0,
          y: 20
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 24
          }
        }
      }} 
      className="mb-6"
    >
      {/* Content area for dashboard widgets or other elements */}
    </motion.div>
  );
};

export default AuthenticatedContent;
