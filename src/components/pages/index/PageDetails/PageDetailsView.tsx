
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageData } from '@/models/PageModel';
import { useIsMobile } from '@/hooks/use-mobile';
import SlugPath from '../pageSelector/SlugPath';

interface PageDetailsViewProps {
  pageData: PageData;
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

const PageDetailsView = ({
  pageData,
  isEditing,
  editedTitle,
  editedContent,
  setEditedTitle,
  setEditedContent,
  selectedPOS = '',
  selectedLanguage = '',
  selectedSlug = '',
  selectedSubSlug = ''
}: PageDetailsViewProps) => {
  const isMobile = useIsMobile();
  
  // Format the content to preserve line breaks
  const formattedContent = pageData.content
    .split('\n')
    .map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < pageData.content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  
  return (
    <div className="space-y-3 md:space-y-6">
      <div>
        <h3 className="text-[10px] md:text-sm font-medium text-gray-500 mb-1 md:mb-2">Page URL</h3>
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md p-1.5 md:p-3 overflow-x-auto">
          <SlugPath 
            selectedPOS={selectedPOS}
            selectedLanguage={selectedLanguage}
            selectedSlug={selectedSlug}
            selectedSubSlug={selectedSubSlug}
          />
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-[10px] md:text-sm font-medium text-gray-500 mb-1 md:mb-2">Title</h3>
        {isEditing ? (
          <Input 
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="font-medium text-xs md:text-base"
          />
        ) : (
          <div className="text-xs md:text-lg font-medium text-gray-800 dark:text-gray-200 break-words">{pageData.title}</div>
        )}
      </div>
      
      <div>
        <h3 className="text-[10px] md:text-sm font-medium text-gray-500 mb-1 md:mb-2">Content</h3>
        {isEditing ? (
          <Textarea 
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={isMobile ? 3 : 6}
            className="resize-y text-[10px] md:text-sm"
          />
        ) : (
          <div className="p-1.5 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-100 dark:border-gray-600 text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-[9px] md:text-sm overflow-x-auto">
            {formattedContent}
          </div>
        )}
      </div>
      
      {pageData.lastUpdated && (
        <div className="text-[8px] md:text-xs text-gray-500">
          Last updated: {new Date(pageData.lastUpdated).toLocaleString()}
        </div>
      )}
      
      {pageData.status && (
        <div className="text-[8px] md:text-xs">
          Status: <span className={`font-medium ${pageData.status === 'published' ? 'text-green-600' : 'text-orange-500'}`}>
            {pageData.status.charAt(0).toUpperCase() + pageData.status.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PageDetailsView;
