
import React, { useState } from 'react';
import { JobsTabs } from './tabs';
import { motion } from 'framer-motion';
import JobList from './jobs/JobList';
import { useJobsData } from '@/hooks/hr/useJobsData';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { JobPosition } from '@/models/JobModel';
import JobForm from './jobs/JobForm';
import JobDetails from './jobs/JobDetails';
import DeleteJobDialog from './jobs/DeleteJobDialog';

const HRPage: React.FC = () => {
  const { jobs, addJob, updateJob, deleteJob } = useJobsData();
  const [activeTab, setActiveTab] = useState<string>('jobs');
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
        <Button 
          onClick={handleAddJob}
          className="flex items-center gap-2"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          Post New Job
        </Button>
      </div>

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
    </motion.div>
  );
};

export default HRPage;
