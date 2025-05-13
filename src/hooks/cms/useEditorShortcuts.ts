
import { useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface EditorShortcutsProps {
  onSave: () => boolean;
  onPublish: () => void;
  onPreview?: () => void;
  onEscape?: () => void;
}

export function useEditorShortcuts({
  onSave,
  onPublish,
  onPreview,
  onEscape
}: EditorShortcutsProps) {
  const { toast } = useToast();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Check if target is an input or textarea to avoid capturing when typing
    const target = event.target as HTMLElement;
    const isEditingText = target.tagName === 'INPUT' || 
                          target.tagName === 'TEXTAREA' || 
                          target.contentEditable === 'true';
    
    // Save - Ctrl+S or Command+S
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault(); // Prevent browser save dialog
      const success = onSave();
      
      toast({
        title: success ? "Page saved" : "Save failed",
        description: success 
          ? "Your changes have been saved" 
          : "There was a problem saving your changes",
        variant: success ? "default" : "destructive",
      });
    }
    
    // Publish - Ctrl+Shift+P or Command+Shift+P
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'p') {
      event.preventDefault();
      onPublish();
      toast({
        title: "Publishing page",
        description: "Your page is being published",
      });
    }
    
    // Preview - Ctrl+P or Command+P
    if ((event.ctrlKey || event.metaKey) && !event.shiftKey && event.key === 'p' && onPreview) {
      event.preventDefault();
      onPreview();
    }

    // Escape key - exit focused component or return to component list
    if (event.key === 'Escape' && onEscape && !isEditingText) {
      onEscape();
    }
  }, [onSave, onPublish, onPreview, onEscape, toast]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Return information about available shortcuts for display purposes
  return {
    shortcuts: [
      { key: 'Ctrl+S', action: 'Save page' },
      { key: 'Ctrl+Shift+P', action: 'Publish page' },
      ...(onPreview ? [{ key: 'Ctrl+P', action: 'Preview page' }] : []),
      ...(onEscape ? [{ key: 'Esc', action: 'Exit editing mode' }] : []),
    ]
  };
}
