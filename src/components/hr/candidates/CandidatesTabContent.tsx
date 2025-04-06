
import React from 'react';
import { Candidate } from '@/models/ApplicationModel';
import { CandidateList } from './index';
import CandidateDetailsView from './CandidateDetailsView';

interface CandidatesTabContentProps {
  candidates: Candidate[];
  selectedCandidate?: Candidate | null;
  onViewDetails: (candidate: Candidate) => void;
  onDeleteCandidate: (candidate: Candidate) => void;
  onCancelEdit?: () => void;
}

const CandidatesTabContent: React.FC<CandidatesTabContentProps> = ({
  candidates,
  selectedCandidate = null,
  onViewDetails,
  onDeleteCandidate,
  onCancelEdit = () => {},
}) => {
  if (selectedCandidate) {
    return (
      <CandidateDetailsView 
        candidate={selectedCandidate}
        onBack={onCancelEdit}
        onDelete={() => onDeleteCandidate(selectedCandidate)}
      />
    );
  }

  return (
    <CandidateList 
      candidates={candidates}
      onViewDetails={onViewDetails}
      onDeleteCandidate={onDeleteCandidate}
    />
  );
};

export default CandidatesTabContent;
