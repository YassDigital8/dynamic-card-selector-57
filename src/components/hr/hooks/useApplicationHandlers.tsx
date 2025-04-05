
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

  // Check if all applications for a job are at the same status
  const areAllApplicationsAtSameStatus = (
    jobId: string, 
    targetStatus: JobApplication['status'],
    excludeApplicationId?: string
  ): boolean => {
    // Get all applications for this job, excluding the current one if specified
    const jobApplications = applications.filter(app => 
      app.jobId === jobId && (excludeApplicationId ? app.id !== excludeApplicationId : true)
    );
    
    // If there are no other applications, return true
    if (jobApplications.length === 0) return true;
    
    // Check if all applications have the same status as the target status
    return jobApplications.every(app => app.status === targetStatus);
  };

  // Get the earliest status in the hiring process for applications of a job
  const getEarliestStatusForJob = (jobId: string): JobApplication['status'] => {
    const jobApplications = applications.filter(app => app.jobId === jobId);
    if (jobApplications.length === 0) return 'Pending';
    
    // Define the order of statuses in the hiring process
    const statusOrder: JobApplication['status'][] = [
      'Pending', 'Reviewed', 'Interviewed', 'Offered', 'Hired', 'Rejected'
    ];
    
    // Find the earliest status in the pipeline
    let earliestStatusIndex = statusOrder.length - 1;
    
    jobApplications.forEach(app => {
      const appStatusIndex = statusOrder.indexOf(app.status);
      if (appStatusIndex < earliestStatusIndex) {
        earliestStatusIndex = appStatusIndex;
      }
    });
    
    return statusOrder[earliestStatusIndex];
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
    
    // Special case for "Rejected" status - can always reject an application
    if (newStatus === 'Rejected') {
      const updatedApplication = { 
        ...application, 
        status: newStatus,
        rejectionReason: application.rejectionReason || 'No reason provided'
      };
      updateApplication(updatedApplication);
      toast(`Application rejected`, {
        description: `${candidates.find(c => c.id === application.candidateId)?.name || 'Candidate'}'s application has been rejected.`
      });
      return;
    }
    
    // Special case for reopening a rejected application
    if (application.status === 'Rejected' && newStatus === 'Pending') {
      const updatedApplication = { ...application, status: newStatus };
      updateApplication(updatedApplication);
      toast(`Application reopened`, {
        description: `${candidates.find(c => c.id === application.candidateId)?.name || 'Candidate'}'s application has been reopened.`
      });
      return;
    }
    
    // For progression to next status, check if all other applications are at least at the same stage
    const earliestStatus = getEarliestStatusForJob(application.jobId);
    const statusOrder: JobApplication['status'][] = [
      'Pending', 'Reviewed', 'Interviewed', 'Offered', 'Hired'
    ];
    
    const currentStatusIndex = statusOrder.indexOf(application.status);
    const newStatusIndex = statusOrder.indexOf(newStatus);
    const earliestStatusIndex = statusOrder.indexOf(earliestStatus);
    
    // Only allow progression if this application is not moving ahead of others
    if (newStatusIndex > earliestStatusIndex && application.status !== earliestStatus) {
      const jobTitle = jobs.find(j => j.id === application.jobId)?.title || 'this position';
      toast.error(`Cannot advance this application yet`, {
        description: `All applications for ${jobTitle} must reach the ${earliestStatus} stage before any can advance further.`
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
    
    // Check if all other applications for this job are at least at Reviewed status
    const earliestStatus = getEarliestStatusForJob(application.jobId);
    if (earliestStatus === 'Pending' && application.status !== 'Pending') {
      const jobTitle = jobs.find(j => j.id === application.jobId)?.title || 'this position';
      toast.error('Cannot schedule interview yet', {
        description: `All applications for ${jobTitle} must be at least in Reviewed status before scheduling interviews.`
      });
      return;
    }
    
    // Fix: Create a properly typed updated application object
    const updatedApplication: JobApplication = { 
      ...application, 
      interviewDate,
      // Explicitly specify the status as a literal, not a string
      status: 'Interviewed' as const
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
    
    // Check if all other applications for this job are at least at Interviewed status
    const earliestStatus = getEarliestStatusForJob(application.jobId);
    if (earliestStatus !== 'Interviewed' && application.status !== earliestStatus) {
      const jobTitle = jobs.find(j => j.id === application.jobId)?.title || 'this position';
      toast.error('Cannot send offer yet', {
        description: `All applications for ${jobTitle} must complete the interview stage before sending offers.`
      });
      return;
    }
    
    // Fix: Explicitly type the status property as a literal type
    const updatedApplication: JobApplication = { 
      ...application, 
      offerDetails,
      offerDate: new Date().toISOString(),
      status: 'Offered' as const // TypeScript now knows this is a valid literal type
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
