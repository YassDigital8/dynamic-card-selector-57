
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UsePageNavigationProps {
  authToken?: string;
}

const usePageNavigation = ({ authToken = '' }: UsePageNavigationProps = {}) => {
  const [loading, setLoading] = useState(false);
  const [selectedPOS, setSelectedPOS] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [availableSlugs, setAvailableSlugs] = useState<string[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [subSlugs, setSubSlugs] = useState<string[]>([]);
  const [selectedSubSlug, setSelectedSubSlug] = useState('');
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

  const fetchSlugs = useCallback(() => {
    setLoading(true);
    try {
      // In real implementation, this would be an API call
      // Example: GET https://api.example.com/{selectedPOS}/{selectedLanguage}/pages
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
      // Example: GET https://api.example.com/{selectedPOS}/{selectedLanguage}/{selectedSlug}/subpages
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

  const fetchPageData = useCallback(() => {
    if (!selectedSlug) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a page slug",
      });
      return;
    }
    
    setLoading(true);
    setPageData(null);
    
    try {
      // Mock API call using the format specified: https://{{URL}}:7036/English/test/aboutus
      // In a real implementation, we would use:
      // const url = `https://${apiBaseUrl}:7036/${selectedLanguage}/${selectedPOS}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`;
      // const response = await fetch(url);
      // const data = await response.json();
      
      // For now, generate mock data based on the selections
      setTimeout(() => {
        const mockData = {
          title: `${selectedLanguage} page for ${selectedPOS} - ${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`,
          content: `This is a mock content for the ${selectedSlug} page in ${selectedLanguage} language for ${selectedPOS} region.
          
Additional content details would go here.
• Point 1
• Point 2
• Point 3

The real content would be fetched from the API endpoint:
https://{{URL}}:7036/${selectedLanguage}/${selectedSlug}`,
          lastUpdated: new Date().toISOString(),
          status: 'published'
        };
        
        setPageData(mockData);
        setLoading(false);
        
        toast({
          title: "Page Data Loaded",
          description: "Using mock data until SSL certificate is fixed",
        });
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch page data",
      });
      setLoading(false);
    }
  }, [selectedPOS, selectedLanguage, selectedSlug, selectedSubSlug, toast]);

  const handleFetchData = useCallback(() => {
    fetchPageData();
  }, [fetchPageData]);

  return {
    loading,
    setLoading,
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
    pageData,
    handleFetchData,
    fetchSlugs,
    refreshPageData: fetchPageData,  // Added a named export for the refresh function
  };
};

export default usePageNavigation;
