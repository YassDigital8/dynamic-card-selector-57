
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { JobPosition } from '@/models/JobModel';
import { JobApplication, Candidate } from '@/models/ApplicationModel';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import {
  JobHeader,
  JobMetadata,
  JobDescription,
  ApplicationsTable,
  JobActions
} from './details';

interface JobDetailsPageProps {
  job: JobPosition;
  applications: JobApplication[];
  candidates: Candidate[];
  onBack: () => void;
  onViewApplication: (application: JobApplication) => void;
  onUpdateApplicationStatus: (application: JobApplication, newStatus: JobApplication['status']) => void;
}

const JobDetailsPage: React.FC<JobDetailsPageProps> = ({
  job,
  applications,
  candidates,
  onBack,
  onViewApplication,
  onUpdateApplicationStatus
}) => {
  // Get applications for this job
  const jobApplications = applications.filter(app => app.jobId === job.id);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <Card className="w-full">
        <JobHeader job={job} onBack={onBack} />
        
        <CardContent className="space-y-6">
          <JobMetadata job={job} onViewApplications={() => {}} />
          
          <Separator />
          
          <ApplicationsTable 
            applications={jobApplications}
            candidates={candidates}
            onViewApplication={onViewApplication}
          />
          
          <Separator />
          
          <JobDescription job={job} />
        </CardContent>
        
        <JobActions 
          onBack={onBack} 
          onEdit={() => {}} 
          onDelete={() => {}} 
        />
      </Card>
    </motion.div>
  );
};

export default JobDetailsPage;
