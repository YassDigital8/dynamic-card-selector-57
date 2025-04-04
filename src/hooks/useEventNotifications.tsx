
import { useState, useEffect } from 'react';
import { useNotificationManager } from '@/hooks/useNotificationManager';

export const useEventNotifications = () => {
  const notifications = useNotificationManager();
  
  // Example function to notify when a new event is added
  const notifyEventAdded = (eventName: string) => {
    notifications.success(
      'Event Added Successfully',
      `"${eventName}" has been added to the events calendar.`
    );
  };
  
  // Example function to notify when an event is approaching
  const notifyUpcomingEvent = (eventName: string, daysUntil: number) => {
    notifications.info(
      'Upcoming Event',
      `"${eventName}" is coming up in ${daysUntil} days.`,
      { showToast: true, autoHide: false }
    );
  };
  
  // Example function to notify when an event is at capacity
  const notifyEventCapacity = (eventName: string) => {
    notifications.warning(
      'Event Reaching Capacity',
      `"${eventName}" is at 90% capacity.`
    );
  };
  
  // Example function to notify when there's an error with an event
  const notifyEventError = (eventName: string, errorMessage: string) => {
    notifications.error(
      'Event Error',
      `Problem with "${eventName}": ${errorMessage}`
    );
  };
  
  return {
    notifyEventAdded,
    notifyUpcomingEvent,
    notifyEventCapacity,
    notifyEventError
  };
};
