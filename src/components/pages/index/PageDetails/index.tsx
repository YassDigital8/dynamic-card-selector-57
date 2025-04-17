
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { PageData } from '@/models/PageModel';
import { usePageEdit } from '@/hooks/usePageEdit';
import useAuthentication from '@/hooks/useAuthentication';

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
  const { userInfo } = useAuthentication();
  const {
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
          onRequestApproval={handleRequestApproval}
          isPublishing={isPublishing}
          isTogglingStatus={isTogglingStatus}
          isRequestingApproval={isRequestingApproval}
          pageStatus={pageData.status}
          approvalStatus={pageData.approvalStatus}
          userRole={userInfo?.role}
          page={pageData}
        />
        <CardContent className="p-6">
          <PageDetailsView 
            page={pageData}
            onUpdatePage={handleSave}
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
