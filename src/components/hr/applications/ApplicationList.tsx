
import React, { useState } from 'react';
import { JobApplication } from '@/models/ApplicationModel';
import { useJobsData } from '@/hooks/hr/useJobsData';
import { useCandidatesData } from '@/hooks/hr/useCandidatesData';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import ApplicationCard from './ApplicationCard';
import ApplicationStatusFilter from './ApplicationStatusFilter';
import JobPositionFilter from './JobPositionFilter';

interface ApplicationListProps {
  applications: JobApplication[];
  onViewDetails: (application: JobApplication) => void;
  onUpdateStatus: (application: JobApplication, newStatus: JobApplication['status']) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ 
  applications, 
  onViewDetails, 
  onUpdateStatus 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [jobFilter, setJobFilter] = useState<string | 'All'>('All');
  const { jobs } = useJobsData();
  const { candidates } = useCandidatesData();
  
  const filteredApplications = applications.filter(app => {
    // Find job and candidate info for this application
    const job = jobs.find(j => j.id === app.jobId);
    const candidate = candidates.find(c => c.id === app.candidateId);
    
    // Job filter
    if (jobFilter !== 'All' && app.jobId !== jobFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'All' && app.status !== statusFilter) {
      return false;
    }
    
    // Search term filter
    const jobTitle = job?.title.toLowerCase() || '';
    const candidateName = candidate?.name.toLowerCase() || '';
    const searchTermLower = searchTerm.toLowerCase();
    
    return jobTitle.includes(searchTermLower) || 
           candidateName.includes(searchTermLower) ||
           app.status.toLowerCase().includes(searchTermLower);
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <JobPositionFilter 
          jobs={jobs}
          selectedJobId={jobFilter}
          onChange={setJobFilter}
        />
        <ApplicationStatusFilter 
          selectedStatus={statusFilter} 
          onChange={setStatusFilter} 
        />
      </div>

      {filteredApplications.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <p>No applications found.</p>
            {(searchTerm || statusFilter !== 'All' || jobFilter !== 'All') && (
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setJobFilter('All');
                }}
                className="mt-2"
              >
                Clear filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApplications.map((application) => (
            <ApplicationCard 
              key={application.id}
              application={application}
              job={jobs.find(j => j.id === application.jobId)}
              candidate={candidates.find(c => c.id === application.candidateId)}
              onView={() => onViewDetails(application)}
              onUpdateStatus={(newStatus) => onUpdateStatus(application, newStatus)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
