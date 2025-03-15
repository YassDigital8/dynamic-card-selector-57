
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UsePageNavigationProps {
  authToken: string;
}

const usePageNavigation = ({ authToken }: UsePageNavigationProps) => {
  const [selectedPOS, setSelectedPOS] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [availableSlugs, setAvailableSlugs] = useState<string[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [subSlugs, setSubSlugs] = useState<string[]>([]);
  const [selectedSubSlug, setSelectedSubSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<any>(null);
  const { toast } = useToast();
  
  const posOptions = ['SY', 'UAE', 'KWI'];
  const languageOptions = ['English', 'Arabic'];

  useEffect(() => {
    if (selectedPOS && selectedLanguage) {
      setSelectedSlug('');
      setSubSlugs([]);
      setSelectedSubSlug('');
      setPageData(null);
      fetchSlugs();
    }
  }, [selectedPOS, selectedLanguage]);

  useEffect(() => {
    if (selectedSlug) {
      setSelectedSubSlug('');
      setPageData(null);
      fetchSubSlugs();
    }
  }, [selectedSlug]);

  const fetchSlugs = async () => {
    setLoading(true);
    try {
      const langFormatted = selectedLanguage.toLowerCase();
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };
      
      console.log(`Fetching slugs for ${selectedPOS.toLowerCase()}/${langFormatted}/`);
      
      const apiUrl = `https://92.112.184.210:7036/get-sub-path/${selectedPOS.toLowerCase()}/${langFormatted}/`;
      
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
          signal: AbortSignal.timeout(15000)
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        setAvailableSlugs(data);
        
        toast({
          title: "Slugs retrieved",
          description: `Retrieved slugs for ${selectedPOS}/${selectedLanguage}`,
        });
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        let errorMessage = '';
        if (apiError instanceof TypeError && apiError.message === 'Failed to fetch') {
          errorMessage = 'Network error: Unable to connect to API server. This may be due to HTTPS certificate issues.';
        } else {
          errorMessage = apiError instanceof Error ? apiError.message : 'Unknown API error';
        }
        
        const mockSlugs = ['aboutus', 'contact', 'services', 'products', 'blog', 'parent1'];
        setAvailableSlugs(mockSlugs);
        
        toast({
          variant: "destructive",
          title: "API Error",
          description: `Failed to fetch page slugs. Using mock data.\nError: ${errorMessage}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSubSlugs = async () => {
    setLoading(true);
    try {
      const langFormatted = selectedLanguage.toLowerCase();
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };
      
      console.log(`Fetching sub-slugs for ${selectedPOS.toLowerCase()}/${langFormatted}/${selectedSlug}/`);
      
      const apiUrl = `https://92.112.184.210:7036/get-sub-path/${selectedPOS.toLowerCase()}/${langFormatted}/${selectedSlug}/`;
      
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
          signal: AbortSignal.timeout(15000)
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        setSubSlugs(data);
        
        toast({
          title: "Sub-slugs retrieved",
          description: `Retrieved sub-slugs for ${selectedSlug}`,
        });
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        let errorMessage = '';
        if (apiError instanceof TypeError && apiError.message === 'Failed to fetch') {
          errorMessage = 'Network error: Unable to connect to API server. This may be due to HTTPS certificate issues.';
        } else {
          errorMessage = apiError instanceof Error ? apiError.message : 'Unknown API error';
        }
        
        const mockSubSlugs = ['subpage1', 'subpage2', 'subpage3', 'subparen1'];
        setSubSlugs(mockSubSlugs);
        
        toast({
          variant: "destructive",
          title: "API Error",
          description: `Failed to fetch sub-slugs. Using mock data.\nError: ${errorMessage}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPageData = async () => {
    setLoading(true);
    try {
      const langFormatted = selectedLanguage.toLowerCase();
      const path = selectedSubSlug 
        ? `${selectedPOS.toLowerCase()}/${langFormatted}/${selectedSlug}/${selectedSubSlug}`
        : `${selectedPOS.toLowerCase()}/${langFormatted}/${selectedSlug}`;
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };
      
      console.log(`Fetching page data for path: ${path}`);
      
      const apiUrl = `https://92.112.184.210:7036/get-sub-path/${path}`;
      
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
          signal: AbortSignal.timeout(15000)
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        setPageData(data);
        
        toast({
          title: "Success",
          description: "Page data fetched successfully",
        });
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        let errorMessage = '';
        if (apiError instanceof TypeError && apiError.message === 'Failed to fetch') {
          errorMessage = 'Network error: Unable to connect to API server. This may be due to HTTPS certificate issues.';
        } else {
          errorMessage = apiError instanceof Error ? apiError.message : 'Unknown API error';
        }
        
        const mockData = {
          title: `${selectedLanguage} page for ${selectedPOS}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`,
          content: 'This is mock page content since the API fetch failed.'
        };
        setPageData(mockData);
        
        toast({
          variant: "destructive",
          title: "API Error",
          description: `Failed to fetch page data. Using mock data.\nError: ${errorMessage}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetPages = () => {
    if (!selectedPOS || !selectedLanguage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both POS and language",
      });
      return;
    }
    fetchSlugs();
  };

  const handleFetchData = () => {
    if (!selectedSlug) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a page slug",
      });
      return;
    }
    fetchPageData();
  };

  return {
    posOptions,
    languageOptions,
    selectedPOS,
    setSelectedPOS,
    selectedLanguage,
    setSelectedLanguage,
    availableSlugs,
    selectedSlug,
    setSelectedSlug,
    subSlugs,
    selectedSubSlug,
    setSelectedSubSlug,
    loading,
    pageData,
    handleGetPages,
    handleFetchData
  };
};

export default usePageNavigation;
