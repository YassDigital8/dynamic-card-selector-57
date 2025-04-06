
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { JobsTabs, TabContent } from './tabs';
import { useHRPageState } from './hooks/useHRPageState';
import { useJobsHandlers } from './hooks/useJobsHandlers';
import { useApplicationHandlers } from './hooks/useApplicationHandlers';
import { useCandidateHandlers } from './hooks/useCandidateHandlers';
import DashboardSummary from './dashboard/DashboardSummary';

const HRPage: React.FC = () => {
  // Get state and state setters from custom hook
  const {
    activeTab, setActiveTab,
    selectedJob, setSelectedJob,
    isAddingJob, setIsAddingJob,
    isEditingJob, setIsEditingJob,
    isViewingDetails, setIsViewingDetails,
    isViewingJobApplications, setIsViewingJobApplications,
    showDeleteDialog, setShowDeleteDialog,
    selectedApplication, setSelectedApplication,
    isViewingApplication, setIsViewingApplication,
    selectedCandidate, setSelectedCandidate,
    isEditingCandidate, setIsEditingCandidate,
  } = useHRPageState();
  
  const [currentView, setCurrentView] = useState<'dashboard' | 'manage'>('dashboard');
  
  // Get job handlers
  const {
    jobs,
    handleAddJob,
    handleEditJob,
    handleViewJobDetails,
    handleViewJobApplications,
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
    setIsViewingJobApplications,
    setShowDeleteDialog
  );
  
  // Get application handlers
  const {
    applications,
    handleViewApplicationDetails,
    handleUpdateApplicationStatus,
    handleUpdateApplicationNotes,
    handleScheduleInterview,
    handleSendOffer,
    handleCloseApplicationDetails
  } = useApplicationHandlers(
    setSelectedApplication,
    setIsViewingApplication
  );
  
  // Get candidate handlers
  const {
    candidates,
    isEditingCandidate: isCandidateInEditMode,
    handleViewCandidateDetails,
    handleEditCandidate,
    handleSaveCandidate,
    handleCancelEdit,
    handleDeleteCandidate
  } = useCandidateHandlers(
    setSelectedCandidate
  );

  // Update the HRPageState with the edit state from candidate handlers
  React.useEffect(() => {
    setIsEditingCandidate(isCandidateInEditMode);
  }, [isCandidateInEditMode, setIsEditingCandidate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Calculate counts for the dashboard
  const openPositions = jobs.filter(job => job.status !== 'Closed').length;

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Tabs 
        defaultValue="dashboard" 
        value={currentView}
        onValueChange={(v) => setCurrentView(v as 'dashboard' | 'manage')}
        className="w-full"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-4 border-b mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Human Resources</h1>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="mt-0">
          <DashboardSummary 
            jobs={jobs} 
            applications={applications} 
            openPositions={openPositions}
            candidatesCount={candidates.length}
          />
        </TabsContent>

        <TabsContent value="manage" className="mt-0">
          <div className="flex items-center justify-between mb-6">
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
            isViewingJobApplications={isViewingJobApplications}
            showDeleteDialog={showDeleteDialog}
            onAddJob={handleAddJob}
            onEditJob={handleEditJob}
            onViewJobDetails={handleViewJobDetails}
            onViewJobApplications={handleViewJobApplications}
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
            onUpdateApplicationNotes={handleUpdateApplicationNotes}
            onScheduleInterview={handleScheduleInterview}
            onSendOffer={handleSendOffer}
            onCloseApplicationDetails={handleCloseApplicationDetails}
            
            // Candidates props
            selectedCandidate={selectedCandidate}
            isEditingCandidate={isEditingCandidate}
            onViewCandidateDetails={handleViewCandidateDetails}
            onEditCandidate={handleEditCandidate}
            onSaveCandidate={handleSaveCandidate}
            onCancelEdit={handleCancelEdit}
            onDeleteCandidate={handleDeleteCandidate}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default HRPage;
