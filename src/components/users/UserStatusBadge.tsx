
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface UserStatusBadgeProps {
  isActive: boolean;
  onToggle: () => void;
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ isActive, onToggle }) => {
  return (
    <Badge 
      variant={isActive ? "success" : "destructive"}
      className="cursor-pointer"
      onClick={onToggle}
    >
      {isActive ? (
        <><CheckCircle className="mr-1 h-3 w-3" /> Active</>
      ) : (
        <><AlertCircle className="mr-1 h-3 w-3" /> Inactive</>
      )}
    </Badge>
  );
};

export default UserStatusBadge;
