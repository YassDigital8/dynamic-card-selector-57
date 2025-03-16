
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PageSlugsViewModelProps {
  selectedPOS: string;
  selectedLanguage: string;
}

export function usePageSlugsViewModel({ selectedPOS, selectedLanguage }: PageSlugsViewModelProps) {
  const [loading, setLoading] = useState(false);
  const [availableSlugs, setAvailableSlugs] = useState<string[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [subSlugs, setSubSlugs] = useState<string[]>([]);
  const [selectedSubSlug, setSelectedSubSlug] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (selectedPOS && selectedLanguage) {
      setSelectedSlug('');
      setSubSlugs([]);
      setSelectedSubSlug('');
      fetchSlugs();
    }
  }, [selectedPOS, selectedLanguage]);

  useEffect(() => {
    if (selectedSlug) {
      setSelectedSubSlug('');
      fetchSubSlugs();
    }
  }, [selectedSlug]);

  const fetchSlugs = useCallback(() => {
    setLoading(true);
    try {
      // In real implementation, this would be an API call
      const mockSlugs = ['aboutus', 'contact', 'services', 'products', 'blog', 'parent1'];
      setAvailableSlugs(mockSlugs);
      
      toast({
        title: "Development Mode",
        description: "Using mock data until SSL certificate is fixed",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch page slugs",
      });
    } finally {
      setLoading(false);
    }
  }, [selectedPOS, selectedLanguage, toast]);

  const fetchSubSlugs = useCallback(() => {
    setLoading(true);
    try {
      // In real implementation, this would be an API call
      const mockSubSlugs = ['subpage1', 'subpage2', 'subpage3', 'subparen1'];
      setSubSlugs(mockSubSlugs);
      
      toast({
        title: "Development Mode",
        description: "Using mock data until SSL certificate is fixed",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch sub-page slugs",
      });
    } finally {
      setLoading(false);
    }
  }, [selectedPOS, selectedLanguage, selectedSlug, toast]);

  return {
    loading,
    setLoading,
    availableSlugs,
    selectedSlug,
    setSelectedSlug,
    subSlugs,
    selectedSubSlug,
    setSelectedSubSlug,
    fetchSlugs
  };
}
