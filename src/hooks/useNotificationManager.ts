
import { useNotificationContext } from '@/providers/NotificationProvider';
import { useToast } from '@/hooks/use-toast';
import { Notification, NotificationType } from '@/hooks/useNotifications';

export function useNotificationManager() {
  const { addNotification, markAsRead, removeNotification, notifications, unreadCount } = useNotificationContext();
  const { toast } = useToast();
  
  /**
   * Send a notification with optional toast display
   */
  const sendNotification = (
    title: string, 
    message: string, 
    type: NotificationType = 'info', 
    options = { showToast: true, autoHide: true }
  ) => {
    // Add to notification center
    const id = addNotification(title, message, type, options.showToast);
    
    // Return functions to manipulate this notification
    return {
      id,
      markAsRead: () => markAsRead(id),
      remove: () => removeNotification(id)
    };
  };
  
  // Convenience methods for different notification types
  const info = (title: string, message: string, options = { showToast: true, autoHide: true }) => 
    sendNotification(title, message, 'info', options);
    
  const success = (title: string, message: string, options = { showToast: true, autoHide: true }) => 
    sendNotification(title, message, 'success', options);
    
  const warning = (title: string, message: string, options = { showToast: true, autoHide: true }) => 
    sendNotification(title, message, 'warning', options);
    
  const error = (title: string, message: string, options = { showToast: true, autoHide: true }) => 
    sendNotification(title, message, 'error', options);
  
  return {
    sendNotification,
    info,
    success,
    warning,
    error,
    notifications,
    unreadCount
  };
}
