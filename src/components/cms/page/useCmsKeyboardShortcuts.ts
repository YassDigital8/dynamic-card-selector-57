
import { useEffect } from 'react';

interface UseCmsKeyboardShortcutsProps {
  setCommandOpen: (open: boolean) => void;
}

export const useCmsKeyboardShortcuts = ({ setCommandOpen }: UseCmsKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command dialog when "/" is pressed
      if (e.key === '/') {
        // Prevent the key from being typed in input fields
        if (
          e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement ||
          (e.target instanceof HTMLElement && e.target.isContentEditable)
        ) {
          return;
        }
        
        // Prevent default behavior
        e.preventDefault();
        // Open command dialog
        setCommandOpen(true);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setCommandOpen]);
};
