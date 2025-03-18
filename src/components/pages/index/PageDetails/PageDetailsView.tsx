
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageData } from '@/models/PageModel';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

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
  selectedPathId?: number | null;
  selectedSubPathId?: number | null;
  validationErrors?: {
    title?: string;
    content?: string;
  };
}

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
  selectedSubSlug,
  validationErrors = {}
}: PageDetailsViewProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-3 md:space-y-6">
      <div>
        <h3 className="text-[10px] md:text-sm font-medium text-gray-500 mb-1 md:mb-2">Page URL</h3>
        <div className={`bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md p-1.5 md:p-3 font-mono overflow-x-auto text-[8px] md:text-xs`}>
          {selectedSlug 
            ? `${selectedPOS?.toLowerCase()}/${selectedLanguage?.toLowerCase()}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`
            : `${selectedPOS?.toLowerCase()}/${selectedLanguage?.toLowerCase()}`
          }
        </div>
      </div>
      
      <Separator />
      
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] md:text-sm font-medium text-gray-500 mb-1 md:mb-2">Title</h3>
        {pageData.status && (
          <Badge variant={pageData.status === 'published' ? 'default' : 'secondary'} className="capitalize">
            {pageData.status}
          </Badge>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-2">
          <Input 
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="font-medium text-xs md:text-base"
            error={!!validationErrors.title}
          />
          {validationErrors.title && (
            <p className="text-sm text-destructive">{validationErrors.title}</p>
          )}
        </div>
      ) : (
        <div className="text-xs md:text-lg font-medium text-gray-800 dark:text-gray-200 break-words">{pageData.title}</div>
      )}
      
      <div>
        <h3 className="text-[10px] md:text-sm font-medium text-gray-500 mb-1 md:mb-2">Content</h3>
        {isEditing ? (
          <div className="space-y-2">
            <Textarea 
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={isMobile ? 3 : 6}
              className="resize-y text-[10px] md:text-sm"
              error={!!validationErrors.content}
            />
            {validationErrors.content && (
              <p className="text-sm text-destructive">{validationErrors.content}</p>
            )}
          </div>
        ) : (
          <div className="p-1.5 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-100 dark:border-gray-600 text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-[9px] md:text-sm overflow-x-auto">
            {pageData.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageDetailsView;
