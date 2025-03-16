
import { useState, useRef, useEffect } from 'react';
import { FileInfo } from '@/models/FileModel';

// Global state to track dragging status
const globalDragState = {
  isDragging: false,
  draggedItem: null as any,
  cursorPosition: { x: 0, y: 0 },
  subscribers: new Set<(isDragging: boolean, item: any, position: {x: number, y: number}) => void>(),
  setDragState: (isDragging: boolean, item: any, position = { x: 0, y: 0 }) => {
    globalDragState.isDragging = isDragging;
    globalDragState.draggedItem = item;
    globalDragState.cursorPosition = position;
    globalDragState.subscribers.forEach(fn => fn(isDragging, item, position));
  },
  updateCursorPosition: (x: number, y: number) => {
    globalDragState.cursorPosition = { x, y };
    if (globalDragState.isDragging) {
      globalDragState.subscribers.forEach(fn => 
        fn(globalDragState.isDragging, globalDragState.draggedItem, { x, y })
      );
    }
  },
  resetDragState: () => {
    globalDragState.setDragState(false, null);
  }
};

// Track cursor movement globally
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    globalDragState.updateCursorPosition(e.clientX, e.clientY);
  });
}

// Subscribe to global drag state changes
export function useGlobalDragState() {
  const [isDragging, setIsDragging] = useState(globalDragState.isDragging);
  const [draggedItem, setDraggedItem] = useState(globalDragState.draggedItem);
  const [cursorPosition, setCursorPosition] = useState(globalDragState.cursorPosition);

  useEffect(() => {
    const handleChange = (newIsDragging: boolean, newItem: any, newPosition: {x: number, y: number}) => {
      setIsDragging(newIsDragging);
      setDraggedItem(newItem);
      setCursorPosition(newPosition);
    };

    globalDragState.subscribers.add(handleChange);
    
    // Set initial state
    handleChange(
      globalDragState.isDragging, 
      globalDragState.draggedItem, 
      globalDragState.cursorPosition
    );
    
    return () => {
      globalDragState.subscribers.delete(handleChange);
    };
  }, []);

  return { 
    isDragging, 
    draggedItem,
    cursorPosition,
    resetDragState: globalDragState.resetDragState 
  };
}

export function useDrag<T>(item: T) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = dragRef.current;
    if (!element) return;

    const handleDragStart = (e: DragEvent) => {
      setIsDragging(true);
      
      // Update global drag state with current cursor position
      globalDragState.setDragState(true, item, {
        x: e.clientX,
        y: e.clientY
      });
      
      if (e.dataTransfer) {
        e.dataTransfer.setData('application/json', JSON.stringify(item));
        e.dataTransfer.effectAllowed = 'move';
        
        // Use a transparent image as drag image to hide the browser's default drag image
        const transparentImg = new Image();
        transparentImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        e.dataTransfer.setDragImage(transparentImg, 0, 0);
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      globalDragState.resetDragState();
    };

    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);

    return () => {
      element.removeEventListener('dragstart', handleDragStart);
      element.removeEventListener('dragend', handleDragEnd);
    };
  }, [item]);

  return { dragRef, isDragging };
}

export function useDrop<T>(onDrop: (item: T) => void) {
  const [isOver, setIsOver] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = dropRef.current;
    if (!element) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
      }
      setIsOver(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOver(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOver(false);

      if (e.dataTransfer) {
        try {
          const data = e.dataTransfer.getData('application/json');
          const item = JSON.parse(data) as T;
          onDrop(item);
          
          // Reset global drag state after a successful drop
          globalDragState.resetDragState();
        } catch (err) {
          console.error('Error parsing dropped data:', err);
        }
      }
    };

    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('drop', handleDrop);

    return () => {
      element.removeEventListener('dragover', handleDragOver);
      element.removeEventListener('dragleave', handleDragLeave);
      element.removeEventListener('drop', handleDrop);
    };
  }, [onDrop]);

  return { dropRef, isOver };
}
