
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

const AuthenticatedContent = ({
  userInfo
}: AuthenticatedContentProps) => {
  const {
    demoMode
  } = useDemoMode();
  
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
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Welcome, {userInfo.firstName}</span>
            <ApiStatusIndicator isLive={!demoMode} userRole={userInfo.role} />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Role: {userInfo.role || 'User'}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SessionTimer />
          <LogoutButton />
        </div>
      </div>
    </motion.div>
  );
};

export default AuthenticatedContent;
