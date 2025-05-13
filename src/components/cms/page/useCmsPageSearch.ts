
import { useMemo } from 'react';

export const useCmsPageSearch = (pages: any[], searchQuery: string) => {
  // Ensure pages is always an array
  const safePages = Array.isArray(pages) ? pages : [];
  
  // Filter pages based on search query with improved null checks
  const filteredPages = useMemo(() => {
    if (!searchQuery) return safePages;
    
    return safePages.filter(page => {
      if (!page) return false;
      
      const title = page.title || '';
      const slug = page.slug || '';
      const searchLower = searchQuery.toLowerCase();
      
      return title.toLowerCase().includes(searchLower) || 
             slug.toLowerCase().includes(searchLower);
    });
  }, [safePages, searchQuery]);
  
  return { filteredPages };
};
