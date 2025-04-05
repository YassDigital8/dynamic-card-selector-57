
import { JobPosition } from '@/models/JobModel';
import { useJobsData } from '@/hooks/hr/useJobsData';

export const useJobsHandlers = (
  setSelectedJob: (job: JobPosition | null) => void,
  setIsAddingJob: (value: boolean) => void,
  setIsEditingJob: (value: boolean) => void,
  setIsViewingDetails: (value: boolean) => void,
  setShowDeleteDialog: (value: boolean) => void,
) => {
  const { jobs, addJob, updateJob, deleteJob } = useJobsData();

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
    if (jobData.id && jobs.some(job => job.id === jobData.id)) {
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
    if (setSelectedJob) {
      deleteJob(setSelectedJob.id);
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

  return {
    jobs,
    handleAddJob,
    handleEditJob,
    handleViewJobDetails,
    handleJobFormSubmit,
    handleDeleteJob,
    confirmDeleteJob,
    closeForm,
    backToList,
  };
};
