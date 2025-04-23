
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
  onToggleStatus?: () => void;
  isPublishing?: boolean;
  isTogglingStatus?: boolean;
  pageStatus?: string;
  page?: any;  // Added to match usage in PageDetailsView
}

const PageHeader = ({ 
  isEditing, 
  isSaving, 
  onEdit, 
  onCancel, 
  onSave,
  onPublish,
  onToggleStatus,
  isPublishing,
  isTogglingStatus,
  pageStatus,
  page
}: PageHeaderProps) => {
  const isPublished = pageStatus === 'published';

  return (
    <CardHeader className="bg-gray-50 border-b">
      <CardTitle className="flex items-center justify-between">
        <span>Page Details</span>
        {!isEditing ? (
          <div className="flex items-center gap-2">
            {onToggleStatus && (
              <div className="flex items-center gap-3 mr-2">
                <div className="text-sm font-medium">
                  Status: 
                  <span className={`ml-2 px-2 py-1 rounded ${isPublished 
                    ? "bg-green-100 text-green-700" 
                    : "bg-gray-100 text-gray-700"}`}>
                    {isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleStatus}
                  disabled={isTogglingStatus}
                  className={`gap-1 ${isPublished 
                    ? "border-gray-300" 
                    : "border-green-300"}`}
                >
                  {isTogglingStatus ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <span>{isPublished ? 'Set as Draft' : 'Publish'}</span>
                    </>
                  )}
                </Button>
              </div>
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
