
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UsePageDataProps {
  selectedPOS: string;
  selectedLanguage: string;
  selectedSlug: string;
  selectedSubSlug: string;
}

export function usePageData({
  selectedPOS,
  selectedLanguage,
  selectedSlug,
  selectedSubSlug
}: UsePageDataProps) {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<any>(null);
  const { toast } = useToast();

  const fetchInitialPageData = useCallback(() => {
    if (!selectedPOS || !selectedLanguage) {
      return;
    }
    
    setLoading(true);
    setPageData(null);
    
    try {
      // Mock API call for initial page data when only POS and Language are selected
      setTimeout(() => {
        const mockData = {
          title: `${selectedLanguage} landing page for ${selectedPOS}`,
          content: `This is the default landing page for ${selectedPOS} region in ${selectedLanguage} language.
          
Welcome to the content management system. Please select a page from the available options to view more details.

• Main pages are listed in the "Select Parent Path" dropdown
• Sub-pages will appear when a parent page is selected
• You can add new pages using the "Add Page" button

The real content would be fetched from the API endpoint:
https://{{URL}}:7036/${selectedLanguage}/${selectedPOS}`,
          lastUpdated: new Date().toISOString(),
          status: 'published'
        };
        
        setPageData(mockData);
        setLoading(false);
        
        toast({
          title: "Default Page Data Loaded",
          description: "Using mock data until SSL certificate is fixed",
        });
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch initial page data",
      });
      setLoading(false);
    }
  }, [selectedPOS, selectedLanguage, toast]);

  const fetchPageData = useCallback(() => {
    if (!selectedSlug && !selectedPOS && !selectedLanguage) {
      return;
    }
    
    setLoading(true);
    setPageData(null);
    
    try {
      // For now, generate mock data based on the selections
      setTimeout(() => {
        let mockData;
        
        if (selectedSlug) {
          // For specific page data when slug is selected
          mockData = {
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
        } else {
          // For initial page data when only POS and Language are selected
          mockData = {
            title: `${selectedLanguage} landing page for ${selectedPOS}`,
            content: `This is the default landing page for ${selectedPOS} region in ${selectedLanguage} language.
            
Welcome to the content management system. Please select a page from the available options to view more details.

• Main pages are listed in the "Select Parent Path" dropdown
• Sub-pages will appear when a parent page is selected
• You can add new pages using the "Add Page" button

The real content would be fetched from the API endpoint:
https://{{URL}}:7036/${selectedLanguage}/${selectedPOS}`,
            lastUpdated: new Date().toISOString(),
            status: 'published'
          };
        }
        
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

  return {
    loading,
    pageData,
    fetchInitialPageData,
    fetchPageData
  };
}
