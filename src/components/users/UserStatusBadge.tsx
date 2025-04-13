
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Lock, Archive } from 'lucide-react';

interface UserStatusBadgeProps {
  isActive: boolean;
  status?: string; // Added to support API status strings
  onToggle: () => void;
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ isActive, status, onToggle }) => {
  // Determine badge variant and content based on status
  const getBadgeContent = () => {
    // Check for status string first (from API)
    if (status) {
      const statusLower = status.toLowerCase();
      
      if (statusLower === 'deleted') {
        return {
          variant: "destructive" as const,
          icon: <Archive className="mr-1 h-3 w-3" />,
          label: "Deleted"
        };
      }
      
      if (statusLower === 'frozen') {
        return {
          variant: "warning" as const,
          icon: <AlertCircle className="mr-1 h-3 w-3" />,
          label: "Frozen"
        };
      }
      
      if (statusLower === 'locked') {
        return {
          variant: "secondary" as const,
          icon: <Lock className="mr-1 h-3 w-3" />,
          label: "Locked"
        };
      }
    }
    
    // Fall back to active/inactive if no specific status
    return isActive 
      ? {
          variant: "success" as const,
          icon: <CheckCircle className="mr-1 h-3 w-3" />,
          label: "Active"
        }
      : {
          variant: "destructive" as const,
          icon: <AlertCircle className="mr-1 h-3 w-3" />,
          label: "Inactive"
        };
  };

  const { variant, icon, label } = getBadgeContent();

  return (
    <Badge 
      variant={variant}
      className="cursor-pointer"
      onClick={onToggle}
    >
      {icon} {label}
    </Badge>
  );
};

export default UserStatusBadge;
