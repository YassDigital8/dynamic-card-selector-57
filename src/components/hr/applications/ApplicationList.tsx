
import React, { useState } from 'react';
import { JobApplication } from '@/models/ApplicationModel';
import { useJobsData } from '@/hooks/hr/useJobsData';
import { useCandidatesData } from '@/hooks/hr/useCandidatesData';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LayoutGrid, Table as TableIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import ApplicationCard from './ApplicationCard';
import ApplicationStatusBadge from './ApplicationStatusBadge';
import ApplicationStatusFilter from './ApplicationStatusFilter';
import JobPositionFilter from './JobPositionFilter';
import { format } from 'date-fns';

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
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
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
        <div className="flex border rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="rounded-r-none"
            title="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('table')}
            className="rounded-l-none"
            title="Table view"
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>
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
      ) : viewMode === 'table' ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Job Position</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => {
                const job = jobs.find(j => j.id === application.jobId);
                const candidate = candidates.find(c => c.id === application.candidateId);
                
                return (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">
                      {candidate?.name || 'Unknown Candidate'}
                      <div className="text-xs text-muted-foreground">
                        {candidate?.email || 'No email'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {job?.title || 'Unknown Position'}
                      <div className="text-xs text-muted-foreground">
                        {job?.department || 'No department'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(application.appliedDate), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <ApplicationStatusBadge status={application.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewDetails(application)}
                        >
                          View
                        </Button>
                        <select 
                          className="text-xs border rounded px-2 py-1"
                          value={application.status}
                          onChange={(e) => onUpdateStatus(application, e.target.value as JobApplication['status'])}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Interviewed">Interviewed</option>
                          <option value="Offered">Offered</option>
                          <option value="Hired">Hired</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
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
