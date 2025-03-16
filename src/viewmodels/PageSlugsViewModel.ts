
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PageSlugsViewModelProps {
  selectedPOS: string;
  selectedLanguage: string;
}

interface PagePath {
  id: number;
  pageUrlName: string;
}

export function usePageSlugsViewModel({ selectedPOS, selectedLanguage }: PageSlugsViewModelProps) {
  const [loading, setLoading] = useState(false);
  const [availableSlugs, setAvailableSlugs] = useState<string[]>([]);
  const [slugsWithIds, setSlugsWithIds] = useState<PagePath[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [selectedPathId, setSelectedPathId] = useState<number | null>(null);
  const [subSlugs, setSubSlugs] = useState<string[]>([]);
  const [subSlugsWithIds, setSubSlugsWithIds] = useState<PagePath[]>([]);
  const [selectedSubSlug, setSelectedSubSlug] = useState('');
  const [selectedSubPathId, setSelectedSubPathId] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedPOS && selectedLanguage) {
      setSelectedSlug('');
      setSelectedPathId(null);
      setSubSlugs([]);
      setSelectedSubSlug('');
      setSelectedSubPathId(null);
      fetchSlugs();
    }
  }, [selectedPOS, selectedLanguage]);

  useEffect(() => {
    if (selectedSlug) {
      setSelectedSubSlug('');
      setSelectedSubPathId(null);
      fetchSubSlugs();
    }
  }, [selectedSlug]);

  // Handle slug selection with ID
  const handleSlugSelection = useCallback((slug: string) => {
    setSelectedSlug(slug);
    // Find the corresponding ID from the slugsWithIds array
    const selectedPath = slugsWithIds.find(path => path.pageUrlName === slug);
    setSelectedPathId(selectedPath?.id || null);
  }, [slugsWithIds]);

  // Handle sub-slug selection with ID
  const handleSubSlugSelection = useCallback((subSlug: string) => {
    setSelectedSubSlug(subSlug);
    // Find the corresponding ID from the subSlugsWithIds array
    const selectedSubPath = subSlugsWithIds.find(path => path.pageUrlName === subSlug);
    setSelectedSubPathId(selectedSubPath?.id || null);
  }, [subSlugsWithIds]);

  const fetchSlugs = useCallback(async () => {
    if (!selectedPOS || !selectedLanguage) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const apiUrl = `https://staging.sa3d.online:7036/get-sub-path/${selectedPOS.toLowerCase()}/${selectedLanguage.toLowerCase()}/`;
      
      console.log(`Fetching parent paths from: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch parent paths: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Parent paths response:', data);
      
      // Process the API response which contains objects with id and pageUrlName
      if (Array.isArray(data)) {
        // Store the full objects for reference
        setSlugsWithIds(data);
        
        // Extract just the pageUrlName values for the dropdown
        const paths = data.map((item: PagePath) => item.pageUrlName);
        setAvailableSlugs(paths);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching parent paths:', error);
      
      toast({
        variant: "destructive",
        title: "API Error",
        description: error instanceof Error ? error.message : "Failed to fetch parent paths",
      });
      
      // Clear the available slugs to show there was an error
      setAvailableSlugs([]);
      setSlugsWithIds([]);
    } finally {
      setLoading(false);
    }
  }, [selectedPOS, selectedLanguage, toast]);

  const fetchSubSlugs = useCallback(async () => {
    if (!selectedPOS || !selectedLanguage || !selectedSlug) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const apiUrl = `https://staging.sa3d.online:7036/get-sub-path/${selectedPOS.toLowerCase()}/${selectedLanguage.toLowerCase()}/${selectedSlug}/`;
      
      console.log(`Fetching sub-paths from: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch sub-paths: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Sub-paths response:', data);
      
      // Process the API response which contains objects with id and pageUrlName
      if (Array.isArray(data)) {
        // Store the full objects for reference
        setSubSlugsWithIds(data);
        
        // Extract just the pageUrlName values for the dropdown
        const paths = data.map((item: PagePath) => item.pageUrlName);
        setSubSlugs(paths);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching sub-paths:', error);
      
      toast({
        variant: "destructive",
        title: "API Error",
        description: error instanceof Error ? error.message : "Failed to fetch sub-paths",
      });
      
      // Clear the sub slugs to show there was an error
      setSubSlugs([]);
      setSubSlugsWithIds([]);
    } finally {
      setLoading(false);
    }
  }, [selectedPOS, selectedLanguage, selectedSlug, toast]);

  return {
    loading,
    setLoading,
    availableSlugs,
    selectedSlug,
    setSelectedSlug: handleSlugSelection,
    selectedPathId,
    subSlugs,
    selectedSubSlug,
    setSelectedSubSlug: handleSubSlugSelection,
    selectedSubPathId,
    fetchSlugs,
    slugsWithIds,
    subSlugsWithIds
  };
}
