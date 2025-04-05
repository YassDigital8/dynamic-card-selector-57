
import { useState } from 'react';
import { JobApplication } from '@/models/ApplicationModel';
import { toast } from 'sonner';
import { useJobsData } from '@/hooks/hr/useJobsData';
import { useApplicationsData } from '@/hooks/hr/useApplicationsData';
import { useCandidatesData } from '@/hooks/hr/useCandidatesData';
import { useApplicationStatus } from './useApplicationStatus';
import { useApplicationProgress } from './useApplicationProgress';
import { useApplicationActions } from './useApplicationActions';

export const useApplicationHandlers = (
  setSelectedApplication: (application: JobApplication | null) => void,
  setIsViewingApplication: (isViewing: boolean) => void
) => {
  const { applications, updateApplication } = useApplicationsData();
  const { jobs } = useJobsData();
  const { candidates } = useCandidatesData();
  const { isValidStatusTransition } = useApplicationStatus();
  const { getEarliestStatusForJob } = useApplicationProgress();
  const { 
    handleScheduleInterview,
    handleSendOffer,
    handleUpdateApplicationNotes
  } = useApplicationActions();

  const handleViewApplicationDetails = (application: JobApplication) => {
    setSelectedApplication(application);
    setIsViewingApplication(true);
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
