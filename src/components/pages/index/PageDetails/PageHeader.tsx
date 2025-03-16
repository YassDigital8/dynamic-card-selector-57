
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X, RefreshCw, CheckCircle } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface PageHeaderProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onPublish?: () => void;
  isPublishing?: boolean;
  pageStatus?: string;
}

const PageHeader = ({ 
  isEditing, 
  isSaving, 
  onEdit, 
  onCancel, 
  onSave,
  onPublish,
  isPublishing,
  pageStatus
}: PageHeaderProps) => {
  return (
    <CardHeader className="bg-gray-50 border-b">
      <CardTitle className="flex items-center justify-between">
        <span>Page Details</span>
        {!isEditing ? (
          <div className="flex items-center gap-2">
            {pageStatus !== 'published' && onPublish && (
              <Button 
                variant="default" 
                size="sm"
                onClick={onPublish}
                disabled={isPublishing}
                className="gap-1 bg-green-600 hover:bg-green-700"
              >
                {isPublishing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Publish
                  </>
                )}
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={onEdit}
              className="gap-1"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onCancel}
              className="gap-1"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className="gap-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        )}
      </CardTitle>
    </CardHeader>
  );
};

export default PageHeader;
