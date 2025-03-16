
import React from 'react';
import { FileInfo } from '@/models/FileModel';

export interface SortConfig {
  field: 'name' | 'size' | 'type' | 'uploadedOn';
  direction: 'asc' | 'desc';
}

export const useSortedFiles = (files: FileInfo[], sortConfig: SortConfig) => {
  // Sort files based on current sort configuration
  return React.useMemo(() => {
    const sortedFiles = [...files].sort((a, b) => {
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      
      switch (sortConfig.field) {
        case 'name':
          return (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) * direction;
        case 'size':
          return (a.size - b.size) * direction;
        case 'type':
          return (a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1) * direction;
        case 'uploadedOn':
          return (new Date(a.uploadedOn).getTime() - new Date(b.uploadedOn).getTime()) * direction;
        default:
          return 0;
      }
    });
    
    return sortedFiles;
  }, [files, sortConfig]);
};
