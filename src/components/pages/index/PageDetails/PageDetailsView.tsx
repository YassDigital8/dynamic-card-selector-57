
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface PageDetailsViewProps {
  pageData: any;
  isEditing: boolean;
  editedTitle: string;
  editedContent: string;
  setEditedTitle: (value: string) => void;
  setEditedContent: (value: string) => void;
  selectedPOS?: string;
  selectedLanguage?: string;
  selectedSlug?: string;
  selectedSubSlug?: string;
}

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PageDetailsView = ({
  pageData,
  isEditing,
  editedTitle,
  editedContent,
  setEditedTitle,
  setEditedContent,
  selectedPOS,
  selectedLanguage,
  selectedSlug,
  selectedSubSlug
}: PageDetailsViewProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Page URL</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-800 font-mono overflow-x-auto">
          {selectedSlug 
            ? `${selectedPOS?.toLowerCase()}/${selectedLanguage?.toLowerCase()}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`
            : `${selectedPOS?.toLowerCase()}/${selectedLanguage?.toLowerCase()}`
          }
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Title</h3>
        {isEditing ? (
          <Input 
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="font-medium"
          />
        ) : (
          <div className="text-lg font-medium text-gray-800">{pageData.title}</div>
        )}
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Content</h3>
        {isEditing ? (
          <Textarea 
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={6}
            className="resize-y"
          />
        ) : (
          <div className="p-4 bg-gray-50 rounded-md border border-gray-100 text-gray-700 whitespace-pre-wrap">
            {pageData.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageDetailsView;
