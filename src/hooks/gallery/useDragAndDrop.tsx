
import { useState, useRef, useEffect } from 'react';
import { FileInfo } from '@/models/FileModel';

export function useDrag<T>(item: T) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = dragRef.current;
    if (!element) return;

    const handleDragStart = (e: DragEvent) => {
      setIsDragging(true);
      if (e.dataTransfer) {
        e.dataTransfer.setData('application/json', JSON.stringify(item));
        e.dataTransfer.effectAllowed = 'move';
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
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
