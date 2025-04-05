
import { useState } from 'react';
import { JobApplication } from '@/models/ApplicationModel';
import { toast } from 'sonner';
import { useJobsData } from '@/hooks/hr/useJobsData';
import { useApplicationsData } from '@/hooks/hr/useApplicationsData';
import { useCandidatesData } from '@/hooks/hr/useCandidatesData';

export const useApplicationHandlers = (
  setSelectedApplication: (application: JobApplication | null) => void,
  setIsViewingApplication: (isViewing: boolean) => void
) => {
  const { applications, updateApplication } = useApplicationsData();
  const { jobs } = useJobsData();
  const { candidates } = useCandidatesData();

  // View application details
  const handleViewApplicationDetails = (application: JobApplication) => {
    setSelectedApplication(application);
    setIsViewingApplication(true);
  };

  // Update application status with status validation
  const handleUpdateApplicationStatus = (application: JobApplication, newStatus: JobApplication['status']) => {
    // Prevent invalid status transitions
    if (!isValidStatusTransition(application.status, newStatus)) {
      toast.error(`Cannot change from ${application.status} to ${newStatus}`, {
        description: "This status transition is not allowed."
      });
      return;
    }
    
    const updatedApplication = { ...application, status: newStatus };
    
    // Update based on new status
    if (newStatus === 'Interviewed' && !application.interviewDate) {
      updatedApplication.interviewDate = new Date().toISOString();
    } else if (newStatus === 'Offered' && !application.offerDate) {
      updatedApplication.offerDate = new Date().toISOString();
    } else if (newStatus === 'Hired' && !application.hireDate) {
      updatedApplication.hireDate = new Date().toISOString();
    }
    
    updateApplication(updatedApplication);
    
    const jobTitle = jobs.find(j => j.id === application.jobId)?.title || 'Unknown position';
    const candidateName = candidates.find(c => c.id === application.candidateId)?.name || 'Candidate';
    
    toast(`Application status updated to ${newStatus}`, {
      description: `${candidateName}'s application for ${jobTitle} has been updated.`
    });
  };

  // Check if a status transition is valid
  const isValidStatusTransition = (
    currentStatus: JobApplication['status'], 
    newStatus: JobApplication['status']
  ): boolean => {
    // Allow same status
    if (currentStatus === newStatus) return true;
    
    // Define valid transitions
    switch (currentStatus) {
      case 'Pending':
        return ['Reviewed', 'Rejected'].includes(newStatus);
      case 'Reviewed':
        return ['Interviewed', 'Rejected'].includes(newStatus);
      case 'Interviewed':
        return ['Offered', 'Rejected'].includes(newStatus);
      case 'Offered':
        return ['Hired', 'Rejected'].includes(newStatus);
      case 'Rejected':
        // Allow reopening a rejected application
        return ['Pending'].includes(newStatus);
      case 'Hired':
        // No transitions from Hired
        return false;
      default:
        return false;
    }
  };

  // Update application notes
  const handleUpdateApplicationNotes = (application: JobApplication, notes: string) => {
    const updatedApplication = { ...application, notes };
    updateApplication(updatedApplication);
    
    toast('Application notes saved', {
      description: 'The notes have been updated successfully.'
    });
  };

  // Schedule interview
  const handleScheduleInterview = (application: JobApplication, interviewDate: string) => {
    // Validate status - can only schedule interviews for applications in Pending or Reviewed status
    if (application.status !== 'Pending' && application.status !== 'Reviewed') {
      toast.error('Cannot schedule interview', {
        description: `The application must be in Pending or Reviewed status, not ${application.status}.`
      });
      return;
    }
    
    // Fix: Explicitly cast status as JobApplication['status']
    const updatedApplication: JobApplication = { 
      ...application, 
      interviewDate,
      status: 'Interviewed' // TypeScript now knows this is a valid literal type
    };
    
    updateApplication(updatedApplication);
    
    const candidateName = candidates.find(c => c.id === application.candidateId)?.name || 'Candidate';
    
    toast('Interview scheduled', {
      description: `An interview has been scheduled with ${candidateName}.`
    });
  };

  // Send offer
  const handleSendOffer = (application: JobApplication, offerDetails: string) => {
    // Validate status - can only send offers to interviewed candidates
    if (application.status !== 'Interviewed') {
      toast.error('Cannot send offer', {
        description: `The candidate must be interviewed first. Current status: ${application.status}.`
      });
      return;
    }
    
    // Fix: Explicitly type the status property
    const updatedApplication: JobApplication = { 
      ...application, 
      offerDetails,
      offerDate: new Date().toISOString(),
      status: 'Offered' // TypeScript knows this is a valid literal type
    };
    
    updateApplication(updatedApplication);
    
    const candidateName = candidates.find(c => c.id === application.candidateId)?.name || 'Candidate';
    const jobTitle = jobs.find(j => j.id === application.jobId)?.title || 'the position';
    
    toast('Offer sent', {
      description: `An offer for ${jobTitle} has been sent to ${candidateName}.`
    });
  };

  // Close application details
  const handleCloseApplicationDetails = () => {
    setIsViewingApplication(false);
    setSelectedApplication(null);
  };

  return {
    applications,
    jobs,
    candidates,
    handleViewApplicationDetails,
    handleUpdateApplicationStatus,
    handleUpdateApplicationNotes,
    handleScheduleInterview,
    handleSendOffer,
    handleCloseApplicationDetails
  };
};
