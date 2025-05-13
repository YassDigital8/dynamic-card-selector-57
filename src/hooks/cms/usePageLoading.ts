
import { useState, useCallback, useEffect } from 'react';
import { CMSPage } from './types';
import { mockPages } from './mockData';

export function usePageLoading() {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load pages from mock data (would be replaced with API call)
  const loadPages = useCallback(() => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setPages(mockPages);
      setLoading(false);
    }, 800);
  }, []);

  // Load pages on initial render
  useEffect(() => {
    loadPages();
  }, [loadPages]);

  return {
    pages,
    setPages,
    loading,
    setLoading,
    loadPages
  };
}
