
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useNotificationContext } from '@/providers/NotificationProvider';

const getNotificationDot = (type: 'info' | 'warning' | 'error' | 'success') => {
  const colors = {
    info: 'bg-blue-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    success: 'bg-green-500'
  };
  
  return <span className={cn('h-2 w-2 rounded-full', colors[type])} />;
};

const formatNotificationTime = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  return date.toLocaleDateString();
};

const NotificationsPopover: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearAllNotifications 
  } = useNotificationContext();
  
  const handleNotificationClick = (notification: any) => {
    // Mark as read
    markAsRead(notification.id);
    
    // Show detailed view
    setSelectedNotification(notification);
  };
  
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="flex items-center justify-between border-b p-3">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex gap-1">
              {notifications.length > 0 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={markAllAsRead}
                  >
                    Mark all read
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={clearAllNotifications}
                  >
                    Clear all
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <ScrollArea className="h-[300px]">
            {notifications.length === 0 ? (
              <div className="flex h-24 items-center justify-center text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 p-3 hover:bg-muted/50 transition-colors",
                      !notification.read && "bg-muted/30"
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="pt-1">
                      {getNotificationDot(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatNotificationTime(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
      
      {/* Detailed notification dialog */}
      <Dialog open={!!selectedNotification} onOpenChange={(open) => !open && setSelectedNotification(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedNotification?.title}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {selectedNotification && formatNotificationTime(selectedNotification.timestamp)}
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <p className="text-sm">{selectedNotification?.message}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationsPopover;
