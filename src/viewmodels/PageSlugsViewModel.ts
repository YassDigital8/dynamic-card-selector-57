
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
  const [apiReachable, setApiReachable] = useState(true);
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
      
      // Use a timeout to prevent long waiting times if the API is down
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      }).finally(() => clearTimeout(timeoutId));

      if (!response.ok) {
        throw new Error(`Failed to fetch parent paths: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Parent paths response:', data);
      
      // Assuming the API returns an array of strings or objects with a path property
      let paths: string[] = [];
      if (Array.isArray(data)) {
        // If it returns an array of strings
        if (typeof data[0] === 'string') {
          paths = data;
        } 
        // If it returns an array of objects with path property
        else if (data[0] && typeof data[0] === 'object') {
          paths = data.map((item: any) => item.path || item.name || item.slug || item.id);
        }
      }
      
      setAvailableSlugs(paths);
      setApiReachable(true);
    } catch (error) {
      console.error('Error fetching parent paths:', error);
      
      // Set API reachable state to false
      setApiReachable(false);
      
      // Fallback to mock data in case of API failure
      console.log('Using mock data for parent paths due to API failure');
      const mockSlugs = ['aboutus', 'contact', 'services', 'products', 'blog', 'parent1'];
      setAvailableSlugs(mockSlugs);
      
      let errorMessage = "Failed to fetch parent paths";
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "API request timed out. Using mock data instead.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        variant: "destructive",
        title: "API Connection Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [selectedPOS, selectedLanguage, toast]);

  const fetchSubSlugs = useCallback(async () => {
    if (!selectedPOS || !selectedLanguage || !selectedSlug) return;
    
    setLoading(true);
    try {
      // If API was unreachable in parent slug fetch, don't try again
      if (!apiReachable) {
        throw new Error('API is currently unreachable');
      }
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const apiUrl = `https://staging.sa3d.online:7036/get-sub-path/${selectedPOS.toLowerCase()}/${selectedLanguage.toLowerCase()}/${selectedSlug}/`;
      
      console.log(`Fetching sub-paths from: ${apiUrl}`);
      
      // Use a timeout to prevent long waiting times if the API is down
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      }).finally(() => clearTimeout(timeoutId));

      if (!response.ok) {
        throw new Error(`Failed to fetch sub-paths: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Sub-paths response:', data);
      
      // Process the response similar to fetchSlugs
      let paths: string[] = [];
      if (Array.isArray(data)) {
        if (typeof data[0] === 'string') {
          paths = data;
        } else if (data[0] && typeof data[0] === 'object') {
          paths = data.map((item: any) => item.path || item.name || item.slug || item.id);
        }
      }
      
      setSubSlugs(paths);
    } catch (error) {
      console.error('Error fetching sub-paths:', error);
      
      // Fallback to mock data in case of API failure
      console.log('Using mock data for sub-paths due to API failure');
      const mockSubSlugs = ['subpage1', 'subpage2', 'subpage3', 'subparen1'];
      setSubSlugs(mockSubSlugs);
      
      let errorMessage = "Failed to fetch sub-paths";
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "API request timed out. Using mock data instead.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        variant: "destructive",
        title: "API Connection Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [selectedPOS, selectedLanguage, selectedSlug, apiReachable, toast]);

  // Method to retry API connection
  const retryApiConnection = useCallback(() => {
    setApiReachable(true);
    fetchSlugs();
  }, [fetchSlugs]);

  return {
    loading,
    setLoading,
    availableSlugs,
    selectedSlug,
    setSelectedSlug,
    subSlugs,
    selectedSubSlug,
    setSelectedSubSlug,
    fetchSlugs,
    apiReachable,
    retryApiConnection
  };
}
