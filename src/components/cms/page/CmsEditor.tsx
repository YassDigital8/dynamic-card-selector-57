
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CMSPage, CMSComponent, ComponentDefinition } from '@/hooks/cms';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, Eye, Upload } from 'lucide-react';
import ComponentList from '../editor/ComponentList';
import PageCanvas from '../editor/PageCanvas';
import ComponentEditor from '../editor/ComponentEditor';

interface CmsEditorProps {
  page: CMSPage;
  components: ComponentDefinition[];
  onAddComponent: (componentType: string, index?: number) => void;
  onUpdateComponent: (componentId: string, props: Record<string, any>) => void;
  onRemoveComponent: (componentId: string) => void;
  onMoveComponent: (componentId: string, direction: 'up' | 'down') => void;
  onSavePage: () => boolean;
  onPublishPage: () => void;
  onPreview: () => void;
}

const CmsEditor: React.FC<CmsEditorProps> = ({
  page,
  components,
  onAddComponent,
  onUpdateComponent,
  onRemoveComponent,
  onMoveComponent,
  onSavePage,
  onPublishPage,
  onPreview,
}) => {
  const [editorTab, setEditorTab] = useState('components');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  
  const selectedComponent = selectedComponentId 
    ? page.components.find(c => c.id === selectedComponentId) 
    : null;
  
  const handleComponentSelect = (id: string | null) => {
    setSelectedComponentId(id);
    if (id) {
      setEditorTab('properties');
    }
  };
  
  return (
    <div className="flex h-[calc(100vh-200px)]">
      {/* Left sidebar - Component Library */}
      <div className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-medium">Page Editor</h3>
          <p className="text-sm text-slate-500">{page.title}</p>
        </div>
        
        <Tabs value={editorTab} onValueChange={setEditorTab} className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start px-4 py-2 bg-slate-100">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="properties" disabled={!selectedComponent}>Properties</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1">
            <TabsContent value="components" className="m-0 p-4">
              <ComponentList 
                components={components} 
                onAddComponent={onAddComponent} 
              />
            </TabsContent>
            
            <TabsContent value="properties" className="m-0 p-4">
              {selectedComponent && (
                <ComponentEditor 
                  component={selectedComponent}
                  componentDefinition={components.find(c => c.id === selectedComponent.type)}
                  onUpdate={(props) => onUpdateComponent(selectedComponent.id, props)}
                />
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
      
      {/* Main content - Canvas */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="bg-white p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{page.title}</h2>
            <p className="text-sm text-gray-500">/{page.slug}</p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={onPreview}>
              <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
            <Button size="sm" onClick={onSavePage}>
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
            <Button 
              size="sm" 
              onClick={onPublishPage}
              className="bg-green-600 hover:bg-green-700"
            >
              <Upload className="h-4 w-4 mr-2" /> Publish
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-6">
          <PageCanvas
            components={page.components}
            onSelectComponent={handleComponentSelect}
            selectedComponentId={selectedComponentId}
            onRemoveComponent={onRemoveComponent}
            onMoveComponent={onMoveComponent}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CmsEditor;
