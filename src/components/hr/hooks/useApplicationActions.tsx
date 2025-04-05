
import { useState } from 'react';
import { JobApplication } from '@/models/ApplicationModel';
import { toast } from 'sonner';
import { useJobsData } from '@/hooks/hr/useJobsData';
import { useCandidatesData } from '@/hooks/hr/useCandidatesData';
import { useApplicationsData } from '@/hooks/hr/useApplicationsData';
import { useApplicationProgress } from './useApplicationProgress';

export const useApplicationActions = () => {
  const { updateApplication } = useApplicationsData();
  const { jobs } = useJobsData();
  const { candidates } = useCandidatesData();
  const { getEarliestStatusForJob } = useApplicationProgress();

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
      status: 'Interviewed' as JobApplication['status']
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
    
    if (earliestStatus !== 'Interviewed' && 
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
      status: 'Offered' as JobApplication['status']
    };
    
    updateApplication(updatedApplication);
    
    const candidateName = candidates.find(c => c.id === application.candidateId)?.name || 'Candidate';
    const jobTitle = jobs.find(j => j.id === application.jobId)?.title || 'the position';
    
    toast('Offer sent', {
      description: `An offer for ${jobTitle} has been sent to ${candidateName}.`
    });
  };

  const handleUpdateApplicationNotes = (application: JobApplication, notes: string) => {
    const updatedApplication = { ...application, notes };
    updateApplication(updatedApplication);
    
    toast('Application notes saved', {
      description: 'The notes have been updated successfully.'
    });
  };

  return {
    handleScheduleInterview,
    handleSendOffer,
    handleUpdateApplicationNotes
  };
};
