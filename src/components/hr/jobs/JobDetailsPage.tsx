
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JobPosition } from '@/models/JobModel';
import { JobApplication, Candidate } from '@/models/ApplicationModel';
import { format } from 'date-fns';
import { ArrowLeft, BriefcaseBusiness, Users, CalendarDays, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ApplicationStatusBadge from '../applications/ApplicationStatusBadge';
import { motion } from 'framer-motion';

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
  const [selectedStatus, setSelectedStatus] = useState<JobApplication['status'] | 'All'>('All');
  
  // Get applications for this job
  const jobApplications = applications.filter(app => app.jobId === job.id);
  
  // Filter by status if a specific status is selected
  const filteredApplications = selectedStatus === 'All' 
    ? jobApplications 
    : jobApplications.filter(app => app.status === selectedStatus);
  
  // Get the earliest status in the hiring process for all applications
  const getEarliestStatus = (): JobApplication['status'] => {
    if (jobApplications.length === 0) return 'Pending';
    
    const statusOrder: JobApplication['status'][] = [
      'Pending', 'Reviewed', 'Interviewed', 'Offered', 'Hired', 'Rejected'
    ];
    
    let earliestStatusIndex = statusOrder.length - 1;
    
    jobApplications.forEach(app => {
      const appStatusIndex = statusOrder.indexOf(app.status);
      if (appStatusIndex < earliestStatusIndex) {
        earliestStatusIndex = appStatusIndex;
      }
    });
    
    return statusOrder[earliestStatusIndex];
  };
  
  const earliestStatus = getEarliestStatus();
  
  // Count applications by status
  const statusCounts = jobApplications.reduce((counts, app) => {
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
        return 'blue';
      case 'Offered':
        return 'green';
      case 'Hired':
        return 'purple';
      case 'Rejected':
        return 'destructive';
      default:
        return 'default';
    }
  };
  
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
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
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
      <Button 
        variant="ghost" 
        className="mb-2 -ml-2 flex items-center gap-1" 
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Jobs
      </Button>
      
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <BriefcaseBusiness className="h-4 w-4 mr-1" />
                {job.department}
                <span className="mx-2">•</span>
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </CardDescription>
            </div>
            <Badge>{job.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{jobApplications.length} Applicants</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Posted: {format(new Date(job.postedDate), 'MMMM dd, yyyy')}</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
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
                All ({jobApplications.length})
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobDetailsPage;
