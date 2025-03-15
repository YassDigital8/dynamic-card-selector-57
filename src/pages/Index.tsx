
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Settings, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [activeTab, setActiveTab] = useState("pages");
  
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="pages" className="data-[state=active]:bg-white gap-2">
              <FileText className="h-4 w-4" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={() => pageAddition.setAddPageDialogOpen(true)}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={pageNavigation.loading || !pageNavigation.selectedPOS || !pageNavigation.selectedLanguage}
          >
            <PlusCircle className="h-4 w-4" />
            New Page
          </Button>
        </div>
        
        <TabsContent value="pages" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <PageSelectors 
                posOptions={pageNavigation.posOptions}
                languageOptions={pageNavigation.languageOptions}
                selectedPOS={pageNavigation.selectedPOS}
                selectedLanguage={pageNavigation.selectedLanguage}
                setSelectedPOS={pageNavigation.setSelectedPOS}
                setSelectedLanguage={pageNavigation.setSelectedLanguage}
                loading={pageNavigation.loading}
              />
              
              <div className="h-6"></div>
              
              <PathSelectors 
                availableSlugs={pageNavigation.availableSlugs}
                selectedSlug={pageNavigation.selectedSlug}
                setSelectedSlug={pageNavigation.setSelectedSlug}
                subSlugs={pageNavigation.subSlugs}
                selectedSubSlug={pageNavigation.selectedSubSlug}
                setSelectedSubSlug={pageNavigation.setSelectedSubSlug}
                loading={pageNavigation.loading}
                selectedPOS={pageNavigation.selectedPOS}
                selectedLanguage={pageNavigation.selectedLanguage}
                onAddPageClick={() => pageAddition.setAddPageDialogOpen(true)}
              />
            </div>
            
            <div className="md:col-span-2">
              <PageData 
                pageData={pageNavigation.pageData} 
                onRefresh={pageNavigation.refreshPageData}
                selectedPOS={pageNavigation.selectedPOS}
                selectedLanguage={pageNavigation.selectedLanguage}
                selectedSlug={pageNavigation.selectedSlug}
                selectedSubSlug={pageNavigation.selectedSubSlug}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600">
              This section will contain settings for page management. Currently under development.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
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
