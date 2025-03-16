
import { useState, useEffect, useCallback } from 'react';
import { SESSION_DURATION } from '@/types/auth.types';
import { useToast } from '@/hooks/use-toast';

export interface UseAuthSessionProps {
  authToken: string;
  logout: () => void;
}

export const useAuthSession = ({ authToken, logout }: UseAuthSessionProps) => {
  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const { toast } = useToast();

  // Start session timer
  const startSessionTimer = useCallback(() => {
    const expiryTime = Date.now() + SESSION_DURATION;
    setSessionExpiresAt(expiryTime);
    
    // Store session expiry in localStorage
    localStorage.setItem('sessionExpiresAt', expiryTime.toString());
    
    console.log(`Session started, will expire at ${new Date(expiryTime).toLocaleTimeString()}`);
  }, []);
  
  // Reset session timer (e.g., on user activity)
  const resetSessionTimer = useCallback(() => {
    if (authToken) {
      startSessionTimer();
      console.log('Session timer reset due to user activity');
    }
  }, [authToken, startSessionTimer]);
  
  // Handle checking session expiration
  useEffect(() => {
    if (!authToken || !sessionExpiresAt) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = sessionExpiresAt - now;
      
      if (timeLeft <= 0) {
        clearInterval(interval);
        logout();
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
        });
      } else {
        setRemainingTime(timeLeft);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [authToken, sessionExpiresAt, logout, toast]);
  
  // User activity listener
  useEffect(() => {
    if (!authToken) return;
    
    const activityEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    const handleUserActivity = () => resetSessionTimer();
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [authToken, resetSessionTimer]);

  // Initialize the timer on first load
  useEffect(() => {
    if (authToken) {
      const storedExpiryTime = localStorage.getItem('sessionExpiresAt');
      if (storedExpiryTime) {
        const expiryTime = parseInt(storedExpiryTime, 10);
        setSessionExpiresAt(expiryTime);
      } else {
        startSessionTimer();
      }
    }
  }, [authToken, startSessionTimer]);

  return {
    sessionExpiresAt,
    remainingTime,
    startSessionTimer,
    resetSessionTimer
  };
};
