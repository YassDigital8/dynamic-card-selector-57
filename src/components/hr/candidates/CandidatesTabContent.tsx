
import React from 'react';
import { Candidate } from '@/models/ApplicationModel';
import { CandidateList } from './index';

interface CandidatesTabContentProps {
  candidates: Candidate[];
  onViewDetails: (candidate: Candidate) => void;
  onEditCandidate: (candidate: Candidate) => void;
  onDeleteCandidate: (candidate: Candidate) => void;
}

const CandidatesTabContent: React.FC<CandidatesTabContentProps> = ({
  candidates,
  onViewDetails,
  onEditCandidate,
  onDeleteCandidate,
}) => {
  return (
    <CandidateList 
      candidates={candidates}
      onViewDetails={onViewDetails}
      onEditCandidate={onEditCandidate}
      onDeleteCandidate={onDeleteCandidate}
    />
  );
};

export default CandidatesTabContent;
