
import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import useAuthentication from '@/hooks/useAuthentication';

const SessionTimer = () => {
  const { remainingTime, isAuthenticated } = useAuthentication();
  const [formattedTime, setFormattedTime] = useState<string>('');
  
  useEffect(() => {
    if (!remainingTime || !isAuthenticated) {
      setFormattedTime('');
      return;
    }
    
    // Format milliseconds to MM:SS format
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    
    // Format time as MM:SS
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    setFormattedTime(timeString);
  }, [remainingTime, isAuthenticated]);
  
  if (!isAuthenticated || !formattedTime) {
    return null;
  }
  
  // Determine if we're in warning zone (less than 5 min)
  const isWarning = remainingTime && remainingTime < 5 * 60 * 1000;
  
  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5 ${
      isWarning 
        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    }`}>
      <Clock className="h-3 w-3" />
      <span>Session: {formattedTime}</span>
    </div>
  );
};

export default SessionTimer;
