
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BriefcaseBusiness, MapPin, Building } from 'lucide-react';
import { JobPosition } from '@/models/JobModel';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface JobHeaderProps {
  job: JobPosition;
  onBack: () => void;
}

const JobHeader: React.FC<JobHeaderProps> = ({ job, onBack }) => {
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
  );
};

export default JobHeader;
