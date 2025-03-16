
import { useState, useMemo } from 'react';
import { FileInfo } from '@/models/FileModel';

export interface SortConfig {
  field: 'name' | 'uploadedOn' | 'size' | 'type';
  direction: 'asc' | 'desc';
}

export interface SortControlsProps {
  sortConfig: SortConfig;
  onSortChange: (newConfig: SortConfig) => void;
}

export const useSortedFiles = (files: FileInfo[], initialSortConfig: SortConfig) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>(initialSortConfig);

  const sortedFiles = useMemo(() => {
    const filesCopy = [...files];
    return filesCopy.sort((a, b) => {
      if (sortConfig.field === 'uploadedOn') {
        const dateA = new Date(a.uploadedOn).getTime();
        const dateB = new Date(b.uploadedOn).getTime();
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (sortConfig.field === 'size') {
        return sortConfig.direction === 'asc' ? a.size - b.size : b.size - a.size;
      }
      
      const valueA = a[sortConfig.field].toString().toLowerCase();
      const valueB = b[sortConfig.field].toString().toLowerCase();
      
      if (valueA < valueB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [files, sortConfig]);

  return { sortedFiles, sortConfig, setSortConfig };
};
