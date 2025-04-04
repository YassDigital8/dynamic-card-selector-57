
import React from 'react';
import { Toast } from '@/components/ui/toast';
import { Bell, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { NotificationType } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';

interface NotificationToastProps {
  type: NotificationType;
  title: string;
  message: string;
  onClose: () => void;
}

const iconMap = {
  info: <Info className="h-5 w-5 text-blue-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  success: <CheckCircle className="h-5 w-5 text-green-500" />
};

const backgroundMap = {
  info: 'bg-blue-50 dark:bg-blue-900/20',
  warning: 'bg-amber-50 dark:bg-amber-900/20',
  error: 'bg-red-50 dark:bg-red-900/20',
  success: 'bg-green-50 dark:bg-green-900/20'
};

const NotificationToast: React.FC<NotificationToastProps> = ({ 
  type, 
  title, 
  message, 
  onClose 
}) => {
  return (
    <Toast className={cn("border p-4 z-50", backgroundMap[type])}>
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          {iconMap[type]}
        </div>
        <div className="flex-1">
          <div className="font-medium">{title}</div>
          <div className="text-sm text-muted-foreground">{message}</div>
        </div>
        <button 
          onClick={onClose} 
          className="rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </Toast>
  );
};

export default NotificationToast;
