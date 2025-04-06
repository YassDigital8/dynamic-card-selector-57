import { useState } from 'react';
import { Candidate } from '@/models/ApplicationModel';
import { useCandidatesData } from '@/hooks/hr/useCandidatesData';
import { toast } from 'sonner';

export const useCandidateHandlers = (
  setSelectedCandidate: (candidate: Candidate | null) => void
) => {
  const { candidates, deleteCandidate } = useCandidatesData();
  
  const handleViewCandidateDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    // Show the candidate details view
    toast('Viewing candidate', {
      description: `Viewing ${candidate.name}'s profile.`
    });
  };

  const handleCancelView = () => {
    setSelectedCandidate(null);
    toast('View closed', {
      description: 'Returned to candidate list.'
    });
  };
  
  const handleDeleteCandidate = (candidate: Candidate) => {
    // This function is now disabled, but we keep it for future implementation
    toast('Delete functionality disabled', {
      description: `Delete operation for candidates is currently disabled.`
    });
    
    // Code below is kept but won't execute since buttons are disabled
    // deleteCandidate(candidate.id);
    // setSelectedCandidate(null);
  };

  return {
    candidates,
    handleViewCandidateDetails,
    handleCancelView,
    handleDeleteCandidate
  };
};
