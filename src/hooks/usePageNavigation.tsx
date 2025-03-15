
import { useEffect } from 'react';
import { usePageSelections } from './usePageSelections';
import { usePageSlugs } from './usePageSlugs';
import { usePageData } from './usePageData';

interface UsePageNavigationProps {
  authToken?: string;
}

const usePageNavigation = ({ authToken = '' }: UsePageNavigationProps = {}) => {
  // Use the smaller hooks
  const pageSelections = usePageSelections();
  const pageSlugs = usePageSlugs({
    selectedPOS: pageSelections.selectedPOS,
    selectedLanguage: pageSelections.selectedLanguage
  });
  const pageData = usePageData({
    selectedPOS: pageSelections.selectedPOS,
    selectedLanguage: pageSelections.selectedLanguage,
    selectedSlug: pageSlugs.selectedSlug,
    selectedSubSlug: pageSlugs.selectedSubSlug
  });

  // Fetch initial page data when POS and Language are selected
  useEffect(() => {
    if (pageSelections.selectedPOS && pageSelections.selectedLanguage) {
      pageData.fetchInitialPageData();
    }
  }, [pageSelections.selectedPOS, pageSelections.selectedLanguage]);

  // Automatically fetch page data when slug is selected
  useEffect(() => {
    if (pageSelections.selectedPOS && pageSelections.selectedLanguage && 
        (pageSlugs.selectedSlug || (!pageSlugs.selectedSlug && pageData.pageData === null))) {
      pageData.fetchPageData();
    }
  }, [pageSlugs.selectedSlug, pageSlugs.selectedSubSlug]);

  return {
    // Combine all the properties from the smaller hooks
    ...pageSelections,
    ...pageSlugs,
    loading: pageSlugs.loading || pageData.loading,
    pageData: pageData.pageData,
    handleFetchData: pageData.fetchPageData, // Kept for backwards compatibility
    refreshPageData: pageData.fetchPageData,  // Added a named export for the refresh function
  };
};

export default usePageNavigation;
