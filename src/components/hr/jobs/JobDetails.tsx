
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  MapPin, 
  Calendar,
  ArrowLeft,
  Edit,
  Trash,
  Building,
  Mail,
  Clock,
  CheckCircle2,
  CircleAlert
} from 'lucide-react';
import { JobPosition } from '@/models/JobModel';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

interface JobDetailsProps {
  job: JobPosition;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onEdit, onDelete, onBack }) => {
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

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <Button 
            variant="ghost" 
            className="mb-2 -ml-4 flex items-center gap-1 text-muted-foreground" 
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>
          <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
          <div className="flex items-center mt-2 text-muted-foreground">
            <Building className="h-4 w-4 mr-2" />
            <span>{job.department}</span>
          </div>
        </div>
        <Badge variant={getStatusVariant()}>
          {job.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>Location: {job.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>Job Type: {job.type}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>Posted: {format(new Date(job.postedDate), 'MMMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>Closing Date: {format(new Date(job.closingDate), 'MMMM dd, yyyy')}</span>
          </div>
          {job.contactEmail && (
            <div className="flex items-center md:col-span-2">
              <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Contact: {job.contactEmail}</span>
            </div>
          )}
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="whitespace-pre-line">{job.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Requirements</h3>
          <ul className="list-disc pl-5 space-y-1">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
          <ul className="list-disc pl-5 space-y-1">
            {job.responsibilities.map((resp, index) => (
              <li key={index} className="flex items-start">
                <CircleAlert className="h-5 w-5 mr-2 text-blue-500 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {job.salary && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Salary Range</h3>
            <p>
              {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} per year
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button onClick={onEdit} variant="default" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button onClick={onDelete} variant="destructive" className="flex items-center gap-2">
            <Trash className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobDetails;
