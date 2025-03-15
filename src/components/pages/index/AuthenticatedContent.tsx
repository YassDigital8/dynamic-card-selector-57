
import React from 'react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
      <Alert className="bg-blue-50 border-blue-100">
        <AlertTitle className="text-blue-800">Welcome, {userInfo.firstName || userInfo.email}</AlertTitle>
        <AlertDescription className="text-blue-600">
          You are logged in and can access all page navigation features.
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};

export default AuthenticatedContent;
