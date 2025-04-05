
import React from 'react';
import { JobPosition } from '@/models/JobModel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface JobPositionFilterProps {
  jobs: JobPosition[];
  selectedJobId: string | 'All';
  onChange: (jobId: string | 'All') => void;
}

const JobPositionFilter: React.FC<JobPositionFilterProps> = ({
  jobs,
  selectedJobId,
  onChange
}) => {
  return (
    <div className="w-full md:w-64">
      <Select
        value={selectedJobId}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Positions</SelectItem>
          {jobs.map((job) => (
            <SelectItem key={job.id} value={job.id}>
              {job.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobPositionFilter;
