
import React from 'react';
import { 
  Alert, 
  AlertTitle, 
  AlertDescription 
} from '@/components/ui/alert';
import { 
  Bell, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import { NotificationType } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';

interface NotificationAlertProps {
  title: string;
  description: string;
  type?: NotificationType;
  className?: string;
}

const iconMap = {
  info: <Info className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  error: <XCircle className="h-4 w-4" />,
  success: <CheckCircle className="h-4 w-4" />
};

const NotificationAlert: React.FC<NotificationAlertProps> = ({
  title,
  description,
  type = 'info',
  className
}) => {
  return (
    <Alert variant={type as any} className={cn("my-4", className)}>
      {iconMap[type]}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default NotificationAlert;
