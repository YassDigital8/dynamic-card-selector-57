
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Edit2, Save, X, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PageDataProps {
  pageData: any | null;
  onRefresh?: () => void;
  selectedPOS?: string;
  selectedLanguage?: string;
  selectedSlug?: string;
  selectedSubSlug?: string;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const PageData = ({ 
  pageData, 
  onRefresh,
  selectedPOS,
  selectedLanguage,
  selectedSlug,
  selectedSubSlug
}: PageDataProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Start editing with current values
  const handleEdit = () => {
    setEditedTitle(pageData?.title || '');
    setEditedContent(pageData?.content || '');
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Save changes (mock implementation)
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Page data updated successfully",
      });
      
      // Update the local pageData (in a real implementation, this would come from reloading the data)
      if (pageData) {
        pageData.title = editedTitle;
        pageData.content = editedContent;
      }
      
      setIsEditing(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update page data",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!pageData) {
    return (
      <Card className="bg-white shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
            <p className="mb-4">Select a page to view its details</p>
            {(selectedPOS && selectedLanguage && selectedSlug) && (
              <Button 
                variant="outline" 
                onClick={onRefresh}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Fetch Page Data
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <Card className="bg-white shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center justify-between">
            <span>Page Details</span>
            {!isEditing ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleEdit}
                className="gap-1"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCancel}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleSave}
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
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Page URL</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-800 font-mono overflow-x-auto">
              {`${selectedPOS?.toLowerCase()}/${selectedLanguage?.toLowerCase()}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`}
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
        </CardContent>
        <CardFooter className="bg-gray-50 border-t">
          <div className="w-full flex justify-end">
            <Button 
              variant="outline" 
              onClick={onRefresh}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PageData;
