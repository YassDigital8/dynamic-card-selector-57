
import { useState } from 'react';
import { JobPosition } from '@/models/JobModel';
import { JobApplication, Candidate } from '@/models/ApplicationModel';

export const useHRPageState = () => {
  const [activeTab, setActiveTab] = useState<string>('jobs');
  
  // Jobs state
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Applications state
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [isViewingApplication, setIsViewingApplication] = useState(false);
  
  // Candidates state
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  return {
    // Tab state
    activeTab,
    setActiveTab,
    
    // Jobs state
    selectedJob,
    setSelectedJob,
    isAddingJob,
    setIsAddingJob,
    isEditingJob,
    setIsEditingJob,
    isViewingDetails,
    setIsViewingDetails,
    showDeleteDialog,
    setShowDeleteDialog,
    
    // Applications state
    selectedApplication,
    setSelectedApplication,
    isViewingApplication,
    setIsViewingApplication,
    
    // Candidates state
    selectedCandidate,
    setSelectedCandidate,
  };
};
