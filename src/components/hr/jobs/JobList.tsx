
import React, { useState } from 'react';
import { JobPosition } from '@/models/JobModel';
import { JobApplication } from '@/models/ApplicationModel';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users } from 'lucide-react';
import JobCard from './JobCard';
import { motion } from 'framer-motion';

interface JobListProps {
  jobs: JobPosition[];
  applications: JobApplication[];
  onViewDetails: (job: JobPosition) => void;
  onViewApplications: (job: JobPosition) => void;
  onEditJob: (job: JobPosition) => void;
  onDeleteJob: (job: JobPosition) => void;
}

const JobList: React.FC<JobListProps> = ({ 
  jobs, 
  applications,
  onViewDetails, 
  onViewApplications,
  onEditJob,
  onDeleteJob
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get application counts for each job
  const getApplicationCount = (jobId: string) => {
    return applications.filter(app => app.jobId === jobId).length;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <p>No job postings found.</p>
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
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
            >
              <JobCard 
                job={job} 
                applicationCount={getApplicationCount(job.id)}
                onView={() => onViewDetails(job)}
                onViewApplications={() => onViewApplications(job)}
                onEdit={() => onEditJob(job)}
                onDelete={() => onDeleteJob(job)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
