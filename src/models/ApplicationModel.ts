
import { JobPosition } from './JobModel';

export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'Pending' | 'Reviewed' | 'Interviewed' | 'Offered' | 'Rejected' | 'Hired';
  appliedDate: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  notes?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  skills: string[];
  experience: number; // in years
  profilePictureUrl?: string;
  currentPosition?: string;
  currentCompany?: string;
  applications?: JobApplication[];
  createdAt: string;
  updatedAt: string;
}
