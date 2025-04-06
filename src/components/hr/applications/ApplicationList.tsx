
import React, { useState } from 'react';
import { JobApplication } from '@/models/ApplicationModel';
import { useJobsData } from '@/hooks/hr/useJobsData';
import { useCandidatesData } from '@/hooks/hr/useCandidatesData';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LayoutGrid, Table as TableIcon, Filter, ChevronDown } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [sortField, setSortField] = useState<'name' | 'date' | 'status'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { jobs } = useJobsData();
  const { candidates } = useCandidatesData();
  
  // Filter applications
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

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortField === 'date') {
      const dateA = new Date(a.appliedDate).getTime();
      const dateB = new Date(b.appliedDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortField === 'status') {
      const statusOrder = {
        'Pending': 1,
        'Reviewed': 2,
        'Interviewed': 3,
        'Offered': 4,
        'Hired': 5,
        'Rejected': 6
      };
      const statusA = statusOrder[a.status as keyof typeof statusOrder];
      const statusB = statusOrder[b.status as keyof typeof statusOrder];
      return sortDirection === 'asc' ? statusA - statusB : statusB - statusA;
    } else {
      // Sort by candidate name
      const candidateA = candidates.find(c => c.id === a.candidateId)?.name || '';
      const candidateB = candidates.find(c => c.id === b.candidateId)?.name || '';
      return sortDirection === 'asc' 
        ? candidateA.localeCompare(candidateB) 
        : candidateB.localeCompare(candidateA);
    }
  });

  const toggleSort = (field: 'name' | 'date' | 'status') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIndicator = (field: 'name' | 'date' | 'status') => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const handleStatusChange = (application: JobApplication, newStatus: string) => {
    onUpdateStatus(application, newStatus as JobApplication['status']);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-col gap-2 md:flex-row">
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
        </div>
        
        <div className="flex border rounded-md self-end">
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

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="font-medium">Applications ({sortedApplications.length})</div>
          <div className="flex gap-2">
            {viewMode === 'table' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    Sort
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toggleSort('name')}>
                    By Name {getSortIndicator('name')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleSort('date')}>
                    By Date {getSortIndicator('date')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleSort('status')}>
                    By Status {getSortIndicator('status')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {sortedApplications.length === 0 ? (
          <Card className="border-0 shadow-none">
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort('name')}>
                    Candidate {getSortIndicator('name')}
                  </TableHead>
                  <TableHead>Job Position</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort('date')}>
                    Applied Date {getSortIndicator('date')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort('status')}>
                    Status {getSortIndicator('status')}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedApplications.map((application) => {
                  const job = jobs.find(j => j.id === application.jobId);
                  const candidate = candidates.find(c => c.id === application.candidateId);
                  
                  return (
                    <TableRow key={application.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                            {candidate?.name.split(' ').map(part => part[0]).join('').toUpperCase()}
                          </div>
                          <div>
                            {candidate?.name || 'Unknown Candidate'}
                            <div className="text-xs text-muted-foreground">
                              {candidate?.email || 'No email'}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {job?.title || 'Unknown Position'}
                          <div className="text-xs text-muted-foreground">
                            {job?.department || 'No department'}
                          </div>
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
                          <Select 
                            defaultValue={application.status}
                            onValueChange={(value) => handleStatusChange(application, value)}
                          >
                            <SelectTrigger className="w-[140px] h-9 text-xs">
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Reviewed">Reviewed</SelectItem>
                              <SelectItem value="Interviewed">Interviewed</SelectItem>
                              <SelectItem value="Offered">Offered</SelectItem>
                              <SelectItem value="Hired">Hired</SelectItem>
                              <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {sortedApplications.map((application) => (
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
    </div>
  );
};

export default ApplicationList;
