
import React from 'react';
import { CMSPage } from '@/hooks/cms/types';
import RenderComponent from '../render/RenderComponent';
import { Button } from '@/components/ui/button';
import { Eye, ArrowLeft } from 'lucide-react';

interface CmsPagePreviewProps {
  page: CMSPage;
  onBack?: () => void;
}

const CmsPagePreview: React.FC<CmsPagePreviewProps> = ({ page, onBack }) => {
  const handleViewInNewTab = () => {
    // In a real implementation, this would open the published page in a new tab
    window.open(`/preview/${page.slug}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{page.title}</h2>
          <p className="text-gray-500">Page Preview</p>
        </div>
        
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Editor
          </Button>
          <Button variant="outline" size="sm" onClick={handleViewInNewTab}>
            <Eye className="h-4 w-4 mr-2" /> View in New Tab
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg p-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-10">
          {page.components.length > 0 ? (
            page.components.map(component => (
              <RenderComponent key={component.id} component={component} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              This page doesn't have any components yet. Add some in the editor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CmsPagePreview;
