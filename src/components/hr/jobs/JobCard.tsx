
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Edit, 
  Trash, 
  Users,
  Building
} from 'lucide-react';
import { JobPosition } from '@/models/JobModel';
import { format } from 'date-fns';

interface JobCardProps {
  job: JobPosition;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onView, onEdit, onDelete }) => {
  const getStatusColor = () => {
    switch (job.status) {
      case 'Open':
        return 'bg-green-500';
      case 'Closed':
        return 'bg-red-500';
      case 'Draft':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-lg font-semibold cursor-pointer hover:text-primary" onClick={onView}>
            {job.title}
          </CardTitle>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Building className="h-3.5 w-3.5 mr-1.5" />
            {job.department}
          </div>
        </div>
        <Badge variant={job.status === 'Draft' ? 'outline' : 'default'} className={getStatusColor()}>
          {job.status}
        </Badge>
      </CardHeader>
      <CardContent className="pb-2 pt-0 flex-grow">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Briefcase className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>Closing: {format(new Date(job.closingDate), 'MMM dd, yyyy')}</span>
          </div>
          {job.applications !== undefined && (
            <div className="flex items-center text-sm">
              <Users className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <span>{job.applications} application{job.applications !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="secondary" size="sm" onClick={onView}>
          View Details
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={onDelete}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
