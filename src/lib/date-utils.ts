
import { format, parseISO } from 'date-fns';

/**
 * Format a date string to a readable format
 * @param dateString ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format a date string to include time
 * @param dateString ISO date string
 * @returns Formatted date and time string
 */
export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy h:mm a');
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return dateString;
  }
};

/**
 * Format time from 24-hour format to 12-hour format
 * @param time Time string in 24-hour format (HH:MM)
 * @returns Formatted time string in 12-hour format (h:MM AM/PM)
 */
export const formatTime = (time: string): string => {
  if (!time) return '';
  
  try {
    // Create a date object with today's date and the time
    const date = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    date.setHours(hours);
    date.setMinutes(minutes);
    
    return format(date, 'h:mm a');
  } catch (error) {
    console.error('Error formatting time:', error);
    return time;
  }
};
