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

  const handleViewApplicationDetails = (application: JobApplication) => {
    setSelectedApplication(application);
    setIsViewingApplication(true);
  };

  const areAllApplicationsAtSameStatus = (
    jobId: string, 
    targetStatus: JobApplication['status'],
    excludeApplicationId?: string
  ): boolean => {
    const jobApplications = applications.filter(app => 
      app.jobId === jobId && (excludeApplicationId ? app.id !== excludeApplicationId : true)
    );
    
    if (jobApplications.length === 0) return true;
    
    return jobApplications.every(app => app.status === targetStatus);
  };

  const getEarliestStatusForJob = (jobId: string): JobApplication['status'] => {
    const jobApplications = applications.filter(app => app.jobId === jobId);
    if (jobApplications.length === 0) return 'Pending';
    
    const statusOrder: JobApplication['status'][] = [
      'Pending', 'Reviewed', 'Interviewed', 'Offered', 'Hired', 'Rejected'
    ];
    
    let earliestStatusIndex = statusOrder.length - 1;
    
    jobApplications.forEach(app => {
      const appStatusIndex = statusOrder.indexOf(app.status);
      if (appStatusIndex < earliestStatusIndex) {
        earliestStatusIndex = appStatusIndex;
      }
    });
    
    return statusOrder[earliestStatusIndex];
  };

  const handleUpdateApplicationStatus = (application: JobApplication, newStatus: JobApplication['status']) => {
    if (!isValidStatusTransition(application.status, newStatus)) {
      toast.error(`Cannot change from ${application.status} to ${newStatus}`, {
        description: "This status transition is not allowed."
      });
      return;
    }
    
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
    
    if (application.status === 'Rejected' && newStatus === 'Pending') {
      const updatedApplication = { ...application, status: newStatus };
      updateApplication(updatedApplication);
      toast(`Application reopened`, {
        description: `${candidates.find(c => c.id === application.candidateId)?.name || 'Candidate'}'s application has been reopened.`
      });
      return;
    }
    
    const earliestStatus = getEarliestStatusForJob(application.jobId);
    const statusOrder: JobApplication['status'][] = [
      'Pending', 'Reviewed', 'Interviewed', 'Offered', 'Hired'
    ];
    
    const currentStatusIndex = statusOrder.indexOf(application.status);
    const newStatusIndex = statusOrder.indexOf(newStatus);
    const earliestStatusIndex = statusOrder.indexOf(earliestStatus);
    
    if (newStatusIndex > earliestStatusIndex && application.status !== earliestStatus) {
      const jobTitle = jobs.find(j => j.id === application.jobId)?.title || 'this position';
      toast.error(`Cannot advance this application yet`, {
        description: `All applications for ${jobTitle} must reach the ${earliestStatus} stage before any can advance further.`
      });
      return;
    }
    
    const updatedApplication = { ...application, status: newStatus };
    
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

  const isValidStatusTransition = (
    currentStatus: JobApplication['status'], 
    newStatus: JobApplication['status']
  ): boolean => {
    if (currentStatus === newStatus) return true;
    
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
        return ['Pending'].includes(newStatus);
      case 'Hired':
        return false;
      default:
        return false;
    }
  };

  const handleUpdateApplicationNotes = (application: JobApplication, notes: string) => {
    const updatedApplication = { ...application, notes };
    updateApplication(updatedApplication);
    
    toast('Application notes saved', {
      description: 'The notes have been updated successfully.'
    });
  };

  const handleScheduleInterview = (application: JobApplication, interviewDate: string) => {
    if (application.status !== 'Pending' && application.status !== 'Reviewed') {
      toast.error('Cannot schedule interview', {
        description: `The application must be in Pending or Reviewed status, not ${application.status}.`
      });
      return;
    }
    
    const earliestStatus = getEarliestStatusForJob(application.jobId);
    if (earliestStatus === 'Pending' && application.status !== 'Pending') {
      const jobTitle = jobs.find(j => j.id === application.jobId)?.title || 'this position';
      toast.error('Cannot schedule interview yet', {
        description: `All applications for ${jobTitle} must be at least in Reviewed status before scheduling interviews.`
      });
      return;
    }
    
    const updatedApplication: JobApplication = { 
      ...application, 
      interviewDate,
      status: 'Interviewed' as const
    };
    
    updateApplication(updatedApplication);
    
    const candidateName = candidates.find(c => c.id === application.candidateId)?.name || 'Candidate';
    
    toast('Interview scheduled', {
      description: `An interview has been scheduled with ${candidateName}.`
    });
  };

  const handleSendOffer = (application: JobApplication, offerDetails: string) => {
    if (application.status !== 'Interviewed') {
      toast.error('Cannot send offer', {
        description: `The candidate must be interviewed first. Current status: ${application.status}.`
      });
      return;
    }
    
    const earliestStatus = getEarliestStatusForJob(application.jobId);
    
    if (earliestStatus !== 'Interviewed' as JobApplication['status'] && 
        application.status !== earliestStatus) {
      const jobTitle = jobs.find(j => j.id === application.jobId)?.title || 'this position';
      toast.error('Cannot send offer yet', {
        description: `All applications for ${jobTitle} must complete the interview stage before sending offers.`
      });
      return;
    }
    
    const updatedApplication: JobApplication = { 
      ...application, 
      offerDetails,
      offerDate: new Date().toISOString(),
      status: 'Offered' as const
    };
    
    updateApplication(updatedApplication);
    
    const candidateName = candidates.find(c => c.id === application.candidateId)?.name || 'Candidate';
    const jobTitle = jobs.find(j => j.id === application.jobId)?.title || 'the position';
    
    toast('Offer sent', {
      description: `An offer for ${jobTitle} has been sent to ${candidateName}.`
    });
  };

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
