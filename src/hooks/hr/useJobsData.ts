
import { useState, useEffect } from 'react';
import { JobPosition } from '@/models/JobModel';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

// Mock data for jobs
const mockJobs: JobPosition[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'We are looking for a Senior Frontend Developer to join our team. You will be responsible for building and maintaining our web applications.',
    requirements: [
      'Bachelor's degree in Computer Science or related field',
      '5+ years of experience with JavaScript and frontend frameworks',
      'Experience with React, TypeScript, and modern CSS',
      'Strong understanding of web performance optimization',
    ],
    responsibilities: [
      'Develop and maintain frontend applications using React and TypeScript',
      'Collaborate with UX designers to implement responsive designs',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and mentor junior developers',
    ],
    salary: {
      min: 120000,
      max: 150000,
      currency: 'USD',
    },
    postedDate: '2025-03-15T00:00:00.000Z',
    closingDate: '2025-05-15T00:00:00.000Z',
    status: 'Open',
    applications: 12,
    contactEmail: 'careers@example.com',
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are seeking a talented UX/UI Designer to create amazing user experiences. In this role, you will work with product and engineering teams to design intuitive interfaces.',
    requirements: [
      'Bachelor's degree in Design, HCI, or related field',
      '3+ years of experience in UX/UI design',
      'Proficiency in design tools such as Figma or Adobe XD',
      'Strong portfolio demonstrating your design process',
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with product managers to define features',
      'Create and maintain design systems',
    ],
    salary: {
      min: 95000,
      max: 120000,
      currency: 'USD',
    },
    postedDate: '2025-03-20T00:00:00.000Z',
    closingDate: '2025-04-20T00:00:00.000Z',
    status: 'Open',
    applications: 8,
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Chicago, IL',
    type: 'Full-time',
    description: 'We are looking for a DevOps Engineer to help us automate and optimize our infrastructure and deployment processes.',
    requirements: [
      'Bachelor's degree in Computer Science or related field',
      '3+ years of experience in DevOps or SRE role',
      'Experience with cloud platforms (AWS, GCP, or Azure)',
      'Knowledge of containerization and orchestration technologies',
    ],
    responsibilities: [
      'Design and implement CI/CD pipelines',
      'Manage and optimize cloud infrastructure',
      'Implement monitoring and alerting solutions',
      'Collaborate with development teams to improve deployment processes',
    ],
    postedDate: '2025-03-10T00:00:00.000Z',
    closingDate: '2025-04-10T00:00:00.000Z',
    status: 'Closed',
    applications: 15,
  },
  {
    id: '4',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Boston, MA',
    type: 'Full-time',
    description: 'We are seeking a Marketing Manager to lead our marketing efforts and drive growth.',
    requirements: [
      'Bachelor's degree in Marketing or related field',
      '5+ years of experience in marketing',
      'Experience with digital marketing channels',
      'Strong analytical and communication skills',
    ],
    responsibilities: [
      'Develop and execute marketing strategies',
      'Manage marketing campaigns across various channels',
      'Analyze marketing performance and optimize campaigns',
      'Collaborate with sales and product teams',
    ],
    postedDate: '2025-03-05T00:00:00.000Z',
    closingDate: '2025-04-05T00:00:00.000Z',
    status: 'Draft',
    applications: 0,
  },
];

export const useJobsData = () => {
  const [jobs, setJobs] = useState<JobPosition[]>(mockJobs);
  const { toast } = useToast();

  const addJob = (job: JobPosition) => {
    const newJob: JobPosition = {
      ...job,
      id: uuidv4(),
      postedDate: new Date().toISOString(),
      applications: 0,
    };
    
    setJobs([...jobs, newJob]);
    toast({
      title: "Job Created",
      description: `${job.title} has been successfully created.`,
    });
  };

  const updateJob = (updatedJob: JobPosition) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    toast({
      title: "Job Updated",
      description: `${updatedJob.title} has been successfully updated.`,
    });
  };

  const deleteJob = (jobId: string) => {
    const jobToDelete = jobs.find(job => job.id === jobId);
    setJobs(jobs.filter(job => job.id !== jobId));
    
    if (jobToDelete) {
      toast({
        title: "Job Deleted",
        description: `${jobToDelete.title} has been deleted.`,
        variant: "destructive",
      });
    }
  };

  return {
    jobs,
    addJob,
    updateJob,
    deleteJob,
  };
};
