
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Custom hooks
import usePageNavigation from '@/hooks/usePageNavigation';
import usePageAddition from '@/hooks/usePageAddition';

// Components
import LoadingScreen from '@/components/pages/index/LoadingScreen';
import PageSelectors from '@/components/pages/index/PageSelectors';
import PathSelectors from '@/components/pages/index/PathSelectors';
import PageData from '@/components/pages/index/PageData';
import AddPageDialog from '@/components/pages/index/AddPageDialog';
import PageContainer from '@/components/pages/index/PageContainer';

const Index = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const pageNavigation = usePageNavigation();
  const pageAddition = usePageAddition({
    onSuccess: pageNavigation.fetchSlugs
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAddPage = async (formValues: any) => {
    return pageAddition.handleAddPage(
      formValues, 
      pageNavigation.selectedPOS, 
      pageNavigation.selectedLanguage
    );
  };

  if (initialLoading && !pageNavigation.selectedPOS && !pageNavigation.selectedLanguage) {
    return <LoadingScreen />;
  }

  return (
    <PageContainer>
      <PageSelectors 
        posOptions={pageNavigation.posOptions}
        languageOptions={pageNavigation.languageOptions}
        selectedPOS={pageNavigation.selectedPOS}
        selectedLanguage={pageNavigation.selectedLanguage}
        setSelectedPOS={pageNavigation.setSelectedPOS}
        setSelectedLanguage={pageNavigation.setSelectedLanguage}
        loading={pageNavigation.loading}
      />

      <PathSelectors 
        availableSlugs={pageNavigation.availableSlugs}
        selectedSlug={pageNavigation.selectedSlug}
        setSelectedSlug={pageNavigation.setSelectedSlug}
        subSlugs={pageNavigation.subSlugs}
        selectedSubSlug={pageNavigation.selectedSubSlug}
        setSelectedSubSlug={pageNavigation.setSelectedSubSlug}
        loading={pageNavigation.loading}
        handleFetchData={pageNavigation.handleFetchData}
        selectedPOS={pageNavigation.selectedPOS}
        selectedLanguage={pageNavigation.selectedLanguage}
        onAddPageClick={() => pageAddition.setAddPageDialogOpen(true)}
      />

      <PageData pageData={pageNavigation.pageData} />
      
      <AddPageDialog 
        open={pageAddition.addPageDialogOpen}
        onOpenChange={pageAddition.setAddPageDialogOpen}
        pos={pageNavigation.selectedPOS}
        language={pageNavigation.selectedLanguage}
        selectedSlug={pageNavigation.selectedSlug}
        selectedSubSlug={pageNavigation.selectedSubSlug}
        onAddPage={handleAddPage}
      />
    </PageContainer>
  );
};

export default Index;
