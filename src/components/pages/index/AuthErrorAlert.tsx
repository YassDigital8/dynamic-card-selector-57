
import React from 'react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface AuthErrorAlertProps {
  error: string | null;
}

const AuthErrorAlert = ({ error }: AuthErrorAlertProps) => {
  if (!error) return null;
  
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
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Issue</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};

export default AuthErrorAlert;
