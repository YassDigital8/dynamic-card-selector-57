
import { useState } from 'react';
import { PageData, ApprovalStatus } from '@/models/PageModel';
import { updatePage } from '@/utils/pageApi';
import { useToast } from './use-toast';
import { usePageApprovals } from './usePageApprovals';
import useAuthentication from './useAuthentication';

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
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  const [isRequestingApproval, setIsRequestingApproval] = useState(false);
  const { toast } = useToast();
  const { userInfo } = useAuthentication();
  const { requestApproval } = usePageApprovals();
  
  // Determine if the user needs approval to publish
  const userRole = userInfo?.role || '';
  const needsApproval = userRole === 'Officer' || userRole === 'Editor';
  
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

  // Toggle page status between published/draft
  const handleToggleStatus = async () => {
    if (!pageData) return;
    
    const newStatus = pageData.status === 'published' ? 'draft' : 'published';
    
    // If publishing and needs approval, offer to request approval
    if (newStatus === 'published' && needsApproval) {
      toast({
        title: "Approval Required",
        description: "As an Officer, you need to request approval before publishing.",
      });
      return;
    }
    
    setIsTogglingStatus(true);
    
    const success = await updatePage({
      pageData,
      newStatus,
      selectedPOS,
      selectedLanguage,
      selectedSlug,
      selectedSubSlug,
    });
    
    if (success) {
      toast({
        title: "Success",
        description: `Page status changed to ${newStatus}`,
      });
      
      // Update the local pageData
      if (pageData) {
        pageData.status = newStatus;
      }
      
      // Refresh the page data to get the latest from the server
      if (onRefresh) {
        onRefresh();
      }
    }
    
    setIsTogglingStatus(false);
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
    
    // If needs approval, offer to request approval
    if (needsApproval) {
      toast({
        title: "Approval Required",
        description: "As an Officer, you need to request approval before publishing.",
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

  // Request approval for the page
  const handleRequestApproval = async () => {
    if (!pageData) return;
    
    setIsRequestingApproval(true);
    
    // Update page to include approval status
    const updatedPage: PageData = {
      ...pageData,
      approvalStatus: 'pending' as ApprovalStatus,
      createdBy: userInfo?.firstName || 'Current User'
    };
    
    // Request approval using the approvals hook
    const success = await requestApproval(updatedPage);
    
    if (success) {
      // Update the local page data
      if (pageData) {
        pageData.approvalStatus = 'pending';
      }
      
      // Refresh the page data
      if (onRefresh) {
        onRefresh();
      }
    }
    
    setIsRequestingApproval(false);
  };

  return {
    isEditing,
    editedTitle,
    editedContent,
    isSaving,
    isPublishing,
    isTogglingStatus,
    isRequestingApproval,
    userRole,
    setEditedTitle,
    setEditedContent,
    handleEdit,
    handleCancel,
    handleSave,
    handlePublish,
    handleToggleStatus,
    handleRequestApproval
  };
}
