
import React from 'react';
import { JobPosition } from '@/models/JobModel';
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
  Clock,
  Edit,
  Trash,
  Eye,
  Users
} from 'lucide-react';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

interface JobCardProps {
  job: JobPosition;
  applicationCount: number;
  onView: () => void;
  onViewApplications: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  applicationCount,
  onView, 
  onViewApplications,
  onEdit, 
  onDelete 
}) => {
  const getStatusVariant = () => {
    switch (job.status) {
      case 'Open':
        return 'default';
      case 'Closed':
        return 'destructive';
      case 'Draft':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const daysRemaining = () => {
    const today = new Date();
    const closing = new Date(job.closingDate);
    const diffTime = closing.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle 
            className="text-lg font-semibold cursor-pointer hover:text-primary" 
            onClick={onView}
          >
            {job.title}
          </CardTitle>
          <Badge variant={getStatusVariant()}>
            {job.status}
          </Badge>
        </div>
        <div className="flex items-center mt-1 text-sm text-muted-foreground">
          <Briefcase className="h-3.5 w-3.5 mr-1.5" />
          {job.department}
        </div>
        <div className="flex items-center mt-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1.5" />
          {job.location}
        </div>
      </CardHeader>
      <CardContent className="pb-2 pt-0 flex-grow">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>Posted: {format(new Date(job.postedDate), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>
              {daysRemaining() > 0 
                ? `Closes in ${daysRemaining()} days` 
                : 'Closing date passed'}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>{applicationCount} Applications</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex flex-col gap-2">
        <div className="flex w-full gap-2">
          <Button 
            variant="default" 
            className="flex-1 flex items-center justify-center gap-1"
            onClick={onView}
          >
            <Eye className="h-4 w-4" />
            Details
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1 flex items-center justify-center gap-1"
            onClick={onViewApplications}
          >
            <Users className="h-4 w-4" />
            Applications
          </Button>
        </div>
        <div className="flex w-full gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            size="sm"
            onClick={onEdit}
          >
            <Edit className="h-3.5 w-3.5 mr-1" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            size="sm"
            onClick={onDelete}
          >
            <Trash className="h-3.5 w-3.5 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
