
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
    // TODO: Implement candidate delete with confirmation dialog
    toast('Delete candidate', {
      description: `This would delete ${candidate.name}'s profile.`
    });
    
    // Uncomment to actually delete the candidate
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
