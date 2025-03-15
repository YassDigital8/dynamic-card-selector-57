
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
  selectedSubSlug
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
  const canDelete = !!selectedSlug;
  
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
