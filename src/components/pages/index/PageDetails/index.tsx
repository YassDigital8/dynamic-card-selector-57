
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { PageData } from '@/models/PageModel';
import { usePageEdit } from '@/hooks/usePageEdit';

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
  const {
    isEditing,
    editedTitle,
    editedContent,
    isSaving,
    isPublishing,
    isTogglingStatus,
    setEditedTitle,
    setEditedContent,
    handleEdit,
    handleCancel,
    handleSave,
    handlePublish,
    handleToggleStatus
  } = usePageEdit({
    pageData,
    onRefresh,
    selectedPOS,
    selectedLanguage,
    selectedSlug,
    selectedSubSlug
  });

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
          onPublish={handlePublish}
          onToggleStatus={handleToggleStatus}
          isPublishing={isPublishing}
          isTogglingStatus={isTogglingStatus}
          pageStatus={pageData.status}
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
