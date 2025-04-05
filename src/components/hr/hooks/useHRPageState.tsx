
import { useState } from 'react';
import { JobPosition } from '@/models/JobModel';
import { JobApplication, Candidate } from '@/models/ApplicationModel';

export const useHRPageState = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState('jobs');
  
  // Job states
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [isViewingJobApplications, setIsViewingJobApplications] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Application states
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [isViewingApplication, setIsViewingApplication] = useState(false);
  
  // Candidate states
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  return {
    activeTab, setActiveTab,
    selectedJob, setSelectedJob,
    isAddingJob, setIsAddingJob,
    isEditingJob, setIsEditingJob,
    isViewingDetails, setIsViewingDetails,
    isViewingJobApplications, setIsViewingJobApplications,
    showDeleteDialog, setShowDeleteDialog,
    selectedApplication, setSelectedApplication,
    isViewingApplication, setIsViewingApplication,
    selectedCandidate, setSelectedCandidate
  };
};
