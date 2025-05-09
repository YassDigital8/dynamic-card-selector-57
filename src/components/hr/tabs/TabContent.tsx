
import React from 'react';
import { motion } from 'framer-motion';
import JobsTabContent from '../jobs/JobsTabContent';
import ApplicationsTabContent from '../applications/ApplicationsTabContent';
import CandidatesTabContent from '../candidates/CandidatesTabContent';
import { JobPosition } from '@/models/JobModel';
import { JobApplication, Candidate } from '@/models/ApplicationModel';

interface TabContentProps {
  activeTab: string;
  // Jobs props
  jobs: JobPosition[];
  selectedJob: JobPosition | null;
  isAddingJob: boolean;
  isEditingJob: boolean;
  isViewingDetails: boolean;
  isViewingJobApplications?: boolean;
  showDeleteDialog: boolean;
  onAddJob: () => void;
  onEditJob: (job: JobPosition) => void;
  onViewJobDetails: (job: JobPosition) => void;
  onViewJobApplications?: (job: JobPosition) => void;
  onDeleteJob: (job: JobPosition) => void;
  onJobFormSubmit: (jobData: JobPosition) => void;
  onConfirmDeleteJob: () => void;
  onCloseForm: () => void;
  onBackToList: () => void;
  onCloseDeleteDialog: () => void;
  
  // Applications props
  applications: JobApplication[];
  candidates: Candidate[];
  selectedApplication: JobApplication | null;
  isViewingApplication: boolean;
  onViewApplicationDetails: (application: JobApplication) => void;
  onUpdateApplicationStatus: (application: JobApplication, newStatus: JobApplication['status']) => void;
  onUpdateApplicationNotes?: (application: JobApplication, notes: string) => void;
  onScheduleInterview?: (application: JobApplication, interviewDate: string) => void;
  onSendOffer?: (application: JobApplication, offerDetails: string) => void;
  onCloseApplicationDetails: () => void;
  
  // Candidates props
  selectedCandidate: Candidate | null;
  onViewCandidateDetails: (candidate: Candidate) => void;
  onCancelEdit?: () => void;
  onDeleteCandidate: (candidate: Candidate) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  // Jobs props
  jobs,
  selectedJob,
  isAddingJob,
  isEditingJob,
  isViewingDetails,
  isViewingJobApplications = false,
  showDeleteDialog,
  onAddJob,
  onEditJob,
  onViewJobDetails,
  onViewJobApplications = () => {},
  onDeleteJob,
  onJobFormSubmit,
  onConfirmDeleteJob,
  onCloseForm,
  onBackToList,
  onCloseDeleteDialog,
  
  // Applications props
  applications,
  candidates,
  selectedApplication,
  isViewingApplication,
  onViewApplicationDetails,
  onUpdateApplicationStatus,
  onUpdateApplicationNotes,
  onScheduleInterview,
  onSendOffer,
  onCloseApplicationDetails,
  
  // Candidates props
  selectedCandidate,
  onViewCandidateDetails,
  onCancelEdit = () => {},
  onDeleteCandidate,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {activeTab === 'jobs' && (
        <JobsTabContent
          jobs={jobs}
          applications={applications}
          candidates={candidates}
          selectedJob={selectedJob}
          isAddingJob={isAddingJob}
          isEditingJob={isEditingJob}
          isViewingDetails={isViewingDetails}
          isViewingJobApplications={isViewingJobApplications}
          showDeleteDialog={showDeleteDialog}
          onAddJob={onAddJob}
          onEditJob={onEditJob}
          onViewJobDetails={onViewJobDetails}
          onViewJobApplications={onViewJobApplications}
          onDeleteJob={onDeleteJob}
          onJobFormSubmit={onJobFormSubmit}
          onConfirmDeleteJob={onConfirmDeleteJob}
          onCloseForm={onCloseForm}
          onBackToList={onBackToList}
          onCloseDeleteDialog={onCloseDeleteDialog}
          onViewApplicationDetails={onViewApplicationDetails}
          onUpdateApplicationStatus={onUpdateApplicationStatus}
        />
      )}

      {activeTab === 'applications' && (
        <ApplicationsTabContent
          applications={applications}
          jobs={jobs}
          candidates={candidates}
          selectedApplication={selectedApplication}
          isViewingApplication={isViewingApplication}
          onViewDetails={onViewApplicationDetails}
          onUpdateStatus={onUpdateApplicationStatus}
          onUpdateNotes={onUpdateApplicationNotes}
          onScheduleInterview={onScheduleInterview}
          onSendOffer={onSendOffer}
          onCloseDetails={onCloseApplicationDetails}
        />
      )}

      {activeTab === 'candidates' && (
        <CandidatesTabContent
          candidates={candidates}
          selectedCandidate={selectedCandidate}
          onViewDetails={onViewCandidateDetails}
          onCancelEdit={onCancelEdit}
          onDeleteCandidate={onDeleteCandidate}
        />
      )}
    </motion.div>
  );
};

export default TabContent;
