
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { JobApplication, Candidate } from '@/models/ApplicationModel';
import ApplicationStatusBadge from '../../applications/ApplicationStatusBadge';

interface ApplicationsTableProps {
  applications: JobApplication[];
  candidates: Candidate[];
  onViewApplication: (application: JobApplication) => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ 
  applications, 
  candidates, 
  onViewApplication 
}) => {
  const [selectedStatus, setSelectedStatus] = useState<JobApplication['status'] | 'All'>('All');

  // Filter by status if a specific status is selected
  const filteredApplications = selectedStatus === 'All' 
    ? applications 
    : applications.filter(app => app.status === selectedStatus);

  // Count applications by status
  const statusCounts = applications.reduce((counts, app) => {
    counts[app.status] = (counts[app.status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  // Function to get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'All':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Reviewed':
        return 'outline';
      case 'Interviewed':
        return 'default';
      case 'Offered':
        return 'success';
      case 'Hired':
        return 'success';
      case 'Rejected':
        return 'destructive';
      default:
        return 'default';
    }
  };

  // Get the earliest status in the hiring process for all applications
  const getEarliestStatus = (): JobApplication['status'] => {
    if (applications.length === 0) return 'Pending';
    
    const statusOrder: JobApplication['status'][] = [
      'Pending', 'Reviewed', 'Interviewed', 'Offered', 'Hired', 'Rejected'
    ];
    
    let earliestStatusIndex = statusOrder.length - 1;
    
    applications.forEach(app => {
      const appStatusIndex = statusOrder.indexOf(app.status);
      if (appStatusIndex < earliestStatusIndex) {
        earliestStatusIndex = appStatusIndex;
      }
    });
    
    return statusOrder[earliestStatusIndex];
  };

  const earliestStatus = getEarliestStatus();

  return (
    <>
      <h3 className="text-lg font-medium mb-2">Application Pipeline Status</h3>
      <p className="text-sm text-muted-foreground mb-4">
        All candidates must reach the <Badge variant="outline">{earliestStatus}</Badge> stage 
        before any can move to the next stage.
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge 
          variant={selectedStatus === 'All' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedStatus('All')}
        >
          All ({applications.length})
        </Badge>
        {(['Pending', 'Reviewed', 'Interviewed', 'Offered', 'Hired', 'Rejected'] as const).map(status => (
          <Badge 
            key={status}
            variant={selectedStatus === status ? getStatusBadgeVariant(status) : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedStatus(status)}
          >
            {status} ({statusCounts[status] || 0})
          </Badge>
        ))}
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                No applications found with {selectedStatus !== 'All' ? `"${selectedStatus}"` : ''} status.
              </TableCell>
            </TableRow>
          ) : (
            filteredApplications.map(application => {
              const candidate = candidates.find(c => c.id === application.candidateId);
              return (
                <TableRow key={application.id} className="h-16">
                  <TableCell className="font-medium">
                    {candidate?.name || 'Unknown Candidate'}
                    <div className="text-sm text-muted-foreground">
                      {candidate?.email || 'No email provided'}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(application.appliedDate), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <ApplicationStatusBadge status={application.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewApplication(application)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ApplicationsTable;
