
import React from 'react';
import { motion } from 'framer-motion';
import { JobsTabs, TabContent } from './tabs';
import { useHRPageState } from './hooks/useHRPageState';
import { useJobsHandlers } from './hooks/useJobsHandlers';
import { useApplicationHandlers } from './hooks/useApplicationHandlers';
import { useCandidateHandlers } from './hooks/useCandidateHandlers';

const HRPage: React.FC = () => {
  // Get state and state setters from custom hook
  const {
    activeTab, setActiveTab,
    selectedJob, setSelectedJob,
    isAddingJob, setIsAddingJob,
    isEditingJob, setIsEditingJob,
    isViewingDetails, setIsViewingDetails,
    showDeleteDialog, setShowDeleteDialog,
    selectedApplication, setSelectedApplication,
    isViewingApplication, setIsViewingApplication,
    selectedCandidate, setSelectedCandidate,
  } = useHRPageState();
  
  // Get job handlers
  const {
    jobs,
    handleAddJob,
    handleEditJob,
    handleViewJobDetails,
    handleJobFormSubmit,
    handleDeleteJob,
    confirmDeleteJob,
    closeForm,
    backToList,
  } = useJobsHandlers(
    setSelectedJob,
    setIsAddingJob,
    setIsEditingJob,
    setIsViewingDetails,
    setShowDeleteDialog
  );
  
  // Get application handlers
  const {
    applications,
    handleViewApplicationDetails,
    handleUpdateApplicationStatus,
    handleCloseApplicationDetails
  } = useApplicationHandlers(
    setSelectedApplication,
    setIsViewingApplication
  );
  
  // Get candidate handlers
  const {
    candidates,
    handleViewCandidateDetails,
    handleEditCandidate,
    handleDeleteCandidate
  } = useCandidateHandlers(
    setSelectedCandidate
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between">
        <JobsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <TabContent
        activeTab={activeTab}
        // Jobs props
        jobs={jobs}
        selectedJob={selectedJob}
        isAddingJob={isAddingJob}
        isEditingJob={isEditingJob}
        isViewingDetails={isViewingDetails}
        showDeleteDialog={showDeleteDialog}
        onAddJob={handleAddJob}
        onEditJob={handleEditJob}
        onViewJobDetails={handleViewJobDetails}
        onDeleteJob={handleDeleteJob}
        onJobFormSubmit={handleJobFormSubmit}
        onConfirmDeleteJob={confirmDeleteJob}
        onCloseForm={closeForm}
        onBackToList={backToList}
        onCloseDeleteDialog={() => setShowDeleteDialog(false)}
        
        // Applications props
        applications={applications}
        candidates={candidates}
        selectedApplication={selectedApplication}
        isViewingApplication={isViewingApplication}
        onViewApplicationDetails={handleViewApplicationDetails}
        onUpdateApplicationStatus={handleUpdateApplicationStatus}
        onCloseApplicationDetails={handleCloseApplicationDetails}
        
        // Candidates props
        onViewCandidateDetails={handleViewCandidateDetails}
        onEditCandidate={handleEditCandidate}
        onDeleteCandidate={handleDeleteCandidate}
      />
    </motion.div>
  );
};

export default HRPage;
