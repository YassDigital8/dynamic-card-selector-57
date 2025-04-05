
import { useState } from 'react';
import { Candidate } from '@/models/ApplicationModel';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

// Mock data for candidates
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
    experience: 7,
    currentPosition: 'Senior Frontend Developer',
    currentCompany: 'Tech Innovations Inc.',
    createdAt: '2025-03-15T00:00:00.000Z',
    updatedAt: '2025-03-15T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Sam Taylor',
    email: 'sam.taylor@example.com',
    phone: '(555) 234-5678',
    location: 'San Francisco, CA',
    skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD', 'Sketch'],
    experience: 5,
    currentPosition: 'UX Designer',
    currentCompany: 'DesignHub Co.',
    createdAt: '2025-03-16T00:00:00.000Z',
    updatedAt: '2025-03-16T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Jamie Wilson',
    email: 'jamie.wilson@example.com',
    phone: '(555) 345-6789',
    location: 'Remote',
    skills: ['JavaScript', 'React', 'Vue', 'HTML', 'CSS'],
    experience: 2,
    currentPosition: 'Frontend Developer',
    currentCompany: 'WebTech Solutions',
    createdAt: '2025-03-17T00:00:00.000Z',
    updatedAt: '2025-03-17T00:00:00.000Z',
  },
  {
    id: '4',
    name: 'Morgan Chen',
    email: 'morgan.chen@example.com',
    phone: '(555) 456-7890',
    location: 'Seattle, WA',
    skills: ['AWS', 'Kubernetes', 'Docker', 'CI/CD', 'Terraform'],
    experience: 4,
    currentPosition: 'Cloud Engineer',
    currentCompany: 'Cloud Systems Inc.',
    createdAt: '2025-03-18T00:00:00.000Z',
    updatedAt: '2025-03-18T00:00:00.000Z',
  },
  {
    id: '5',
    name: 'Riley Patel',
    email: 'riley.patel@example.com',
    phone: '(555) 567-8901',
    location: 'Austin, TX',
    skills: ['React', 'TypeScript', 'Redux', 'Node.js', 'GraphQL'],
    experience: 8,
    currentPosition: 'Lead Frontend Engineer',
    currentCompany: 'AppWorks Technologies',
    createdAt: '2025-03-19T00:00:00.000Z',
    updatedAt: '2025-03-19T00:00:00.000Z',
  }
];

export const useCandidatesData = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const { toast } = useToast();

  const addCandidate = (candidate: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newCandidate = {
      ...candidate,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    
    setCandidates([...candidates, newCandidate]);
    toast({
      title: "Candidate Added",
      description: `${newCandidate.name} has been added to the system.`,
    });
    
    return newCandidate;
  };

  const updateCandidate = (updatedCandidate: Candidate) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === updatedCandidate.id 
        ? { ...updatedCandidate, updatedAt: new Date().toISOString() } 
        : candidate
    ));
    
    toast({
      title: "Candidate Updated",
      description: `${updatedCandidate.name}'s information has been updated.`,
    });
  };

  const deleteCandidate = (candidateId: string) => {
    const candidateToDelete = candidates.find(c => c.id === candidateId);
    setCandidates(candidates.filter(c => c.id !== candidateId));
    
    if (candidateToDelete) {
      toast({
        title: "Candidate Deleted",
        description: `${candidateToDelete.name} has been removed from the system.`,
        variant: "destructive",
      });
    }
  };

  return {
    candidates,
    addCandidate,
    updateCandidate,
    deleteCandidate,
  };
};
