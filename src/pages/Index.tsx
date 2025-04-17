
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Settings, PlusCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

// Custom hooks
import usePageNavigation from '@/hooks/usePageNavigation';
import usePageAddition from '@/hooks/usePageAddition';
import useAuthentication from '@/hooks/useAuthentication';
import { usePageApprovals } from '@/hooks/usePageApprovals';

// Components
import LoadingScreen from '@/components/pages/index/LoadingScreen';
import PageSelectors from '@/components/pages/index/PageSelectors';
import PathSelectors from '@/components/pages/index/PathSelectors';
import PageData from '@/components/pages/index/PageData';
import AddPageDialog from '@/components/pages/index/addPageDialog';
import PageContainer from '@/components/pages/index/PageContainer';
import PagesTour from '@/components/pages/index/PagesTour';
import AuthenticatedContent from '@/components/pages/index/AuthenticatedContent';
import PendingApprovalBadge from '@/components/pages/approval/PendingApprovalBadge';
import { Link } from 'react-router-dom';

const Index = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pages");
  const { userInfo } = useAuthentication();
  const { pendingApprovals } = usePageApprovals();
  const hasPendingApprovals = pendingApprovals.length > 0;

  // Refs for tour highlights
  const pageSelectorsRef = useRef<HTMLDivElement>(null);
  const pathSelectorsRef = useRef<HTMLDivElement>(null);
  const pageDataRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  
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

  if (initialLoading) {
    return <LoadingScreen />;
  }

  // Check if the user has supervisor role or higher to show approvals
  const canApprove = userInfo?.role === 'Supervisor' || 
                    userInfo?.role === 'Manager' || 
                    userInfo?.role === 'Admin' || 
                    userInfo?.role === 'Super Admin';

  return (
    <PageContainer>
      <AuthenticatedContent userInfo={userInfo} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div ref={tabsRef} className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="pages" className="data-[state=active]:bg-white gap-2 text-black dark:text-black">
                <FileText className="h-4 w-4" />
                Pages
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white gap-2 text-black dark:text-black">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            {canApprove && (
              <Link to="/page-approvals" className="ml-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Approvals
                  {hasPendingApprovals && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {pendingApprovals.length}
                    </span>
                  )}
                </Button>
              </Link>
            )}
          </div>
          
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
          <ResizablePanelGroup direction="horizontal" className="min-h-[500px]">
            <ResizablePanel defaultSize={40} minSize={30}>
              <div className="h-full pr-4 overflow-auto">
                <div ref={pageSelectorsRef}>
                  <PageSelectors 
                    posOptions={pageNavigation.posOptions}
                    languageOptions={pageNavigation.languageOptions}
                    selectedPOS={pageNavigation.selectedPOS}
                    selectedLanguage={pageNavigation.selectedLanguage}
                    setSelectedPOS={pageNavigation.setSelectedPOS}
                    setSelectedLanguage={pageNavigation.setSelectedLanguage}
                    loading={pageNavigation.loading}
                    currentStep={pageNavigation.currentStep}
                  />
                </div>
                
                {pageNavigation.currentStep === 'options' && (
                  <div ref={pathSelectorsRef} className="mt-6">
                    <PathSelectors 
                      availableSlugs={pageNavigation.availableSlugs}
                      selectedSlug={pageNavigation.selectedSlug}
                      setSelectedSlug={pageNavigation.setSelectedSlug}
                      subSlugs={pageNavigation.subSlugs}
                      selectedSubSlug={pageNavigation.selectedSubSlug}
                      setSelectedSubSlug={pageNavigation.setSelectedSubSlug}
                      selectedPathId={pageNavigation.selectedPathId}
                      selectedSubPathId={pageNavigation.selectedSubPathId}
                      slugsWithIds={pageNavigation.slugsWithIds}
                      subSlugsWithIds={pageNavigation.subSlugsWithIds}
                      loading={pageNavigation.loading}
                      selectedPOS={pageNavigation.selectedPOS}
                      selectedLanguage={pageNavigation.selectedLanguage}
                      onAddPageClick={() => pageAddition.setAddPageDialogOpen(true)}
                      currentStep={pageNavigation.currentStep}
                    />
                  </div>
                )}
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={60}>
              <div ref={pageDataRef} className="h-full pl-4 overflow-auto">
                <PageData 
                  pageData={pageNavigation.pageData} 
                  onRefresh={pageNavigation.refreshPageData}
                  onDelete={pageNavigation.deletePage}
                  selectedPOS={pageNavigation.selectedPOS}
                  selectedLanguage={pageNavigation.selectedLanguage}
                  selectedSlug={pageNavigation.selectedSlug}
                  selectedSubSlug={pageNavigation.selectedSubSlug}
                  selectedPathId={pageNavigation.selectedPathId}
                  selectedSubPathId={pageNavigation.selectedSubPathId}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
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

      <PagesTour 
        pageSelectorsRef={pageSelectorsRef}
        pathSelectorsRef={pathSelectorsRef}
        pageDataRef={pageDataRef}
        tabsRef={tabsRef}
      />
    </PageContainer>
  );
};

export default Index;
