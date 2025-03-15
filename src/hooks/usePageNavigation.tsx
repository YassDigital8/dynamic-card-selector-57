
import { useEffect, useCallback, useMemo } from 'react';
import { usePageSelections, SelectionStep } from './usePageSelections';
import { usePageSlugs } from './usePageSlugs';
import { usePageData } from './usePageData';

interface UsePageNavigationProps {
  authToken?: string;
}

const usePageNavigation = ({ authToken = '' }: UsePageNavigationProps = {}) => {
  // Use the smaller hooks
  const pageSelections = usePageSelections();
  
  // Memoize the dependencies for usePageSlugs
  const pageSlugsProps = useMemo(() => ({
    selectedPOS: pageSelections.selectedPOS,
    selectedLanguage: pageSelections.selectedLanguage
  }), [pageSelections.selectedPOS, pageSelections.selectedLanguage]);
  
  const pageSlugs = usePageSlugs(pageSlugsProps);
  
  // Memoize the dependencies for usePageData
  const pageDataProps = useMemo(() => ({
    selectedPOS: pageSelections.selectedPOS,
    selectedLanguage: pageSelections.selectedLanguage,
    selectedSlug: pageSlugs.selectedSlug,
    selectedSubSlug: pageSlugs.selectedSubSlug
  }), [
    pageSelections.selectedPOS, 
    pageSelections.selectedLanguage, 
    pageSlugs.selectedSlug, 
    pageSlugs.selectedSubSlug
  ]);
  
  const pageData = usePageData(pageDataProps);

  // Memoize the fetch initial page data callback
  const fetchInitialPageData = useCallback(() => {
    if (pageSelections.selectedPOS && pageSelections.selectedLanguage) {
      pageData.fetchInitialPageData();
    }
  }, [pageSelections.selectedPOS, pageSelections.selectedLanguage, pageData.fetchInitialPageData]);

  // Fetch initial page data when POS and Language are selected
  useEffect(() => {
    fetchInitialPageData();
  }, [fetchInitialPageData]);

  // Memoize the fetch page data callback
  const fetchPageData = useCallback(() => {
    if (pageSelections.selectedPOS && pageSelections.selectedLanguage && 
        (pageSlugs.selectedSlug || (!pageSlugs.selectedSlug && pageData.pageData === null))) {
      pageData.fetchPageData();
    }
  }, [
    pageSelections.selectedPOS, 
    pageSelections.selectedLanguage, 
    pageSlugs.selectedSlug, 
    pageData.pageData,
    pageData.fetchPageData
  ]);

  // Automatically fetch page data when slug is selected
  useEffect(() => {
    fetchPageData();
  }, [pageSlugs.selectedSlug, pageSlugs.selectedSubSlug, fetchPageData]);

  // Memoize the combined return values
  const returnValue = useMemo(() => ({
    // Combine all the properties from the smaller hooks
    ...pageSelections,
    ...pageSlugs,
    loading: pageSlugs.loading || pageData.loading,
    pageData: pageData.pageData,
    handleFetchData: pageData.fetchPageData, // Kept for backwards compatibility
    refreshPageData: pageData.fetchPageData,  // Added a named export for the refresh function
  }), [
    pageSelections,
    pageSlugs,
    pageData.loading,
    pageData.pageData,
    pageData.fetchPageData
  ]);

  return returnValue;
};

export default usePageNavigation;
