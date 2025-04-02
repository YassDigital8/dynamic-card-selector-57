
import { format } from 'date-fns';

/**
 * Parse an event date string into start and end dates
 */
export function parseEventDate(dateString: string): { 
  startDate?: Date; 
  endDate?: Date; 
  displayValue: string 
} {
  const result = { 
    startDate: undefined as Date | undefined, 
    endDate: undefined as Date | undefined, 
    displayValue: dateString 
  };
  
  try {
    if (dateString.includes('-')) {
      const [start, end] = dateString.split('-').map(d => d.trim());
      result.startDate = new Date(start);
      result.endDate = new Date(end);
    } else {
      result.startDate = new Date(dateString);
    }
  } catch (e) {
    console.error("Error parsing date:", e);
  }
  
  return result;
}

/**
 * Format event dates into a display string
 */
export function formatEventDates(
  start?: Date, 
  end?: Date, 
  startTime?: string, 
  endTime?: string, 
  hasTime?: boolean
): string {
  if (!start) return '';
  
  let formattedDate = '';
  
  if (end) {
    formattedDate = `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  } else {
    formattedDate = format(start, 'MMM d, yyyy');
  }
  
  // Add time information if available
  if (hasTime && startTime) {
    formattedDate += ` at ${startTime}`;
    if (endTime) {
      formattedDate += ` - ${endTime}`;
    }
  }
  
  return formattedDate;
}
