
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PageData } from '../models/PageModel';

interface PageDataViewModelProps {
  selectedPOS: string;
  selectedLanguage: string;
  selectedSlug: string;
  selectedSubSlug: string;
  selectedPathId: number | null;
  selectedSubPathId: number | null;
}

export function usePageDataViewModel({
  selectedPOS,
  selectedLanguage,
  selectedSlug,
  selectedSubSlug,
  selectedPathId,
  selectedSubPathId
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
          description: "Using mock data until a specific page is selected",
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

  const fetchPageData = useCallback(async () => {
    if (!selectedPOS || !selectedLanguage) {
      return;
    }
    
    // Determine which ID to use for the API call
    const pageId = selectedSubPathId !== null ? selectedSubPathId : selectedPathId;
    
    if (!pageId) {
      // If no page ID is available, load the initial data
      fetchInitialPageData();
      return;
    }
    
    setLoading(true);
    setPageData(null);
    
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const apiUrl = `https://staging.sa3d.online:7036/Page/${pageId}`;
      
      console.log(`Fetching page data from: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch page data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Page data response:', data);
      
      // Transform API response to PageData format
      const transformedData: PageData = {
        id: data.id,
        title: data.title || `Untitled Page (ID: ${pageId})`,
        content: data.description || 'No description available',
        status: data.status || 'unknown',
        lastUpdated: new Date().toISOString()
      };
      
      setPageData(transformedData);
      
      toast({
        title: "Page Data Loaded",
        description: `Loaded data for ${data.pageUrlName || 'page ' + pageId}`,
      });
    } catch (error) {
      console.error('Error fetching page data:', error);
      
      toast({
        variant: "destructive",
        title: "API Error",
        description: error instanceof Error ? error.message : "Failed to fetch page data",
      });
      
      // Show some mock data if API fails, to prevent empty state
      setPageData({
        title: `Page data (ID: ${pageId})`,
        content: "Failed to load data from API. Please check your network connection and try again.",
        lastUpdated: new Date().toISOString(),
        status: "error"
      });
    } finally {
      setLoading(false);
    }
  }, [selectedPOS, selectedLanguage, selectedPathId, selectedSubPathId, fetchInitialPageData, toast]);

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
