
import React, { useState } from 'react';
import { Candidate } from '@/models/ApplicationModel';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import CandidateCard from './CandidateCard';

interface CandidateListProps {
  candidates: Candidate[];
  onViewDetails: (candidate: Candidate) => void;
  onEditCandidate: (candidate: Candidate) => void;
  onDeleteCandidate: (candidate: Candidate) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({ 
  candidates, 
  onViewDetails, 
  onEditCandidate,
  onDeleteCandidate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCandidates = candidates.filter(candidate => {
    const searchTermLower = searchTerm.toLowerCase();
    
    return candidate.name.toLowerCase().includes(searchTermLower) ||
           candidate.email.toLowerCase().includes(searchTermLower) ||
           candidate.skills.some(skill => skill.toLowerCase().includes(searchTermLower)) ||
           (candidate.currentPosition && candidate.currentPosition.toLowerCase().includes(searchTermLower)) ||
           (candidate.currentCompany && candidate.currentCompany.toLowerCase().includes(searchTermLower));
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredCandidates.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <p>No candidates found.</p>
            <Button 
              variant="link" 
              onClick={() => setSearchTerm('')}
              className="mt-2"
            >
              Clear search
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map((candidate) => (
            <CandidateCard 
              key={candidate.id}
              candidate={candidate}
              onView={() => onViewDetails(candidate)}
              onEdit={() => onEditCandidate(candidate)}
              onDelete={() => onDeleteCandidate(candidate)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateList;
