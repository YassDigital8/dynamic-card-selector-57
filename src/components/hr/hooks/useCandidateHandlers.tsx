
import { useState } from 'react';
import { Candidate } from '@/models/ApplicationModel';
import { useCandidatesData } from '@/hooks/hr/useCandidatesData';
import { toast } from 'sonner';

export const useCandidateHandlers = (
  setSelectedCandidate: (candidate: Candidate | null) => void
) => {
  const { candidates, updateCandidate } = useCandidatesData();
  const [isEditingCandidate, setIsEditingCandidate] = useState(false);
  
  const handleViewCandidateDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    // TODO: Implement candidate details view
  };
  
  const handleEditCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsEditingCandidate(true);
    toast('Edit mode', {
      description: `Now editing ${candidate.name}'s profile.`
    });
  };
  
  const handleSaveCandidate = (updatedCandidate: Candidate) => {
    updateCandidate(updatedCandidate);
    setIsEditingCandidate(false);
    toast('Profile updated', {
      description: `${updatedCandidate.name}'s profile has been updated successfully.`
    });
  };
  
  const handleCancelEdit = () => {
    setIsEditingCandidate(false);
    toast('Edit cancelled', {
      description: 'No changes were made to the candidate profile.'
    });
  };
  
  const handleDeleteCandidate = (candidate: Candidate) => {
    // TODO: Implement candidate delete with confirmation dialog
    toast('Delete candidate', {
      description: `This would delete ${candidate.name}'s profile.`,
      variant: 'destructive'
    });
  };

  return {
    candidates,
    isEditingCandidate,
    handleViewCandidateDetails,
    handleEditCandidate,
    handleSaveCandidate,
    handleCancelEdit,
    handleDeleteCandidate
  };
};
