
import { useState } from 'react';
import { PageData } from '@/models/PageModel';
import { updatePage } from '@/utils/pageApi';
import { useToast } from './use-toast';

interface UsePageEditProps {
  pageData: PageData | null;
  onRefresh?: () => void;
  selectedPOS?: string;
  selectedLanguage?: string;
  selectedSlug?: string;
  selectedSubSlug?: string;
}

export function usePageEdit({
  pageData,
  onRefresh,
  selectedPOS,
  selectedLanguage,
  selectedSlug,
  selectedSubSlug,
}: UsePageEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();
  
  // Start editing with current values
  const handleEdit = () => {
    if (pageData) {
      setEditedTitle(pageData.title || '');
      setEditedContent(pageData.content || '');
      setIsEditing(true);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Save changes using the API
  const handleSave = async () => {
    if (!pageData) return;
    
    setIsSaving(true);
    
    const success = await updatePage({
      pageData,
      newTitle: editedTitle,
      newContent: editedContent,
      selectedPOS,
      selectedLanguage,
      selectedSlug,
      selectedSubSlug,
    });
    
    if (success) {
      toast({
        title: "Success",
        description: "Page data updated successfully",
      });
      
      // Update the local pageData
      if (pageData) {
        pageData.title = editedTitle;
        pageData.content = editedContent;
      }
      
      // Refresh the page data to get the latest from the server
      if (onRefresh) {
        onRefresh();
      }
      
      setIsEditing(false);
    }
    
    setIsSaving(false);
  };

  // Change page status from draft to published
  const handlePublish = async () => {
    if (!pageData) return;
    
    if (pageData.status === 'published') {
      toast({
        title: "Info",
        description: "This page is already published",
      });
      return;
    }
    
    setIsPublishing(true);
    
    const success = await updatePage({
      pageData,
      newStatus: 'published',
      selectedPOS,
      selectedLanguage,
      selectedSlug,
      selectedSubSlug,
    });
    
    if (success) {
      toast({
        title: "Success",
        description: "Page published successfully",
      });
      
      // Update the local pageData
      if (pageData) {
        pageData.status = 'published';
      }
      
      // Refresh the page data to get the latest from the server
      if (onRefresh) {
        onRefresh();
      }
    }
    
    setIsPublishing(false);
  };

  return {
    isEditing,
    editedTitle,
    editedContent,
    isSaving,
    isPublishing,
    setEditedTitle,
    setEditedContent,
    handleEdit,
    handleCancel,
    handleSave,
    handlePublish
  };
}
