
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BellRing } from 'lucide-react';
import { usePageApprovals } from '@/hooks/usePageApprovals';

interface PendingApprovalBadgeProps {
  className?: string;
}

const PendingApprovalBadge: React.FC<PendingApprovalBadgeProps> = ({ className }) => {
  const { pendingApprovals } = usePageApprovals();
  
  if (!pendingApprovals.length) return null;
  
  return (
    <div className={`relative inline-flex ${className}`}>
      <BellRing className="h-5 w-5" />
      <Badge 
        variant="destructive" 
        className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center text-xs rounded-full"
      >
        {pendingApprovals.length}
      </Badge>
    </div>
  );
};

export default PendingApprovalBadge;
