
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { JobApplication } from '@/models/ApplicationModel';

interface ApplicationStatusBadgeProps {
  status: JobApplication['status'];
}

const ApplicationStatusBadge: React.FC<ApplicationStatusBadgeProps> = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'Pending':
        return { variant: 'secondary' as const };
      case 'Reviewed':
        return { variant: 'outline' as const };
      case 'Interviewed':
        return { variant: 'default' as const, className: 'bg-blue-500 hover:bg-blue-600' };
      case 'Offered':
        return { variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600' };
      case 'Hired':
        return { variant: 'default' as const, className: 'bg-purple-500 hover:bg-purple-600' };
      case 'Rejected':
        return { variant: 'destructive' as const };
      default:
        return { variant: 'default' as const };
    }
  };

  const { variant, className } = getStatusStyle();

  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
};

export default ApplicationStatusBadge;
