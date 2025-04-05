
import { JobPosition } from '@/models/JobModel';
import { useJobsData } from '@/hooks/hr/useJobsData';
import { toast } from 'sonner';

export const useJobsHandlers = (
  setSelectedJob: (job: JobPosition | null) => void,
  setIsAddingJob: (isAdding: boolean) => void,
  setIsEditingJob: (isEditing: boolean) => void,
  setIsViewingDetails: (isViewing: boolean) => void,
  setIsViewingJobApplications: (isViewingApplications: boolean) => void,
  setShowDeleteDialog: (show: boolean) => void
) => {
  const { jobs, addJob, updateJob, deleteJob } = useJobsData();

  // Add new job
  const handleAddJob = () => {
    setIsAddingJob(true);
    setSelectedJob(null);
    setIsViewingDetails(false);
    setIsViewingJobApplications(false);
    setIsEditingJob(false);
  };

  // Edit job
  const handleEditJob = (job: JobPosition) => {
    setSelectedJob(job);
    setIsEditingJob(true);
    setIsAddingJob(false);
    setIsViewingDetails(false);
    setIsViewingJobApplications(false);
  };

  // View job details
  const handleViewJobDetails = (job: JobPosition) => {
    setSelectedJob(job);
    setIsViewingDetails(true);
    setIsAddingJob(false);
    setIsEditingJob(false);
    setIsViewingJobApplications(false);
  };
  
  // View job applications
  const handleViewJobApplications = (job: JobPosition) => {
    setSelectedJob(job);
    setIsViewingJobApplications(true);
    setIsViewingDetails(false);
    setIsAddingJob(false);
    setIsEditingJob(false);
  };

  // Handle job form submission
  const handleJobFormSubmit = (jobData: JobPosition) => {
    if (isEditingJob) {
      updateJob(jobData);
      toast(`Job Updated`, {
        description: `${jobData.title} has been updated successfully.`
      });
    } else {
      addJob(jobData);
      toast(`Job Created`, {
        description: `${jobData.title} has been created successfully.`
      });
    }
    
    setIsAddingJob(false);
    setIsEditingJob(false);
  };

  // Delete job
  const handleDeleteJob = (job: JobPosition) => {
    setSelectedJob(job);
    setShowDeleteDialog(true);
  };

  // Confirm delete job
  const confirmDeleteJob = () => {
    if (selectedJob) {
      const jobName = selectedJob.title;
      deleteJob(selectedJob.id);
      toast(`Job Deleted`, {
        description: `${jobName} has been deleted permanently.`
      });
      
      setSelectedJob(null);
      setShowDeleteDialog(false);
      setIsViewingDetails(false);
      setIsViewingJobApplications(false);
    }
  };

  // Close form
  const closeForm = () => {
    setIsAddingJob(false);
    setIsEditingJob(false);
  };

  // Back to list
  const backToList = () => {
    setSelectedJob(null);
    setIsViewingDetails(false);
    setIsViewingJobApplications(false);
  };

  return {
    jobs,
    handleAddJob,
    handleEditJob,
    handleViewJobDetails,
    handleViewJobApplications,
    handleJobFormSubmit,
    handleDeleteJob,
    confirmDeleteJob,
    closeForm,
    backToList
  };
};
