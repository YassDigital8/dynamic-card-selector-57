
import { useEffect, useCallback, useMemo } from 'react';
import { usePageSelectionViewModel } from './PageSelectionViewModel';
import { usePageSlugsViewModel } from './PageSlugsViewModel';
import { usePageDataViewModel } from './PageDataViewModel';

interface PageNavigationViewModelProps {
  authToken?: string;
}

export function usePageNavigationViewModel({ authToken = '' }: PageNavigationViewModelProps = {}) {
  // Use the smaller ViewModels
  const pageSelections = usePageSelectionViewModel();
  
  // Memoize the dependencies for usePageSlugs
  const pageSlugsProps = useMemo(() => ({
    selectedPOS: pageSelections.selectedPOS,
    selectedLanguage: pageSelections.selectedLanguage
  }), [pageSelections.selectedPOS, pageSelections.selectedLanguage]);
  
  const pageSlugs = usePageSlugsViewModel(pageSlugsProps);
  
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
  
  const pageData = usePageDataViewModel(pageDataProps);

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
    if (pageSelections.selectedPOS && pageSelections.selectedLanguage) {
      // Force a data fetch anytime the slug or subSlug changes
      if (pageSlugs.selectedSlug) {
        // Fetch specific page data if a slug is selected
        pageData.fetchPageData();
      }
    }
  }, [
    pageSelections.selectedPOS, 
    pageSelections.selectedLanguage, 
    pageSlugs.selectedSlug,
    pageSlugs.selectedSubSlug, 
    pageData.fetchPageData
  ]);

  // Automatically fetch page data when slug or subSlug changes
  useEffect(() => {
    if (pageSlugs.selectedSlug || pageSlugs.selectedSubSlug) {
      fetchPageData();
    }
  }, [pageSlugs.selectedSlug, pageSlugs.selectedSubSlug, fetchPageData]);

  // Memoize the combined return values
  const handleDeletePage = useCallback(async () => {
    try {
      await pageData.deletePage();
      
      // Reset the slug selections after successful deletion
      pageSlugs.setSelectedSlug('');
      
      // Refresh the available slugs
      pageSlugs.fetchSlugs();
      
      // Load the initial page data
      fetchInitialPageData();
    } catch (error) {
      console.error('Failed to delete page:', error);
    }
  }, [
    pageData.deletePage,
    pageSlugs.setSelectedSlug,
    pageSlugs.fetchSlugs,
    fetchInitialPageData
  ]);

  // Function to refresh (fetch again) the slugs from the API
  const refreshSlugs = useCallback(() => {
    pageSlugs.fetchSlugs();
  }, [pageSlugs.fetchSlugs]);

  const returnValue = useMemo(() => ({
    // Combine all the properties from the smaller ViewModels
    ...pageSelections,
    ...pageSlugs,
    loading: pageSlugs.loading || pageData.loading,
    pageData: pageData.pageData,
    handleFetchData: fetchPageData, // Kept for backwards compatibility
    refreshPageData: pageData.fetchPageData,  // Added a named export for the refresh function
    refreshSlugs, // Add the function to refresh slugs
    deletePage: handleDeletePage,  // Add the delete page function
  }), [
    pageSelections,
    pageSlugs,
    pageData.loading,
    pageData.pageData,
    pageData.fetchPageData,
    refreshSlugs,
    handleDeletePage
  ]);

  return returnValue;
}
