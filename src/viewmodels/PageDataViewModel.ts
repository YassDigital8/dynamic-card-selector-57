
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

  // Fetch initial page data (landing page when only POS and Language are selected)
  const fetchInitialPageData = useCallback(async () => {
    if (!selectedPOS || !selectedLanguage) {
      return;
    }
    
    setLoading(true);
    setPageData(null);
    
    try {
      // Try to fetch real data from API
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const apiUrl = `https://staging.sa3d.online:7036/${selectedLanguage.toLowerCase()}/${selectedPOS.toLowerCase()}`;
      
      console.log(`Fetching initial page data from: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch initial page data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Initial page data response:', data);
      
      // Extract content from the API response
      const apiPageData: PageData = {
        title: data.title || `${selectedLanguage} landing page for ${selectedPOS}`,
        content: data.description || data.content || `This is the default landing page for ${selectedPOS} region in ${selectedLanguage} language.`,
        lastUpdated: data.lastUpdated || new Date().toISOString(),
        status: data.status || 'published'
      };
      
      setPageData(apiPageData);
      
      toast({
        title: "Page Data Loaded",
        description: "Page data loaded successfully",
      });
    } catch (error) {
      console.error('Error fetching initial page data:', error);
      
      // Fallback to mock data
      const mockData = {
        title: `${selectedLanguage} landing page for ${selectedPOS}`,
        content: `This is the default landing page for ${selectedPOS} region in ${selectedLanguage} language.
        
Welcome to the content management system. Please select a page from the available options to view more details.

• Main pages are listed in the "Select Parent Path" dropdown
• Sub-pages will appear when a parent page is selected
• You can add new pages using the "Add Page" button

The real content would be fetched from the API endpoint:
https://staging.sa3d.online:7036/${selectedLanguage.toLowerCase()}/${selectedPOS.toLowerCase()}`,
        lastUpdated: new Date().toISOString(),
        status: 'published'
      };
      
      setPageData(mockData);
      
      toast({
        variant: "destructive",
        title: "API Error",
        description: error instanceof Error ? error.message : "Failed to fetch initial page data",
      });
    } finally {
      setLoading(false);
    }
  }, [selectedPOS, selectedLanguage, toast]);

  // Fetch page data for a specific path
  const fetchPageData = useCallback(async () => {
    if (!selectedPOS || !selectedLanguage) {
      return;
    }
    
    setLoading(true);
    setPageData(null);
    
    try {
      // Only proceed with API call if we have a slug
      if (selectedSlug) {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        // Construct the URL based on whether there's a subslug
        const pathSegment = selectedSubSlug 
          ? `${selectedSlug}/${selectedSubSlug}`
          : selectedSlug;
        
        const apiUrl = `https://staging.sa3d.online:7036/${selectedLanguage.toLowerCase()}/${selectedPOS.toLowerCase()}/${pathSegment}`;
        
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
        
        // Extract content from the API response
        const apiPageData: PageData = {
          title: data.title || `${selectedLanguage} page for ${selectedPOS} - ${pathSegment}`,
          content: data.description || data.content || `This is content for the ${pathSegment} page in ${selectedLanguage} language for ${selectedPOS} region.`,
          lastUpdated: data.lastUpdated || new Date().toISOString(),
          status: data.status || 'published'
        };
        
        setPageData(apiPageData);
        
        toast({
          title: "Page Data Loaded",
          description: `Loaded data for ${pathSegment}`,
        });
      } else {
        // If no slug is selected, fetch initial page data
        await fetchInitialPageData();
        return;
      }
    } catch (error) {
      console.error('Error fetching page data:', error);
      
      // Fallback to mock data
      let mockData;
      
      if (selectedSlug) {
        // For specific page data when slug is selected
        const pathSegment = selectedSubSlug 
          ? `${selectedSlug}/${selectedSubSlug}`
          : selectedSlug;
        
        mockData = {
          title: `${selectedLanguage} page for ${selectedPOS} - ${pathSegment}`,
          content: `This is a mock content for the ${pathSegment} page in ${selectedLanguage} language for ${selectedPOS} region.
          
Additional content details would go here.
• Path Selected: ${pathSegment}
• POS: ${selectedPOS}
• Language: ${selectedLanguage}

The real content would be fetched from the API endpoint:
https://staging.sa3d.online:7036/${selectedLanguage}/${selectedPOS}/${pathSegment}`,
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
https://staging.sa3d.online:7036/${selectedLanguage}/${selectedPOS}`,
          lastUpdated: new Date().toISOString(),
          status: 'published'
        };
      }
      
      setPageData(mockData);
      
      toast({
        variant: "destructive",
        title: "API Error",
        description: error instanceof Error ? error.message : "Failed to fetch page data",
      });
    } finally {
      setLoading(false);
    }
  }, [selectedPOS, selectedLanguage, selectedSlug, selectedSubSlug, fetchInitialPageData, toast]);

  const deletePage = useCallback(async () => {
    if (!selectedPOS || !selectedLanguage || !selectedSlug) {
      return Promise.reject(new Error("Cannot delete page: Missing required parameters"));
    }
    
    return new Promise<void>((resolve, reject) => {
      setLoading(true);
      
      // Construct the path for the API call
      const pathSegment = selectedSubSlug 
        ? `${selectedSlug}/${selectedSubSlug}`
        : selectedSlug;
      
      const apiUrl = `https://staging.sa3d.online:7036/${selectedLanguage.toLowerCase()}/${selectedPOS.toLowerCase()}/${pathSegment}`;
      
      console.log(`Attempting to delete page: ${apiUrl}`);
      
      try {
        // In a real implementation, this would be an API call
        // For now, simulate a successful deletion
        setTimeout(() => {
          // Reset page data
          setPageData(null);
          setLoading(false);
          
          toast({
            title: "Page Deleted",
            description: `Successfully deleted page: ${pathSegment}`,
          });
          
          resolve();
        }, 1000);
      } catch (error) {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete page",
        });
        reject(error);
      }
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
