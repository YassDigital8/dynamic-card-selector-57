
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PageData } from '@/models/PageModel';

// Components
import PageHeader from './PageHeader';
import PageDetailsView from './PageDetailsView';
import EmptyPageState from './EmptyPageState';
import PageFooter from './PageFooter';

interface PageDetailsProps {
  pageData: PageData | null;
  onRefresh?: () => void;
  onDelete?: () => void;
  selectedPOS?: string;
  selectedLanguage?: string;
  selectedSlug?: string;
  selectedSubSlug?: string;
  selectedPathId?: number | null;
  selectedSubPathId?: number | null;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const PageDetails = ({ 
  pageData, 
  onRefresh,
  onDelete,
  selectedPOS,
  selectedLanguage,
  selectedSlug,
  selectedSubSlug,
  selectedPathId,
  selectedSubPathId
}: PageDetailsProps) => {
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

  // Save changes using the API
  const handleSave = async () => {
    if (!pageData?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cannot update page: Missing page ID",
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      // Prepare the request body based on the existing page data
      const updateData = {
        id: pageData.id,
        pageUrlName: pageData.pageUrlName || `${selectedPOS}/${selectedLanguage}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`,
        language: selectedLanguage,
        pos: selectedPOS,
        title: editedTitle,
        status: pageData.status || 'draft',
        description: editedContent,
        segments: pageData.segments || []
      };
      
      console.log('Sending update with data:', updateData);
      
      const response = await fetch('https://staging.sa3d.online:7036/Page', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update page data: ${response.status} ${response.statusText}`);
      }

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
    } catch (error) {
      console.error('Error updating page data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update page data",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!pageData) {
    return (
      <Card className="bg-white shadow-md">
        <CardContent className="p-6">
          <EmptyPageState 
            onRefresh={onRefresh}
            selectedPOS={selectedPOS}
            selectedLanguage={selectedLanguage}
          />
        </CardContent>
      </Card>
    );
  }
  
  // Determine if we can show the delete button - only for specific pages, not landing pages
  const canDelete = Boolean(selectedSlug);
  console.log('canDelete value:', canDelete, 'selectedSlug:', selectedSlug);
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <Card className="bg-white shadow-md">
        <PageHeader 
          isEditing={isEditing}
          isSaving={isSaving}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSave={handleSave}
        />
        <CardContent className="p-6">
          <PageDetailsView 
            pageData={pageData}
            isEditing={isEditing}
            editedTitle={editedTitle}
            editedContent={editedContent}
            setEditedTitle={setEditedTitle}
            setEditedContent={setEditedContent}
            selectedPOS={selectedPOS}
            selectedLanguage={selectedLanguage}
            selectedSlug={selectedSlug}
            selectedSubSlug={selectedSubSlug}
            selectedPathId={selectedPathId}
            selectedSubPathId={selectedSubPathId}
          />
        </CardContent>
        <PageFooter 
          onRefresh={onRefresh} 
          onDelete={onDelete}
          canDelete={canDelete}
        />
      </Card>
    </motion.div>
  );
};

export default PageDetails;
