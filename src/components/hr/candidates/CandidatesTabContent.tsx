
import React from 'react';
import { Candidate } from '@/models/ApplicationModel';
import { CandidateList } from './index';
import CandidateEditForm from './CandidateEditForm';
import CandidateDetailsView from './CandidateDetailsView';

interface CandidatesTabContentProps {
  candidates: Candidate[];
  isEditingCandidate?: boolean;
  selectedCandidate?: Candidate | null;
  onViewDetails: (candidate: Candidate) => void;
  onEditCandidate: (candidate: Candidate) => void;
  onSaveCandidate?: (candidate: Candidate) => void;
  onCancelEdit?: () => void;
  onDeleteCandidate: (candidate: Candidate) => void;
}

const CandidatesTabContent: React.FC<CandidatesTabContentProps> = ({
  candidates,
  isEditingCandidate = false,
  selectedCandidate = null,
  onViewDetails,
  onEditCandidate,
  onSaveCandidate = () => {},
  onCancelEdit = () => {},
  onDeleteCandidate,
}) => {
  if (isEditingCandidate && selectedCandidate) {
    return (
      <CandidateEditForm 
        candidate={selectedCandidate}
        onSave={onSaveCandidate}
        onCancel={onCancelEdit}
      />
    );
  }
  
  if (selectedCandidate && !isEditingCandidate) {
    return (
      <CandidateDetailsView 
        candidate={selectedCandidate}
        onEdit={() => onEditCandidate(selectedCandidate)}
        onBack={onCancelEdit}
        onDelete={() => onDeleteCandidate(selectedCandidate)}
      />
    );
  }

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
