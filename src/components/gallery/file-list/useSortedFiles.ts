
import { useMemo } from 'react';
import { FileInfo } from '@/models/FileModel';
import { SortConfig, SortField } from './SortControls';

export const useSortedFiles = (files: FileInfo[], sortConfig: SortConfig) => {
  const sortedFiles = useMemo(() => {
    return [...files].sort((a, b) => {
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
  }, [files, sortConfig.field, sortConfig.direction]);

  return sortedFiles;
};

export const useSort = (initialField: SortField = 'uploadedOn', initialDirection: 'asc' | 'desc' = 'desc') => {
  const [sortConfig, setSortConfig] = React.useState<SortConfig>({ 
    field: initialField, 
    direction: initialDirection 
  });
  
  // Change sort field and direction
  const handleSort = (field: SortField) => {
    setSortConfig(current => ({
      field,
      direction: current.field === field && current.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return { sortConfig, handleSort };
};
