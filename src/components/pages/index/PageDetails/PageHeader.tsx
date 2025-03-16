
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X, RefreshCw, CheckCircle } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

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
  pageStatus
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
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Draft</span>
                  <div className="w-16">
                    <Slider
                      defaultValue={[isPublished ? 100 : 0]}
                      max={100}
                      step={100}
                      disabled={isTogglingStatus}
                      onValueChange={(value) => {
                        const newValue = value[0] > 50;
                        if (newValue !== isPublished) {
                          onToggleStatus();
                        }
                      }}
                      className={isPublished ? "bg-gray-200" : ""}
                    />
                  </div>
                  <span className={`text-xs ${isPublished ? "text-green-600 font-medium" : "text-gray-600"}`}>
                    Published
                  </span>
                </div>
                {isTogglingStatus && (
                  <RefreshCw className="h-4 w-4 animate-spin text-gray-500" />
                )}
              </div>
            )}
            {!isPublished && onPublish && (
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
