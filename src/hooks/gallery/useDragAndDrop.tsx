
import { useState, useRef, useEffect } from 'react';
import { FileInfo } from '@/models/FileModel';

// Global state to track dragging status
const globalDragState = {
  isDragging: false,
  draggedItem: null as any,
  subscribers: new Set<(isDragging: boolean, item: any) => void>()
};

// Subscribe to global drag state changes
export function useGlobalDragState() {
  const [isDragging, setIsDragging] = useState(globalDragState.isDragging);
  const [draggedItem, setDraggedItem] = useState(globalDragState.draggedItem);

  useEffect(() => {
    const handleChange = (newIsDragging: boolean, newItem: any) => {
      setIsDragging(newIsDragging);
      setDraggedItem(newItem);
    };

    globalDragState.subscribers.add(handleChange);
    return () => {
      globalDragState.subscribers.delete(handleChange);
    };
  }, []);

  return { isDragging, draggedItem };
}

export function useDrag<T>(item: T) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = dragRef.current;
    if (!element) return;

    const handleDragStart = (e: DragEvent) => {
      setIsDragging(true);
      
      // Update global drag state
      globalDragState.isDragging = true;
      globalDragState.draggedItem = item;
      globalDragState.subscribers.forEach(fn => fn(true, item));
      
      if (e.dataTransfer) {
        e.dataTransfer.setData('application/json', JSON.stringify(item));
        e.dataTransfer.effectAllowed = 'move';
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      
      // Update global drag state
      globalDragState.isDragging = false;
      globalDragState.draggedItem = null;
      globalDragState.subscribers.forEach(fn => fn(false, null));
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

    const handleDragLeave = () => {
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
