
import React, { useState } from 'react';
import { JobsTabs } from './tabs';
import { motion } from 'framer-motion';
import JobList from './jobs/JobList';
import { useJobsData } from '@/hooks/hr/useJobsData';
import { useApplicationsData } from '@/hooks/hr/useApplicationsData';
import { useCandidatesData } from '@/hooks/hr/useCandidatesData';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { JobPosition } from '@/models/JobModel';
import { JobApplication, Candidate } from '@/models/ApplicationModel';
import JobForm from './jobs/JobForm';
import JobDetails from './jobs/JobDetails';
import DeleteJobDialog from './jobs/DeleteJobDialog';
import { ApplicationList } from './applications';
import { CandidateList } from './candidates';

const HRPage: React.FC = () => {
  const { jobs, addJob, updateJob, deleteJob } = useJobsData();
  const { applications, updateApplication } = useApplicationsData();
  const { candidates } = useCandidatesData();
  
  const [activeTab, setActiveTab] = useState<string>('jobs');
  
  // Jobs state
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Applications state
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  
  // Candidates state
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Job handlers
  const handleAddJob = () => {
    setIsAddingJob(true);
    setSelectedJob(null);
    setIsViewingDetails(false);
    setIsEditingJob(false);
  };

  const handleEditJob = (job: JobPosition) => {
    setSelectedJob(job);
    setIsEditingJob(true);
    setIsViewingDetails(false);
    setIsAddingJob(false);
  };

  const handleViewJobDetails = (job: JobPosition) => {
    setSelectedJob(job);
    setIsViewingDetails(true);
    setIsEditingJob(false);
    setIsAddingJob(false);
  };

  const handleJobFormSubmit = (jobData: JobPosition) => {
    if (isEditingJob && selectedJob) {
      updateJob(jobData);
    } else {
      addJob(jobData);
    }
    setIsAddingJob(false);
    setIsEditingJob(false);
    setSelectedJob(null);
  };

  const handleDeleteJob = (job: JobPosition) => {
    setSelectedJob(job);
    setShowDeleteDialog(true);
  };

  const confirmDeleteJob = () => {
    if (selectedJob) {
      deleteJob(selectedJob.id);
      setShowDeleteDialog(false);
      setSelectedJob(null);
      setIsViewingDetails(false);
    }
  };

  const closeForm = () => {
    setIsAddingJob(false);
    setIsEditingJob(false);
    setSelectedJob(null);
  };

  const backToList = () => {
    setIsViewingDetails(false);
    setSelectedJob(null);
  };
  
  // Application handlers
  const handleViewApplicationDetails = (application: JobApplication) => {
    setSelectedApplication(application);
    // TODO: Implement application details view
  };
  
  const handleUpdateApplicationStatus = (application: JobApplication, newStatus: JobApplication['status']) => {
    updateApplication({ ...application, status: newStatus });
  };
  
  // Candidate handlers
  const handleViewCandidateDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    // TODO: Implement candidate details view
  };
  
  const handleEditCandidate = (candidate: Candidate) => {
    // TODO: Implement candidate edit
  };
  
  const handleDeleteCandidate = (candidate: Candidate) => {
    // TODO: Implement candidate delete
  };
  
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
        {activeTab === 'jobs' && (
          <Button 
            onClick={handleAddJob}
            className="flex items-center gap-2"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            Post New Job
          </Button>
        )}
      </div>

      {activeTab === 'jobs' && (
        <>
          {isAddingJob || isEditingJob ? (
            <JobForm 
              initialData={isEditingJob ? selectedJob : undefined} 
              onSubmit={handleJobFormSubmit} 
              onCancel={closeForm}
            />
          ) : isViewingDetails && selectedJob ? (
            <JobDetails 
              job={selectedJob} 
              onEdit={() => handleEditJob(selectedJob)}
              onDelete={() => handleDeleteJob(selectedJob)}
              onBack={backToList}
            />
          ) : (
            <JobList 
              jobs={jobs} 
              onViewDetails={handleViewJobDetails}
              onEditJob={handleEditJob}
              onDeleteJob={handleDeleteJob}
            />
          )}

          <DeleteJobDialog 
            job={selectedJob}
            isOpen={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            onConfirm={confirmDeleteJob}
          />
        </>
      )}

      {activeTab === 'applications' && (
        <ApplicationList 
          applications={applications}
          onViewDetails={handleViewApplicationDetails}
          onUpdateStatus={handleUpdateApplicationStatus}
        />
      )}

      {activeTab === 'candidates' && (
        <CandidateList 
          candidates={candidates}
          onViewDetails={handleViewCandidateDetails}
          onEditCandidate={handleEditCandidate}
          onDeleteCandidate={handleDeleteCandidate}
        />
      )}
    </motion.div>
  );
};

export default HRPage;
