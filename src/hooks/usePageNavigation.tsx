
import { usePageNavigationViewModel } from '../viewmodels/PageNavigationViewModel';
import { usePageSlugsViewModel } from '../viewmodels/PageSlugsViewModel';
import { usePageDataViewModel } from '../viewmodels/PageDataViewModel';
import { useMemo } from 'react';

export default function usePageNavigation() {
  // Get base page selection state (POS and language)
  const pageSelection = usePageNavigationViewModel();
  
  // Get page slugs state based on selected POS and language
  const pageSlugs = usePageSlugsViewModel({
    selectedPOS: pageSelection.selectedPOS,
    selectedLanguage: pageSelection.selectedLanguage,
  });
  
  // Get page data based on all selections
  const pageData = usePageDataViewModel({
    selectedPOS: pageSelection.selectedPOS,
    selectedLanguage: pageSelection.selectedLanguage,
    selectedSlug: pageSlugs.selectedSlug,
    selectedSubSlug: pageSlugs.selectedSubSlug
  });
  
  // Combine all the view models into a unified API
  return useMemo(() => ({
    // Page selection state
    selectedPOS: pageSelection.selectedPOS,
    selectedLanguage: pageSelection.selectedLanguage,
    currentStep: pageSelection.currentStep,
    posOptions: pageSelection.posOptions,
    languageOptions: pageSelection.languageOptions,
    loading: pageSelection.loading || pageSlugs.loading || pageData.loading,
    error: pageSelection.error,
    setSelectedPOS: pageSelection.setSelectedPOS,
    setSelectedLanguage: pageSelection.setSelectedLanguage,

    // Page slugs state
    availableSlugs: pageSlugs.availableSlugs,
    selectedSlug: pageSlugs.selectedSlug,
    setSelectedSlug: pageSlugs.setSelectedSlug,
    subSlugs: pageSlugs.subSlugs,
    selectedSubSlug: pageSlugs.selectedSubSlug,
    setSelectedSubSlug: pageSlugs.setSelectedSubSlug,
    apiReachable: pageSlugs.apiReachable,
    retryApiConnection: pageSlugs.retryApiConnection,

    // Page data state
    pageData: pageData.pageData,
    refreshPageData: pageData.refreshPageData,
    deletePage: pageData.deletePage,
    
    // Reset
    resetSelections: pageSelection.resetSelections,
  }), [pageSelection, pageSlugs, pageData]);
}
