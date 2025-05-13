
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CMSPageList from '@/components/cms/CMSPageList';
import CMSEditor from '@/components/cms/CMSEditor';
import CMSPagePreview from '@/components/cms/CMSPagePreview';

interface CmsPageViewProps {
  currentView: string;
  setCurrentView: (value: string) => void;
  pages: any[];
  selectedPage: any;
  components: any[];
  loading: boolean;
  onCreatePage: (title: string, slug: string, template: string) => Promise<void>;
  onSelectPage: (id: string) => void;
  onAddComponent: (componentType: string) => void;
  onUpdateComponent: (componentId: string, props: Record<string, any>) => void;
  onRemoveComponent: (componentId: string) => void;
  onMoveComponent: (componentId: string, direction: 'up' | 'down') => void;
  onSavePage: () => boolean; // Changed to be consistently boolean
  onPublishPage: () => void;
}

const CmsPageView: React.FC<CmsPageViewProps> = ({
  currentView,
  setCurrentView,
  pages,
  selectedPage,
  components,
  loading,
  onCreatePage,
  onSelectPage,
  onAddComponent,
  onUpdateComponent,
  onRemoveComponent,
  onMoveComponent,
  onSavePage,
  onPublishPage,
}) => {
  return (
    <Tabs value={currentView} onValueChange={setCurrentView} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="pages" className="data-[state=active]:bg-white">
          Pages
        </TabsTrigger>
        {selectedPage && (
          <TabsTrigger value="editor" className="data-[state=active]:bg-white">
            Page Editor
          </TabsTrigger>
        )}
        {selectedPage && (
          <TabsTrigger value="preview" className="data-[state=active]:bg-white">
            Preview
          </TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="pages" className="mt-0">
        <CMSPageList 
          pages={pages}
          loading={loading}
          onCreatePage={onCreatePage}
          onSelectPage={onSelectPage}
        />
      </TabsContent>
      
      {selectedPage && (
        <TabsContent value="editor" className="mt-0">
          <CMSEditor 
            page={selectedPage}
            components={components}
            onAddComponent={onAddComponent}
            onUpdateComponent={onUpdateComponent}
            onRemoveComponent={onRemoveComponent}
            onMoveComponent={onMoveComponent}
            onSavePage={onSavePage}
            onPublishPage={onPublishPage}
          />
        </TabsContent>
      )}
      
      {selectedPage && (
        <TabsContent value="preview" className="mt-0">
          <CMSPagePreview page={selectedPage} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default CmsPageView;
