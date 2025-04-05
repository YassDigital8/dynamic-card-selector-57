
import React from 'react';
import { Users, MapPin, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { JobPosition } from '@/models/JobModel';
import { Button } from '@/components/ui/button';

interface JobMetadataProps {
  job: JobPosition;
  onViewApplications: () => void;
}

const JobMetadata: React.FC<JobMetadataProps> = ({ job, onViewApplications }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>Location: {job.location}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>Posted: {format(new Date(job.postedDate), 'MMMM dd, yyyy')}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>Closing Date: {format(new Date(job.closingDate), 'MMMM dd, yyyy')}</span>
        </div>
      </div>

      <Button 
        className="w-full flex items-center justify-center gap-2"
        onClick={onViewApplications}
      >
        <Users className="h-5 w-5" />
        View Applications ({job.applications || 0})
      </Button>
    </div>
  );
};

export default JobMetadata;
