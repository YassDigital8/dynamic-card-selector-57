import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PageData } from '../models/PageModel';

interface PageDataViewModelProps {
  selectedPOS: string;
  selectedLanguage: string;
  selectedSlug: string;
  selectedSubSlug: string;
}

export function usePageDataViewModel({
  selectedPOS,
  selectedLanguage,
  selectedSlug,
  selectedSubSlug
}: PageDataViewModelProps) {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<PageData | null>(null);
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
    if (!selectedPOS || !selectedLanguage) {
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
            content: `This is a mock content for the ${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''} page in ${selectedLanguage} language for ${selectedPOS} region.
            
Additional content details would go here.
• Path Selected: ${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}
• POS: ${selectedPOS}
• Language: ${selectedLanguage}

The real content would be fetched from the API endpoint:
https://{{URL}}:7036/${selectedLanguage}/${selectedPOS}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`,
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
          description: `Loaded data for ${selectedSlug ? selectedSlug + (selectedSubSlug ? '/' + selectedSubSlug : '') : 'landing page'}`,
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

  const deletePage = useCallback(() => {
    if (!selectedPOS || !selectedLanguage || !selectedSlug) {
      return Promise.reject(new Error("Cannot delete page: Missing required parameters"));
    }
    
    return new Promise<void>((resolve, reject) => {
      // Mock the API call for deleting a page
      setTimeout(() => {
        try {
          // Reset page data
          setPageData(null);
          
          toast({
            title: "Page Deleted",
            description: `Successfully deleted page: ${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`,
          });
          
          resolve();
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to delete page",
          });
          reject(error);
        }
      }, 1000);
    });
  }, [selectedPOS, selectedLanguage, selectedSlug, selectedSubSlug, toast]);

  // Reset page data if the main selections change
  useEffect(() => {
    if (selectedPOS && selectedLanguage) {
      // Reset page data when main selections change
      setPageData(null);
    }
  }, [selectedPOS, selectedLanguage]);

  return {
    loading,
    pageData,
    fetchInitialPageData,
    fetchPageData,
    deletePage
  };
}
