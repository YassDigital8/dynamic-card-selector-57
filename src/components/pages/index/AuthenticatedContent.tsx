
import React from 'react';
import { motion } from 'framer-motion';
import LogoutButton from '@/components/auth/LogoutButton';
import SessionTimer from '@/components/auth/SessionTimer';
import ApiStatusIndicator from '@/components/ui/api-status-indicator';
import { useDemoMode } from '@/hooks/useDemoMode';

interface AuthenticatedContentProps {
  userInfo: {
    firstName: string;
    email: string;
    role?: string;
  } | null;
}

const AuthenticatedContent = ({ userInfo }: AuthenticatedContentProps) => {
  const { demoMode } = useDemoMode();
  
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
      <div className="flex justify-between items-center w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">Welcome, {userInfo.firstName || userInfo.email}</p>
            <ApiStatusIndicator 
              isLive={!demoMode} 
              userRole={userInfo.role} 
              className="ml-2"
            />
            <SessionTimer />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You are logged in and can access all page navigation features. Your session will expire after 1 hour of inactivity.
          </p>
        </div>
        <LogoutButton variant="outline" className="ml-4 text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/30" />
      </div>
    </motion.div>
  );
};

export default AuthenticatedContent;
