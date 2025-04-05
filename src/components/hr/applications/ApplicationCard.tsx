
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
  Calendar, 
  User,
  FileText
} from 'lucide-react';
import { JobApplication, Candidate } from '@/models/ApplicationModel';
import { JobPosition } from '@/models/JobModel';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ApplicationCardProps {
  application: JobApplication;
  job?: JobPosition;
  candidate?: Candidate;
  onView: () => void;
  onUpdateStatus: (newStatus: JobApplication['status']) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ 
  application, 
  job, 
  candidate, 
  onView, 
  onUpdateStatus 
}) => {
  const getStatusColor = () => {
    switch (application.status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Reviewed':
        return 'bg-blue-500';
      case 'Interviewed':
        return 'bg-purple-500';
      case 'Offered':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'Hired':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {candidate ? getInitials(candidate.name) : 'N/A'}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold cursor-pointer hover:text-primary" onClick={onView}>
              {candidate?.name || 'Unknown Candidate'}
            </CardTitle>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5 mr-1.5" />
              {job?.title || 'Unknown Position'}
            </div>
          </div>
        </div>
        <Badge className={getStatusColor()}>
          {application.status}
        </Badge>
      </CardHeader>
      <CardContent className="pb-2 pt-0 flex-grow">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>{candidate?.currentPosition || 'N/A'}</span>
          </div>
          <div className="flex items-center text-sm">
            <FileText className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>{application.resumeUrl ? 'Resume Available' : 'No Resume'}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span>Applied: {format(new Date(application.appliedDate), 'MMM dd, yyyy')}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between flex-col gap-2">
        <Select 
          defaultValue={application.status} 
          onValueChange={onUpdateStatus}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Update status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Reviewed">Reviewed</SelectItem>
            <SelectItem value="Interviewed">Interviewed</SelectItem>
            <SelectItem value="Offered">Offered</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="Hired">Hired</SelectItem>
          </SelectContent>
        </Select>
        <Button className="w-full" onClick={onView}>
          View Application
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
