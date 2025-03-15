
import React from 'react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LogoutButton from '@/components/auth/LogoutButton';

interface AuthenticatedContentProps {
  userInfo: {
    firstName: string;
    email: string;
  } | null;
}

const AuthenticatedContent = ({ userInfo }: AuthenticatedContentProps) => {
  if (!userInfo) return null;
  
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 24 
        }
      }
    }} className="mb-6">
      <Alert className="bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
        <div className="flex justify-between items-center w-full">
          <div>
            <AlertTitle className="text-blue-800 dark:text-blue-300">Welcome, {userInfo.firstName || userInfo.email}</AlertTitle>
            <AlertDescription className="text-blue-600 dark:text-blue-400">
              You are logged in and can access all page navigation features.
            </AlertDescription>
          </div>
          <LogoutButton variant="outline" className="ml-4 border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30" />
        </div>
      </Alert>
    </motion.div>
  );
};

export default AuthenticatedContent;
