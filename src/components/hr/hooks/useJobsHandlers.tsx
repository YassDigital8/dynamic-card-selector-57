
import { useState } from 'react';
import { toast } from 'sonner';
import { JobPosition } from '@/models/JobModel';
import { useJobsData } from '@/hooks/hr/useJobsData';

export const useJobsHandlers = (
  setSelectedJob: (job: JobPosition | null) => void,
  setIsAddingJob: (isAdding: boolean) => void,
  setIsEditingJob: (isEditing: boolean) => void,
  setIsViewingDetails: (isViewing: boolean) => void,
  setShowDeleteDialog: (show: boolean) => void
) => {
  const { jobs, addJob, updateJob, deleteJob } = useJobsData();
  const [jobToDelete, setJobToDelete] = useState<JobPosition | null>(null);

  // Add a new job
  const handleAddJob = () => {
    setIsAddingJob(true);
    setIsEditingJob(false);
    setIsViewingDetails(false);
  };

  // Edit an existing job
  const handleEditJob = (job: JobPosition) => {
    setSelectedJob(job);
    setIsEditingJob(true);
    setIsAddingJob(false);
    setIsViewingDetails(false);
  };

  // View job details
  const handleViewJobDetails = (job: JobPosition) => {
    setSelectedJob(job);
    setIsViewingDetails(true);
    setIsAddingJob(false);
    setIsEditingJob(false);
  };

  // Save job form (add or edit)
  const handleJobFormSubmit = (jobData: JobPosition) => {
    if (jobData.id) {
      // Update existing job
      updateJob(jobData);
      toast.success(`Job "${jobData.title}" was updated successfully`);
    } else {
      // Add new job
      const newJob = {
        ...jobData,
        id: `job-${Date.now()}`,
        postedDate: new Date().toISOString(),
        applications: 0,
      };
      addJob(newJob);
      toast.success(`Job "${jobData.title}" was created successfully`);
    }
    
    // Close form
    setIsAddingJob(false);
    setIsEditingJob(false);
    setSelectedJob(null);
  };

  // Delete a job
  const handleDeleteJob = (job: JobPosition) => {
    setJobToDelete(job);
    setShowDeleteDialog(true);
  };
  
  // Confirm job deletion
  const confirmDeleteJob = () => {
    if (jobToDelete) {
      deleteJob(jobToDelete.id);
      toast.success(`Job "${jobToDelete.title}" was deleted successfully`);
      setJobToDelete(null);
      setShowDeleteDialog(false);
    }
  };
  
  // Close job form
  const closeForm = () => {
    setIsAddingJob(false);
    setIsEditingJob(false);
  };
  
  // Go back to job list
  const backToList = () => {
    setSelectedJob(null);
    setIsViewingDetails(false);
    setIsAddingJob(false);
    setIsEditingJob(false);
  };

  return {
    jobs,
    handleAddJob,
    handleEditJob,
    handleViewJobDetails,
    handleJobFormSubmit,
    handleDeleteJob,
    confirmDeleteJob,
    closeForm,
    backToList
  };
};
