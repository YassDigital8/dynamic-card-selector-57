
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

  // Update application status
  const handleUpdateApplicationStatus = (application: JobApplication, newStatus: JobApplication['status']) => {
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
    const updatedApplication = { 
      ...application, 
      interviewDate,
      status: application.status === 'Pending' ? 'Reviewed' : application.status
    };
    
    updateApplication(updatedApplication);
    
    const candidateName = candidates.find(c => c.id === application.candidateId)?.name || 'Candidate';
    
    toast('Interview scheduled', {
      description: `An interview has been scheduled with ${candidateName}.`
    });
  };

  // Send offer
  const handleSendOffer = (application: JobApplication, offerDetails: string) => {
    const updatedApplication = { 
      ...application, 
      offerDetails,
      offerDate: new Date().toISOString(),
      status: 'Offered'
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
