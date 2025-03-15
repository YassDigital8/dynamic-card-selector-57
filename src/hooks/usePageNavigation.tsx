
import { useState, useEffect } from 'react';
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

  const fetchSlugs = () => {
    setLoading(true);
    try {
      const mockSlugs = ['aboutus', 'contact', 'services', 'products', 'blog', 'parent1'];
      setAvailableSlugs(mockSlugs);
      
      toast({
        title: "Development Mode",
        description: "Using mock data until SSL certificate is fixed",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubSlugs = () => {
    setLoading(true);
    try {
      const mockSubSlugs = ['subpage1', 'subpage2', 'subpage3', 'subparen1'];
      setSubSlugs(mockSubSlugs);
      
      toast({
        title: "Development Mode",
        description: "Using mock data until SSL certificate is fixed",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPageData = () => {
    setLoading(true);
    try {
      const mockData = {
        title: `${selectedLanguage} page for ${selectedPOS}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`,
        content: 'This is mock page content until the SSL certificate is fixed.'
      };
      setPageData(mockData);
      
      toast({
        title: "Development Mode",
        description: "Using mock data until SSL certificate is fixed",
      });
    } finally {
      setLoading(false);
    }
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
    fetchSlugs  // Expose the fetchSlugs function
  };
};

export default usePageNavigation;
