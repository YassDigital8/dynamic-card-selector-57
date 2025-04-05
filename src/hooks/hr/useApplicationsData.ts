
import { useState } from 'react';
import { JobApplication } from '@/models/ApplicationModel';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

// Mock data for applications
const mockApplications: JobApplication[] = [
  {
    id: '1',
    jobId: '1', // Senior Frontend Developer
    candidateId: '1',
    status: 'Interviewed',
    appliedDate: '2025-03-18T00:00:00.000Z',
    resumeUrl: 'https://example.com/resume1.pdf',
    coverLetterUrl: 'https://example.com/coverletter1.pdf',
    notes: 'Strong React skills. Performed well in technical interview.'
  },
  {
    id: '2',
    jobId: '2', // UX/UI Designer
    candidateId: '2',
    status: 'Pending',
    appliedDate: '2025-03-22T00:00:00.000Z',
    resumeUrl: 'https://example.com/resume2.pdf'
  },
  {
    id: '3',
    jobId: '1', // Senior Frontend Developer
    candidateId: '3',
    status: 'Reviewed',
    appliedDate: '2025-03-17T00:00:00.000Z',
    resumeUrl: 'https://example.com/resume3.pdf',
    notes: 'Junior developer with potential. Consider for junior role.'
  },
  {
    id: '4',
    jobId: '3', // DevOps Engineer
    candidateId: '4',
    status: 'Rejected',
    appliedDate: '2025-03-11T00:00:00.000Z',
    resumeUrl: 'https://example.com/resume4.pdf',
    notes: 'Not enough experience with cloud infrastructure.'
  },
  {
    id: '5',
    jobId: '1', // Senior Frontend Developer
    candidateId: '5',
    status: 'Offered',
    appliedDate: '2025-03-20T00:00:00.000Z',
    resumeUrl: 'https://example.com/resume5.pdf',
    coverLetterUrl: 'https://example.com/coverletter5.pdf',
    notes: 'Excellent candidate. Offered $145k. Awaiting response.'
  }
];

export const useApplicationsData = () => {
  const [applications, setApplications] = useState<JobApplication[]>(mockApplications);
  const { toast } = useToast();

  const addApplication = (application: Omit<JobApplication, 'id'>) => {
    const newApplication = {
      ...application,
      id: uuidv4(),
    };
    
    setApplications([...applications, newApplication]);
    toast({
      title: "Application Added",
      description: `Application has been successfully added.`,
    });
    
    return newApplication;
  };

  const updateApplication = (updatedApplication: JobApplication) => {
    setApplications(applications.map(app => 
      app.id === updatedApplication.id ? updatedApplication : app
    ));
    
    toast({
      title: "Application Updated",
      description: `Application status updated to ${updatedApplication.status}.`,
    });
  };

  const deleteApplication = (applicationId: string) => {
    setApplications(applications.filter(app => app.id !== applicationId));
    
    toast({
      title: "Application Deleted",
      description: "Application has been deleted.",
      variant: "destructive",
    });
  };

  return {
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
  };
};
