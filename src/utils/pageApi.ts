
/**
 * Utility functions for page-related API operations
 */

import { PageData } from '@/models/PageModel';
import { toast } from '@/hooks/use-toast';

interface UpdatePageParams {
  pageData: PageData;
  newTitle?: string;
  newContent?: string;
  newStatus?: string;
  selectedPOS?: string;
  selectedLanguage?: string;
  selectedSlug?: string;
  selectedSubSlug?: string;
}

/**
 * Updates a page with new data
 */
export const updatePage = async ({
  pageData,
  newTitle,
  newContent,
  newStatus,
  selectedPOS,
  selectedLanguage,
  selectedSlug,
  selectedSubSlug,
}: UpdatePageParams): Promise<boolean> => {
  if (!pageData?.id) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Cannot update page: Missing page ID",
    });
    return false;
  }
  
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    // Prepare the request body based on the existing page data
    const updateData = {
      id: pageData.id,
      pageUrlName: pageData.pageUrlName || `${selectedPOS}/${selectedLanguage}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`,
      language: selectedLanguage,
      pos: selectedPOS,
      title: newTitle || pageData.title,
      status: newStatus || pageData.status || 'draft',
      description: newContent || pageData.content,
      segments: pageData.segments || []
    };
    
    console.log('Sending update with data:', updateData);
    
    const response = await fetch('https://reports.chamwings.com:7036/Page', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error(`Failed to update page data: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error updating page data:', error);
    toast({
      variant: "destructive",
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to update page data",
    });
    return false;
  }
};
